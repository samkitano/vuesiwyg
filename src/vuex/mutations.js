import { findKey } from 'lodash'

const mutations = {
  EXECUTE (state, data) {
    state.command = data
  },

  SET_ACTION (state, name) {
    state.action = name
  },

  SET_APP_ID (state, id) {
    state.appId = id
  },

  TOGGLE_VIEW (state) {
    state.currentView = state.currentView === 'design' ? 'html' : 'design'
  },

  UPDATE_ACTIVE_TOOLS (state, doc) {
    for (let i in state.tools) {
      if (doc) {
        state.tools[i].active = doc.queryCommandState(name)
      } else {
        state.tools[i].active = false
      }
    }
  },

  UPDATE_CONTENT (state, content) {
    state.content = content
  },

  UPDATE_DIALOG (state, itemName) {
    if (itemName && typeof itemName === 'string') {
      let st = findKey(state.tools, { name: itemName })

      state.tools[st].showDialog = !state.tools[st].showDialog
    }

    for (let i in state.tools) {
      if (state.tools[i].name !== itemName) {
        state.tools[i].showDialog = false
      }
    }
  },

  UPDATE_DISABLED_TOOLS (state, json) {
    let disabled = state.currentView !== 'design'

    for (let i in state.tools) {
      state.tools[i].disabled = disabled
    }

    for (let j in json) {
      let tool = findKey(state.tools, { 'name': j })

      state.tools[tool].disabled = json[j]
    }
  },

  UPDATE_IMAGES (state, json) {
    state.images = json
  }
}

export default mutations
