<template lang="html">
  <div class="VSW__Component">
    <a href="javascript:;"
       :aria-label="item.title"
       :class="aClass"
       @click="clickHandler"><i :class="item.icon"></i></a>

    <div class="VSW__Dialog VSW__Dialog_big"
         v-if="item.name === 'links'"
         v-show="item.showDialog">
      <div class="VSW__Dialog__Title">{{ item.title }}</div>
      <div class="VSW__Dialog__Content">
        <div class="VSW__Dialog__Content__Box">
          <div class="VSW__Dialog__Content__Box_checkbox">
          	<label><input name="target"
                          type="checkbox"
                          value="_blank"
                          v-model="blank"> {{ item.dialog.checkBox.label }}</label>
          </div>
        </div>

        <div class="VSW__Dialog__Content__Box" v-if="item.name === 'links'">
          <input class="VSW__Dialog__Content__Box_input"
                 :placeholder="item.dialog.input.placeholder"
                 type="text"
                 v-model="linkVal">

          <button class="VSW__Dialog__Content__Box_btn"
                  @click="linkHandler">{{ item.dialog.button.ok }}</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        blank: false,
        linkVal: '',
        selection: false
      }
    },

    computed: {
      aClass () {
        let cl = 'Tip Tip__top'
        let isHtmlView = this.$store.state.currentView === 'html'

        cl += this.item.disabled || isHtmlView ? ' VSW_disabled' : ''
        cl += this.item.showDialog ? ' VSW_active' : ''

        return cl
      }
    },

    methods: {
      clickHandler () {
        if (this.item.name === 'links' && !this.item.disabled) {
          this.selection = this.getRange()
          this.$store.dispatch('updateDialog', this.item.name)
        } else {
          this.dispatchCommand({ name: 'Unlink', value: null })
        }
      },

      dispatchCommand (data) {
        this.$store.dispatch('execute', data)
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

      isValidLink () {
        let link = this.linkVal

        if (link.indexOf('http://') === -1 && link.indexOf('https://') === -1) {
          link = 'http://' + link
        }

        return link
      },

      linkHandler () {
        let sel = this.selection
        let link = this.isValidLink()
        let value = this.blank ? { link: link, blank: true } : link

        if (sel && sel.rangeCount !== 0) {
          this.setRange(sel)
        }

        this.dispatchCommand({ name: 'CreateLink', value: value })
        this.$store.dispatch('updateDialog')
        this.sel = false
      },

      setRange (range) {
        let selection

        if (window.getSelection) {
          selection = window.getSelection()
          selection.removeAllRanges()
          selection.addRange(range)
        }
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
