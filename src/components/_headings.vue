<template lang="html">
  <div class="VSW__Component">
    <a href="javascript:;"
       :class="aClass"
       :aria-label="item.title"
       @click="toggle"><i :class="item.icon"></i></a>

    <div class="VSW__Dialog VSW__Dialog_small"
         @click="selectItem"
         v-show="item.showDialog">
       <div class="VSW__Dialog__Title">{{ item.title }}</div>

       <ul class="VSW__Headings">
         <li v-for="item in item.dialog.formats">
           <a class="Tip Tip__top"
              href="javascript:;"
              :aria-label="item.tag">{{ item.name }}</a>
         </li>
       </ul>
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

    methods: {
      selectItem (evt) {
        let el = evt.target.getAttribute('aria-label').trim()

        if (navigator.userAgent.indexOf('MSIE') >= 1) {
          el = `<${el}>`
        }

        this.$store.dispatch('execute', { name: 'formatBlock', value: el })
        this.updateDialog()
      },

      toggle () {
        if (!this.item.disabled) {
          this.updateDialog(this.item.name)
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
