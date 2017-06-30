<template lang="html">
  <div class="VSW__Toolbar">
    <template v-for="group in nativeGroups">
      <div :class="'VSW__Toolbar__Group ' + group">
        <a href="javascript:;"
           unselectable="on"
           v-for="item in native"
           v-if="item.group === group && item.native"
           :aria-label="item.title"
           :class="aClass(item)"
           @click="clickHandler(item.name, null)"><i :class="item.icon"></i></a>
      </div>
    </template>

    <template v-for="group in notNativeGroups">
      <div :class="'VSW__Toolbar__Group ' + group">
        <component v-if="item.group === group && !item.native && item.name !== 'redo'"
                   v-for="item in notNative"
                   :key="item.name"
                   :is="item.name"
                   :item="item"></component>
      </div>
    </template>
  </div>
</template>


<script type="text/ecmascript-6">
  import codes from './_code.vue'
  import color from './_color.vue'
  import fontName from './_font-names.vue'
  import fontSize from './_font-sizes.vue'
  import headings from './_headings.vue'
  import images from './_images.vue'
  import links from './_link-unlink.vue'
  import tables from './_tables.vue'
  import toggleView from './_toggle-view.vue'
  import undoRedo from './_undo-redo.vue'
  import { uniq } from 'lodash'

  export default {
    data () {
      return {
        tools: this.$store.state.tools
      }
    },

    computed: {
      nativeGroups () {
        let allGoups = this.native.map(c => c.group)
        let groups = uniq(allGoups)

        return groups
      },

      native () {
        return this.tools.filter(c => c.native === true)
      },

      notNative () {
        return this.tools.filter(c => c.native === false)
      },

      notNativeGroups () {
        let allGoups = this.notNative.map(c => c.group)
        let groups = uniq(allGoups)

        return groups
      }
    },

    components: {
      backColor: color,
      codes,
      fontName,
      fontSize,
      foreColor: color,
      headings,
      images,
      links: links,
      tables,
      toggleView,
      undo: undoRedo,
      unlink: links
    },

    methods: {
      aClass (item) {
        let cl = 'Tip Tip__top'
        let isHtmlView = this.$store.state.currentView === 'html'

        cl += item.active ? ' VSW_active' : ''
        cl += item.disabled || isHtmlView ? ' VSW_disabled' : ''

        return cl
      },

      clickHandler (name, value) {
        this.$store.dispatch('execute', { name, value })
      }
    }
  }
</script>
