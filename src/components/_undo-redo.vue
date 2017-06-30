<template lang="html">
  <div class="VSW__Component">
    <a href="javascript:;"
       :aria-label="item.titles.undo"
       :class="aClass"
       @click="undo"><i :class="item.icons.undo"></i></a>

       <a href="javascript:;"
          :aria-label="item.titles.redo"
          :class="bClass"
          @click="redo"><i :class="item.icons.redo"></i></a>
  </div>
</template>


<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        stack: [],
        idx: -1
      }
    },

    computed: {
      aClass () {
        return !this.canUndo ? 'Tip Tip__top VSW_disabled' : 'Tip Tip__top'
      },

      bClass () {
        return !this.canRedo ? 'Tip Tip__top VSW_disabled' : 'Tip Tip__top'
      },

      action: function () {
        return this.$store.state.action
      },

      canRedo: function () {
        return this.idx < this.stack.length - 1
      },

      canUndo: function () {
        return this.idx > 0
      },

      content () {
        return this.$store.state.content
      },

      currentView () {
        return this.$store.state.currentView
      }
    },

    watch: {
      'action': function (actn) {
        this[actn]()
      },

      'content': function (content) {
        this.pileUp(content)
      },

      'currentView': function (view) {
        if (view === 'design') {
          this.stack = []
          this.idx = -1
          this.pileUp(this.content, true)
        }
      }
    },

    methods: Object.assign({}, mapActions([
      'updateContent',
      'updateDisabledTools'
    ]), {
      pileUp (content, isInit) {
        let json

        if (content !== this.stack[this.idx]) {
          this.stack = this.stack.slice(0, this.idx + 1)
          this.stack.push(content)
          this.idx++
        }

        json = { undo: !this.canUndo, redo: !this.canRedo }

        if (isInit || this.currentView === 'html') {
          json = { undo: true, redo: true }
        }

        this.updateDisabledTools(json)
      },

      redo () {
        if (!this.canRedo) {
          return false
        }

        this.idx++
        let content = this.stack[this.idx]
        this.updateContent(content)
      },

      undo () {
        if (!this.canUndo) {
          return false
        }

        this.idx--
        let content = this.stack[this.idx]
        this.updateContent(content)
      }
    }),

    mounted () {
      this.pileUp(this.content, true)
    },

    props: {
      item: {
        required: true,
        type: Object
      }
    }
  }
</script>
