<template lang="html">
  <div class="VSW__Component">
    <a href="javascript:;"
       :class="aClass"
       :aria-label="item.title"
       @click="toggle"><i :class="item.icon"></i></a>

    <div class="VSW__Dialog VSW__Dialog_big"
         v-show="item.showDialog">
       <div class="VSW__Dialog__Title">{{ item.title }}</div>

       <div class="VSW__Dialog__Info" v-if="images.length">
        <ul>
          <li v-for="text in item.dialog.info">{{ text }}</li>
        </ul>
      </div>

       <ul class="VSW__Images" v-if="images.length">
         <li v-for="img in images">
           <a class="Tip Tip__top"
              href="javascript:;"
              :aria-label="img"
              @click="selectItem"><img :src="img" alt=""></a>
         </li>
       </ul>

       <hr v-if="images.length">

       <div class="VSW__Dialog__Content__Box" v-if="images.length">
         <input autofocus
                type="text"
                class="VSW__Dialog__Content__Box_input"
                :placeholder="item.dialog.inputAlt.placeholder"
                v-model="imgAlt">
       </div>

       <hr v-if="images.length">

       <div class="VSW__Dialog__Content__Box">
         <input autofocus
                type="text"
                class="VSW__Dialog__Content__Box_input"
                :placeholder="item.dialog.inputUrl.placeholder"
                @change="enableButton"
                v-on:keyup="enableButton"
                v-on:keyup.13="urlHandler"
                v-on:paste="enableButton"
                v-model="imgUrl">

        <button type="button"
                class="VSW__Dialog__Content__Box_btn"
                :disabled="disabledButton"
                @click="urlHandler">{{ item.dialog.button.ok }}</button>
       </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    computed: {
      aClass () {
        let cl = 'Tip Tip__top'
        let isHtmlView = this.$store.state.currentView === 'html'

        cl += this.item.disabled || isHtmlView ? ' VSW_disabled' : ''
        cl += this.item.showDialog ? ' VSW_active' : ''

        return cl
      }
    },

    data () {
      return {
        imgAlt: '',
        disabledButton: true,
        images: this.$store.state.images,
        imgUrl: '',
        selected: false
      }
    },

    methods: {
      enableButton () {
        setTimeout(() => {
          this.disabledButton = this.imgUrl.length < 1
        }, 10)
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
        let link = this.imgUrl

        if (link.indexOf('http://') === -1 && link.indexOf('https://') === -1) {
          link = 'http://' + link
        }

        return link
      },

      insert () {
        let url = this.isValidLink(this.imgUrl)

        this.$store.dispatch('execute', {
          name: 'insertHtml',
          value: `<img src="${url}" alt="${this.imgAlt.trim()}">`
        })
        this.updateDialog()
      },

      selectItem (evt) {
        this.$store.dispatch('execute', {
          name: 'insertHtml',
          value: `<img src="${evt.target.getAttribute('src').trim()}" alt="${this.imgAlt.trim()}">`
        })

        this.updateDialog()
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
          this.selected = this.getRange()

          this.updateDialog(this.item.name)
        }
      },

      updateDialog (dialog) {
        this.$store.dispatch('updateDialog', dialog)
        this.imgUrl = ''
        this.imgAlt = ''
      },

      urlHandler () {
        let sel = this.selected

        if (sel) {
          this.setRange(sel)
        }

        this.insert()
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
