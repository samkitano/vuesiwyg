export const execute = ({ commit }, data) => {
  commit('EXECUTE', data)
}

export const setAction = ({ commit }, name) => {
  commit('SET_ACTION', name)
}

export const setAppId = ({ commit }, id) => {
  commit('SET_APP_ID', id)
}

export const toggleView = ({ commit }) => {
  commit('TOGGLE_VIEW')
}

export const updateActiveTools = ({ commit }, json) => {
  commit('UPDATE_ACTIVE_TOOLS', json)
}

export const updateContent = ({ commit }, content) => {
  commit('UPDATE_CONTENT', content)
}

export const updateDialog = ({ commit }, current) => {
  commit('UPDATE_DIALOG', current)
}

export const updateDisabledTools = ({ commit }, json) => {
  commit('UPDATE_DISABLED_TOOLS', json)
}

export const updateImages = ({ commit }, json) => {
  commit('UPDATE_IMAGES', json)
}
