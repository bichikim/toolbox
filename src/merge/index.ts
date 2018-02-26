import forEach from 'lodash/forEach'
import isObject from 'lodash/isObject'
type TRunner = (
  key: string,
  item: any,
  isSave?: boolean,
  state?: {},
  payload?: {},
  ) => void
const forEachRun = (
  state: {} = {},
  payload: {} = {},
  runner: TRunner,
  isSave = false,
) => {
  forEach(payload, (item: any, key: string) => {
    if(isSave){
      const stateData = state[key]
      if(stateData || stateData === null){
        runner(key, item, isSave, state, payload)
        return true
      }
      return true
    }
    runner(key, item, isSave, state, payload)
  })
}

export const assign = (state: {} = {}, payload: {} = {}, isSave = false) => {
  const save = (key, item, isSave, state) => {
    state[key] = item
  }
  forEachRun(state, payload, save, isSave)
}

export const deepAssign = (state: {} = {}, payload: {} = {}, isSave = false) => {
  const save = (key, item) => {
    assign(state[key], item, isSave)
  }
  forEachRun(state, payload, save, isSave)
}

const deepInfinitySave = (
  key: string,
  item: {},
  isSave: boolean = false,
  state: {} = {},
  ) => {
  const stateData = state[key]
  if(isObject(item) && isObject(stateData)){
    deepInfinityAssign(stateData, item, isSave)
    return
  }
  state[key] = item
}
export const deepInfinityAssign = (state: {} = {}, payload: {} = {}, isSave = false) => {
  forEachRun(state, payload, deepInfinitySave, isSave)
}
