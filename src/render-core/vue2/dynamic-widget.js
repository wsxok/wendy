const createWidget = function(widgetObj, Vue, fWidgetInstance, widgetList) {
  /**
     * 获取组件构造函数 创建组件
      */
  let ComponentConstructor
  if (widgetObj.widgetRuntimeCtor) {
    ComponentConstructor = widgetObj.widgetRuntimeCtor
  }
  if (widgetObj.widgetRuntimeOptions) {
    ComponentConstructor = Vue.extend(widgetObj.widgetRuntimeCtor)
  }
  const componentData = { widgetConfig: widgetObj.widgetConfig }
  if (widgetObj.isContainer === true) {
    componentData.widgetObj = widgetObj
  }
  const componentInstance = new ComponentConstructor({
    data: componentData
  })
  componentInstance.$mount()
  const basePosition = getBasePositionAndCheckFixed(widgetList, fWidgetInstance)
  const positionStyle = calcPosition(widgetObj.position, basePosition)

  function $_getPositionStyle() {
    const basePosition = getBasePositionAndCheckFixed(widgetList, fWidgetInstance)
    return calcPosition(widgetObj.position, basePosition)
  }

  /**
     * 获取wrapper
      */
  if (widgetObj.wrapper && widgetObj.wrapper.name) {
    const WrapperCtor = Vue.component(widgetObj.wrapper.name)
    const wrapperInstance = new WrapperCtor(widgetObj.wrapper.options)
    if (fWidgetInstance) {
      fWidgetInstance.$el.appendChild(wrapperInstance.$el)
    } else {
      document.body.appendChild(wrapperInstance.$el)
    }

    // 把计算好的位置信息和组件实例、widgetConfig 传给wrapper ,wrapper 自己决定 组件大小 位置 已经挂载点
    wrapperInstance.options.methods.$_getPositionStyle = $_getPositionStyle
    wrapperInstance.componentInstance = componentInstance
    wrapperInstance.widgetObj = widgetObj

    return wrapperInstance
  } else {
    if (fWidgetInstance) {
      fWidgetInstance.$el.appendChild(componentInstance.$el)
    } else {
      document.body.appendChild(componentInstance.$el)
    }
    componentInstance.$el.style.width = positionStyle.width
    componentInstance.$el.style.height = positionStyle.height
    componentInstance.$el.style.top = positionStyle.top
    componentInstance.$el.style.left = positionStyle.left
  }
}
const updateWidget = function() {

}

const deleteWidget = function() {

}

const initWidgets = function() {

}
const destroyWidget = function() {

}
const getBasePositionAndCheckFixed = (widgetList, fWidgetInstance) => {
  let fHeight = fWidgetInstance.$el.offsetHeight
  let fWidth = fWidgetInstance.$el.offsetWidth
  let originX = 0
  let originY = 0
  for (const widgetItem of widgetList) {
    if (widgetItem.position.fixed === 'left') {
      fWidth = fWidth - widgetItem.position.width.split('px')[0]
      originX = originX + widgetItem.position.width.split('px')[0] - 0
    }
    if (widgetItem.position.fixed === 'right') {
      fWidth = fWidth - widgetItem.position.width.split('px')[0]
    }
    if (widgetItem.position.fixed === 'top') {
      fHeight = fHeight - widgetItem.position.height.split('px')[0]
      originY = originY + widgetItem.position.height.split('px')[0] - 0
    }
    if (widgetItem.position.fixed === 'bottom') {
      fHeight = fHeight - widgetItem.position.height.split('px')[0]
    }
  }
  const fixedWidth = fWidgetInstance.$el.offsetWidth - fWidth
  const fixedHeight = fWidgetInstance.$el.offsetHeight - fHeight

  return {
    fHeight, fWidth, originX, originY
  }
}
const calcPosition = (position, basePosition) => {
  const fHeight = basePosition.fHeight
  const fWidth = basePosition.fHeight
  const originX = basePosition.originX
  const originY = basePosition.originY

  const style = {
    height: '100px',
    width: '100px',
    top: '0',
    left: '0'
  }
  style.origin_position = position
  if (position.fixed) {
    style.left = position.x
    style.top = position.y
    style.width = position.width
    style.height = position.height
    return style
  }
  style.left = typeof position.x !== 'number' ? position.x : position.x / 100 * fWidth + originX + 'px'
  style.top = typeof position.y !== 'number' ? position.y : position.y / 100 * fHeight + originY + 'px'
  style.width = typeof position.width !== 'number' ? position.width : position.width / 100 * fWidth
  style.height = typeof position.height !== 'number' ? position.height : position.height / 100 * fHeight

  return style
}
export { createWidget, updateWidget, deleteWidget }
