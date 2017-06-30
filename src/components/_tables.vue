<template lang="html">
  <div class="VSW__Component">
    <a href="javascript:;"
       :aria-label="item.title"
       :class="a1Class"
       @click="toggle"><i :class="item.icon"></i></a>

    <div class="VSW__Dialog VSW__Dialog_small" v-show="this.item.showDialog">
      <div class="VSW__Dialog__Title">{{ item.title }}</div>

      <div class="VSW__Dialog__Content">
        <ul class="VSW__Tables">
          <li v-for="i in num"
              @mouseover="hoverHandler(i - 1)"
              @click="clickHandler(i - 1)">
            <a href="javascript:;"
               :aria-label="tablePos(i)"
               :class="a2Class(i)"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        num: 64,
        x: -1,
        y: -1
      }
    },

    computed: {
      a1Class () {
        let cl = 'Tip Tip__top'
        let isHtmlView = this.$store.state.currentView === 'html'

        cl += this.item.disabled || isHtmlView ? ' VSW_disabled' : ''
        cl += this.item.active ? ' VSW_active' : ''

        return cl
      }
    },

    methods: {
      a2Class (i) {
        let cl = 'Tip Tip__top'

        if (((i - 1) % 8 <= this.x && parseInt((i - 1) / 8) <= this.y)) {
          cl += ' VSW_active'
        }

        return cl
      },

      clickHandler () {
        let html = this.createTable(this.x + 1, this.y + 1)

        this.$store.dispatch('execute', { name: 'insertHtml', value: html })
        this.updateDialog()
      },

      createTable (rows, cols) {
        let oTable = document.createElement('table')
        let oTbody = document.createElement('tbody')

        oTable.style.cssText = 'border-collapse: collapse;'
        oTable.appendChild(oTbody)

        for (let i = 0; i < rows; i++) {
          let tr = document.createElement('tr')

          for (let j = 0; j < cols; j++) {
            let td = document.createElement('td')

            td.innerHTML = '&nbsp;'
            td.style.cssText = 'width:50px;border:1px #eee solid;'
            tr.appendChild(td)
          }

          oTbody.appendChild(tr)
        }

        return oTable.outerHTML
      },

      hoverHandler (pos) {
        this.x = pos % 8
        this.y = parseInt(pos / 8)
      },

      tablePos (pos) {
        let x = pos % 8 || 8
        let y = parseInt(pos / 8)

        if (!y % 8 && y <= 8) {
          y++
        }

        return `${x} x ${y}`
      },

      toggle () {
        if (!this.item.disabled) {
          this.updateDialog('tables')
        }
      },

      updateDialog (dialog) {
        this.$store.dispatch('updateDialog', dialog)
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
