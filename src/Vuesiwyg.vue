<template lang="html">
  <div class="VSW__Editor"
       :class="dClass">
    <template v-for="item in components">
      <component :is="item"></component>
    </template>
  </div>
</template>


<script type="text/ecmascript-6">
  import editable from './components/editable.vue'
  import markup from './components/markup.vue'
  import toolbar from './components/toolbar.vue'
  import { mapActions } from 'vuex'

  export default {
    components: {
      editable,
      markup,
      toolbar
    },

    created () {
      if (this.images) {
        this.updateImages(JSON.parse(this.images))
      }
    },

    mounted () {
      this.setAppId(this.id)
      this.updateContent(this.text)

      if (this.height) {
        let h = this.height.replace(/px%/g, '')

        document.getElementById(this.id).style.height = `${h}px`
      }
    },

    methods: Object.assign({}, mapActions([
      'setAppId',
      'updateContent',
      'updateImages'
    ])),

    props: {
      dClass: {
        default: '',
        required: false,
        type: String
      },
      id: {
        required: true,
        type: [String, Number]
      },
      images: {
        required: false,
        type: String
      },
      height: {
        required: false,
        type: String
      },
      text: {
        default: '',
        required: false,
        type: String
      }
    }
  }
</script>
