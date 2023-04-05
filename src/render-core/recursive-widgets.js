import { createWidget, deleteWidget, updateWidget } from './vue2'

const widgetList = [
  {
    id: 'container-dialog',
    widgetExportName: '',
    widgetRuntimeCtor: function() {},
    widgetRuntimeOptions: {},
    available: false,
    isContainer: true,
    position: {
      //位置,都是百分比
      x: 0.5,
      y: 10,
      width: 99,
      height: 89
    },
    layer: 1000,
    widgetConfig: {},
    children: []
  }
]
let pageConfig = {
  version: '1.0.0',
  technologyStack: 'vue2',
  widgetList: widgetList,
  wrapper: {
    name: 'SichartWrapper',
    options: {}
  }
}
const recursion = function(widgetList, create, fWidgetInstance) {
  fWidgetInstance.widgetInstances = []
  for (const widgetObj of widgetList) {
    widgetObj.wrapper = pageConfig.wrapper
    const widgetInstance = create(widgetObj, this, fWidgetInstance, widgetList)
    fWidgetInstance.widgetInstances.push(widgetInstance)
    if (Array.isArray(widgetObj.children) && widgetObj.children.length > 0) {
      recursion(widgetObj.children, create, widgetInstance)
    }
  }
  return fWidgetInstance.widgetInstances
}
const technologyStacks = {
  vue2: function() {
    return {
      create: createWidget,
      update: updateWidget,
      delete: deleteWidget
    }
  },
  vue3: function() {

  }
}
const renderWidgets = function(config) {
  pageConfig = config
  //this 指向技术栈的runtime
  const dynamicFuncMap = technologyStacks[config.technologyStack]
  const widgetInstances = recursion.bind(this)(pageConfig.widgetList, dynamicFuncMap.create, this)
  return widgetInstances
}
export { renderWidgets }
