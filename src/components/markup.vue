<template lang="html">
  <div class="VSW__Component_html" v-show="currentView === 'html'">
    <textarea :id="appId"
              :name="appId"
              ref="mirror">{{ content }}</textarea>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    computed: {
      appId () {
        return this.$store.state.appId
      },

      content: function () {
        return this.$store.state.content
      },

      currentView: function () {
        return this.$store.state.currentView
      }
    },

    watch: {
      'currentView': function (view) {
        if (view === 'design') {
          this.updateContent(this.$refs.mirror.value)
        }
      }
    },

    methods: {
      updateContent (content) {
        this.$store.dispatch('updateContent', content)
      }
    }
  }
</script>
