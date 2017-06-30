<template lang="html">
  <div class="VSW__Component_design" v-show="currentView == 'design'">
    <div contenteditable="true"
         spellcheck="false"
         @click="updateDialog"
         @keydown="keydownHandler"
         @keyup="keyupHandler"></div>
  </div>
</template>


<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        timer: null
      }
    },

    computed: {
      currentView: function () {
        return this.$store.state.currentView
      },

      content: function () {
        return this.$store.state.content
      },

      command: function () {
        return this.$store.state.command
      }
    },

    watch: {
      'command': function (data) {
        this.exec(data.name, data.value)
      },

      'content': function (val) {
        if (this.$el.children[0].innerHTML !== val) {
          this.$el.children[0].innerHTML = val
        }
      },

      'currentView': function (view) {
        if (view === 'html') {
          clearTimeout(this.timer)

          this.updateContent(this.$el.children[0].innerHTML)
          this.updateActiveTools(document)
        } else {
          this.updateActiveTools(document)
        }
      }
    },

    mounted () {
      this.selectionChange()
    },

    methods: Object.assign({}, mapActions([
      'updateContent',
      'updateActiveTools',
      'updateDialog',
      'setAction'
    ]), {
      exec (cmmd, value) {
        let range = this.getRange()

        if (!range) {
          return false
        }

        let container = range.commonAncestorContainer

        if (!this.$el.children[0].contains(container)) {
          return
        }

        if (document.queryCommandSupported('styleWithCss')) {
          document.execCommand('styleWithCss', false, true)
        }

        if (cmmd === 'CreateLink' && value.hasOwnProperty('blank')) {
          let txt = value.link
          let sel = document.getSelection()

          this[cmmd] ? this[cmmd](cmmd, value) : document.execCommand(cmmd, false, txt)
          sel.anchorNode.parentElement.target = '_blank'
        } else {
          this[cmmd] ? this[cmmd](cmmd, value) : document.execCommand(cmmd, false, value)
        }

        this.updateActiveTools(document)
        this.updateContent(this.$el.children[0].innerHTML)
      },

      fontSize (name, value) {
        let selection = window.getSelection()
        let range = this.getRange()

        if (!range || range.collapsed) {
          return
        }

        let childNodes = range.cloneContents().childNodes
        let isSingleChild = childNodes.length === 1
        let isSpan = isSingleChild ? false : this.isSpanTag(childNodes[0])

        if (isSingleChild && this.isElementNode(childNodes[0]) && isSpan) {
          let span = range.extractContents().childNodes[0]

          span.style.fontSize = value
          range.insertNode(span)
          range.selectNode(span)
          selection.removeAllRanges()
          selection.addRange(range)
        } else {
          let ua = navigator.userAgent
          let isEdge = ua.indexOf('Chrome') !== -1 && ua.indexOf('Edge') === -1

          if (isEdge) {
            if (document.queryCommandSupported('styleWithCss')) {
              document.execCommand('styleWithCss', false, true)
            }

            document.execCommand('fontSize', false, 7)

            let container = range.commonAncestorContainer

            if (this.isTextNode(container)) {
              container = container.parentNode
            }

            if (this.isSpanTag(container)) {
              container = container.parentNode
            }

            Array.prototype.forEach.call(container.getElementsByTagName('span'), function (span) {
              let isBig = span.style.fontSize.trim() === 'xx-large'
              let isBigger = span.style.fontSize.trim() === '-webkit-xxx-large'

              if (isBig || isBigger) {
                span.style.fontSize = value
              }

              span.normalize()
            })
          } else {
            if (document.queryCommandSupported('styleWithCss')) {
              document.execCommand('styleWithCss', false, false)
            }

            document.execCommand('fontSize', false, 7)

            let fontList = []
            let spanList = []
            let container = range.commonAncestorContainer

            if (this.isTextNode(container)) {
              container = container.parentNode
            }

            if (this.isFontTag(container)) {
              container = container.parentNode
            }

            fontList = container.getElementsByTagName('font')

            for (let i = 0; i < fontList.length; i++) {
              let font = fontList[i]
              let span = document.createElement('span')

              Array.prototype.forEach.call(font.attributes, function (attr) {
                attr.nodeName === 'size'
                  ? span.style.fontSize = value
                  : span.setAttribute(attr.nodeName, attr.nodeValue)
              })

              span.innerHTML = font.innerHTML

              if (span.querySelectorAll('span').length !== 0) {
                this.formatContent(span, 'span', 'fontSize')
              }

              span.normalize()
              font.parentNode.replaceChild(span, font)
              spanList.push(span)
              i--
            }

            range.setStartBefore(spanList[0])
            range.setEndAfter(spanList[spanList.length - 1])
            selection.removeAllRanges()
            selection.addRange(range)
          }
        }
      },

      formatBlock (name, value) {
        let ua = navigator.userAgent.toLowerCase()

        if (ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/)) {
          document.execCommand('formatblock', false, '<' + value.toUpperCase() + '>')
        } else {
          document.execCommand('formatblock', false, value)
        }
      },

      formatContent (obj, tag, css) {
        let tmp = []
        let pattern = {
          fontSize: /font-size:\s?\d+px;/g,
          verticalAlign: /vertical-align:\s?(sub|super);/g
        }
        let nodeList = obj.getElementsByTagName(tag)

        for (let i = 0; i < nodeList.length; i++) {
          let node = nodeList[i]
          let isSingleNode = node.attributes.length === 1
          let hasStyle = node.style.length !== 0
          let matchesStyle = node.getAttribute('style').match(pattern[css]) !== null

          if (isSingleNode && hasStyle && matchesStyle) {
            if (node.children.length === 0) {
              if (node.style.length === 1) {
                let parent = node.parentNode

                parent.replaceChild(document.createTextNode(node.innerHTML), node)
                parent.normalize()
                i--
              } else {
                node.style[css] = ''
              }
            } else {
              tmp.push(node)
            }
          }
        }

        if (tmp.length !== 0) {
          this.formatContent(obj, tag, css)
        }
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

      insertHtml (name, value) {
        let selection = window.getSelection()
        let range = this.getRange()

        if (!range) {
          return false
        }

        let node = null
        let frag = document.createDocumentFragment()
        let obj = document.createElement('div')

        obj.innerHTML = value

        while (obj.firstChild) {
          node = obj.firstChild
          frag.appendChild(node)
        }

        range.insertNode(frag)
        range.setStartAfter(node)
        range.collapse(true)
        selection.removeAllRanges()
        selection.addRange(range)
      },

      isAnchorTag (node) {
        return node.tagName.toLowerCase() === 'a'
      },

      isElementNode (node) {
        return node.nodeType === 1
      },

      isFontTag (node) {
        return node.tagName.toLowerCase() === 'font'
      },

      isSpanTag (node) {
        return node.tagName.toLowerCase() === 'span'
      },

      isTextNode (node) {
        return node.nodeType === 3
      },

      keydownHandler (e) {
        if (e.ctrlKey && (e.keyCode === 89 || e.keyCode === 90)) {
          e.preventDefault()

          if (e.keyCode === 89) {
            this.setAction('redo')
          }

          if (e.keyCode === 90) {
            this.setAction('undo')
          }
        }
      },

      keyupHandler () {
        clearTimeout(this.timer)

        this.timer = setTimeout(() => {
          this.updateContent(this.$el.children[0].innerHTML)
        }, 300)
      },

      removeRange () {
        let selection

        if (window.getSelection) {
          selection = window.getSelection()
          selection.removeAllRanges()
        }
      },

      selectionChange () {
        document.addEventListener('selectionchange', evt => {
          if (this.$el.children[0].contains(window.getSelection().focusNode)) {
            this.updateActiveTools(document)
          }
        }, false)
      },

      setRange (range) {
        let selection

        if (window.getSelection) {
          selection = window.getSelection()
          selection.removeAllRanges()
          selection.addRange(range)
        }
      },

      unformat (cmmd, value) {
        document.execCommand(cmmd, false, value)

        let range = this.getRange()

        if (!range) {
          return false
        }

        let container = range.commonAncestorContainer

        if (this.isTextNode(container)) {
          container = container.parentNode
        }

        if (this.isSpanTag(container)) {
          container = container.parentNode
        }

        this.formatContent(container, 'span', 'verticalAlign')
        container.normalize()
      },

      unlink () {
        let range = this.getRange()
        let container = range.commonAncestorContainer

        if (this.isTextNode(container)) {
          container = container.parentNode
        }

        if (this.isAnchorTag(container)) {
          let newRange = document.createRange()

          newRange.selectNode(container)

          this.setRange(newRange)
          this.exec('Unlink', null)
          this.removeRange(newRange)
        } else {
          this.exec('Unlink', null)
        }
      }
    })
  }

</script>
