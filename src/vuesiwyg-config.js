export default {
  tools: [
    {
      group: 'formatTools',
      icon: 'fa-eraser',
      name: 'removeFormat',
      native: true,
      title: 'Remove Format'
    },
    {
      group: 'undoTools',
      icons: {
        undo: 'fa-undo',
        redo: 'fa-redo'
      },
      name: 'undo',
      native: false,
      titles: {
        undo: 'Undo',
        redo: 'Redo'
      }
    },
    {
      group: 'undoTools',
      icon: '',
      name: 'redo',
      native: false,
      title: 'Redo'
    },
    {
      dialog: {
        fonts: [
          'Aller',
          'Anivers',
          'Arial',
          '"Arial Black"',
          'Arvo',
          'Calibre',
          '"Comic Sans MS"',
          'Courier',
          '"Courier New"',
          'Delicious',
          '"Droid Sans"',
          '"Droid Serif"',
          'Garamond',
          'Helvetica',
          '"Helvetica Neue"',
          'Impact',
          'Junction',
          'Lato',
          '"Old Standard TT"',
          '"Open Sans"',
          'Palatino',
          '"PT Sans"',
          '"PT Serif"',
          'Tahoma',
          'Times',
          '"Times New Roman"',
          'Ubuntu',
          'Verdana'
        ]
      },
      group: 'fontTools',
      icon: 'fa-font',
      name: 'fontName',
      native: false,
      title: 'Fonts'
    },
    {
      dialog: {
        sizes: ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px']
      },
      group: 'fontTools',
      icon: 'fa-text-height',
      name: 'fontSize',
      native: false,
      title: 'Font Size'
    },
    {
      dialog: {
        formats: {
          p: { name: 'Paragraph', tag: 'p' },
          h1: { name: 'Heading lvl 1', tag: 'h1' },
          h2: { name: 'Heading lvl 2', tag: 'h2' },
          h3: { name: 'Heading lvl 3', tag: 'h3' },
          h4: { name: 'Heading lvl 4', tag: 'h4' },
          h5: { name: 'Heading lvl 5', tag: 'h5' },
          h6: { name: 'Heading lvl 6', tag: 'h6' }
        }
      },
      group: 'textFormat',
      icon: 'fa-header',
      name: 'headings',
      native: false,
      title: 'Headings'
    },
    {
      group: 'textFormat',
      icon: 'fa-bold',
      name: 'bold',
      native: true,
      title: 'Bold'
    },
    {
      group: 'textFormat',
      icon: 'fa-italic',
      name: 'italic',
      native: true,
      title: 'Italic'
    },
    {
      group: 'textFormat',
      icon: 'fa-underline',
      name: 'underline',
      native: true,
      title: 'Underline'
    },
    {
      group: 'textFormat',
      icon: 'fa-strike',
      name: 'strikeThrough',
      native: true,
      title: 'Strike'
    },
    {
      group: 'textFormat',
      icon: 'fa-superscript',
      name: 'superscript',
      native: true,
      title: 'Superscript'
    },
    {
      group: 'textFormat',
      icon: 'fa-subscript',
      name: 'subscript',
      native: true,
      title: 'Subscript'
    },
    {
      group: 'textAlign',
      icon: 'fa-align-left',
      name: 'justifyLeft',
      native: true,
      title: 'Align Left'
    },
    {
      group: 'textAlign',
      icon: 'fa-align-center',
      name: 'justifyCenter',
      native: true,
      title: 'Align Center'
    },
    {
      group: 'textAlign',
      icon: 'fa-align-justify',
      name: 'justifyFull',
      native: true,
      title: 'Justify'
    },
    {
      group: 'textAlign',
      icon: 'fa-align-right',
      name: 'justifyRight',
      native: true,
      title: 'Align Right'
    },
    {
      group: 'blockFormat',
      icon: 'fa-indent',
      name: 'indent',
      native: true,
      title: 'Indent'
    },
    {
      group: 'blockFormat',
      icon: 'fa-outdent',
      name: 'outdent',
      native: true,
      title: 'Outdent'
    },
    {
      group: 'blockFormat',
      icon: 'fa-list-ul',
      name: 'unorderdList',
      native: true,
      title: 'Unordered List'
    },
    {
      group: 'blockFormat',
      icon: 'fa-list-ol',
      name: 'orderedList',
      native: true,
      title: 'Ordered List'
    },
    {
      dialog: {
        input: {
          invalidColor: 'Invalid Color',
          placeholder: 'HEX or RGB'
        },
        button: {
          ok: 'OK'
        }
      },
      group: 'fontTools',
      icon: 'fa-pencil-square-o',
      name: 'foreColor',
      native: false,
      title: 'Font Color'
    },
    {
      dialog: {
        button: {
          ok: 'OK'
        },
        input: {
          invalidColor: 'Invalid Color',
          placeholder: 'HEX or RGB'
        }
      },
      group: 'fontTools',
      icon: 'fa-pencil-square',
      name: 'backColor',
      native: false,
      title: 'Background Color'
    },
    {
      group: 'extraTools',
      icon: 'fa-table',
      name: 'tables',
      native: false,
      title: 'Insert Table'
    },
    {
      dialog: {
        button: {
          ok: 'OK'
        },
        checkBox: {
          label: 'New Window'
        },
        input: {
          placeholder: 'http(s)://'
        }
      },
      group: 'linkTools',
      icon: 'fa-link',
      name: 'links',
      native: false,
      title: 'Insert Link'
    },
    {
      group: 'linkTools',
      icon: 'fa-unlink',
      name: 'unlink',
      native: false,
      title: 'Remove Link'
    },
    {
      dialog: {
        button: {
          ok: 'OK',
          upload: 'Upload'
        },
        info: ['Type Alt attribute and click an image to select', 'OR type URL and click OK'],
        inputAlt: {
          placeholder: 'Alt'
        },
        inputUrl: {
          placeholder: 'http(s)://'
        }
      },
      group: 'extraTools',
      icon: 'fa-picture-o',
      native: false,
      name: 'images',
      title: 'Insert Image'
    },
    {
      dialog: {
        languages: ['PHP', 'javascript', 'bash', 'HTML']
      },
      group: 'extraTools',
      icon: 'fa-file-code-o',
      native: false,
      name: 'codes',
      title: 'Insert Code'
    },
    {
      group: 'solo',
      icon: 'fa-code',
      name: 'toggleView',
      native: false,
      title: 'Toggle View'
    }
  ]
}
