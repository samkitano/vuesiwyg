<template lang="html">
  <div class="VSW__Component">
      <a href="javascript:;"
         :aria-label="item.title"
         :class="buttonClass"
         @click="toggle"><i :class="item.icon"></i></a>

      <div class="VSW__Dialog VSW__Dialog_big" v-show="item.showDialog">
        <div class="VSW__Dialog__Title">{{ item.title }}</div>

        <div class="VSW__Dialog__Content">
          <ul class="VSW__Colorpicker">
            <li v-for="color in colors" @click="clickHandler(color)">
              <a class="Tip Tip__top"
                 href="javascript:;"
                 :aria-label="color"
                 :style="{ background: color }"></a>
            </li>
          </ul>

          <hr>

          <div class="VSW__Dialog__Content__Box">
            <input type="text"
                   class="VSW__Dialog__Content__Box_input"
                   :placeholder="item.dialog.input.placeholder"
                   v-model="colorVal">
            <button type="button"
                    class="VSW__Dialog__Content__Box_btn"
                    @click="inputHandler">{{ item.dialog.button.ok }}</button>
          </div>
        </div>
      </div>
    </div>
</template>


<script type="text/ecmascript-6">
  export default {
    computed: {
      buttonClass () {
        let cl = 'Tip Tip__top'
        let isHtmlView = this.$store.state.currentView === 'html'

        cl += this.item.showDialog ? ' VSW_active' : ''
        cl += this.item.disabled || isHtmlView ? ' VSW_disabled' : ''

        return cl
      }
    },

    data () {
      let websafe = this.websafe()

      return {
        colorVal: '',
        colors: websafe,
        selection: false
      }
    },

    methods: {
      clickHandler (color) {
        this.setColor(this.item.name, color)
        this.updateDialog()
      },

      getRange () {
        let selection
        let range

        if (window.getSelection) {
          selection = window.getSelection()

          if (selection && selection.rangeCount !== 0) {
            range = selection.getRangeAt(0)
          }
        }

        return range
      },

      isValidColor (color) {
        let sColor = color.replace(/\s+/g, '')
        let hsl3 = /^#[0-9a-f]{3}$/i
        let hsl6 = /^#[0-9a-f]{6}$/i
        let rgb = /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]),){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/

        if (hsl3.test(sColor) || hsl6.test(sColor) || rgb.test(sColor)) {
          return true
        }
      },

      inputHandler () {
        let sel = this.selection
        let color = this.colorVal

        if (sel && sel.rangeCount !== 0) {
          this.setRange(sel)
        }

        if (!this.isValidColor(color)) {
          alert(this.item.dialog.input.invalidColor)
        } else {
          this.setColor(this.item.name, color)
          this.updateDialog()
        }

        this.selection = false
        this.color = ''
      },

      setColor (colorType, color) {
        this.$store.dispatch('execute', { name: colorType, value: color })
      },

      setRange (range) {
        let selection

        if (window.getSelection) {
          selection = window.getSelection()
          selection.removeAllRanges()
          selection.addRange(range)
        }
      },

      toggle () {
        if (!this.item.disabled) {
          this.selection = this.getRange()
          this.updateDialog(this.item.name)
        }
      },

      updateDialog (dialog) {
        this.$store.dispatch('updateDialog', dialog)
      },

      websafe () {
        let colors = []

        for (let r = 0; r < 16; r += 3) {
          for (let g = 0; g < 16; g += 3) {
            for (let b = 0; b < 16; b += 3) {
              let color = r.toString(16).toUpperCase() + g.toString(16).toUpperCase() + b.toString(16).toUpperCase()

              if (color === '000') {
                continue
              }
              colors.push(`#${color}`)
            }
          }
        }

        let gray = ['#E5E5E', '#CCC', '#B2B2B2', '#999', '#7F7F7F', '#666', '#4C4C4C', '#333', '#191919', '#000']

        colors = colors.concat(gray)

        return colors
      }
    },

    props: {
      item: {
        required: true,
        type: Object
      }
    }
  }
</script>
