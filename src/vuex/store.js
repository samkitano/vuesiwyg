import * as actions from './actions'
import mutations from './mutations'

export default function (config) {
  let tools = config.tools

  for (let tool in tools) {
    tools[tool].active = false
    tools[tool].disabled = false
    tools[tool].showDialog = false
  }

  return {
    actions,
    mutations,
    state: {
      action: '',
      appId: '',
      command: {
        name: '',
        value: ''
      },
      config,
      content: '',
      currentView: 'design',
      images: {},
      tools
    }
  }
}
