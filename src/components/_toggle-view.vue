<template lang="html">
  <div class="VSW__Component">
    <a class="Tip Tip__top"
       href="javascript:;"
       :aria-label="item.title"
       @click="clickHandler"><i :class="iconClass"></i></a>
  </div>
</template>


<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'

  export default {
    computed: {
      iconClass () {
        return this.$store.state.currentView === 'design' ? 'fa-desktop' : 'fa-code'
      }
    },

    methods: Object.assign({}, mapActions([
      'toggleView',
      'updateDisabledTools',
      'updateDialog'
    ]), {
      clickHandler () {
        this.toggleView()
        this.updateDisabledTools()
        this.updateDialog()
      }
    }),

    props: {
      item: {
        required: true,
        type: Object
      }
    }
  }
</script>
