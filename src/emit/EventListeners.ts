import _ from 'lodash'
import {TEventListener} from './EventEmit'
interface IEventListenersOptions {
  once?: boolean
}
export interface IEventListeners {
  length: number
  add(listener: TEventListener, options: IEventListenersOptions): void
  remove(listener: TEventListener): void
  runAll(...args: any[]): Promise<void>
  removeAll(): void
}

export class EventListeners implements IEventListeners {
  private _listeners: TEventListener[]
  private _listenersOnce: TEventListener[]
  constructor() {
    this._listeners = []
    this._listenersOnce = []
  }
  add(listener: TEventListener, {once = false}: IEventListenersOptions = {}): void {
    if(!_.isFunction(listener)){
      throw new Error('[EventListeners] listener must be a function')
    }
    const myListener = _.find(this._listeners, (myListener: TEventListener) => {
      return listener === myListener
    })
    const myListenerOnce = _.find(this._listenersOnce, (myListener: TEventListener) => {
      return listener === myListener
    })
    if(myListener || myListenerOnce){
      return
    }
    if(once){
      this._listenersOnce.push(listener)
      return
    }
    this._listeners.push(listener)
  }
  remove(listener: TEventListener): void {
    _.pull(this._listeners, listener)
    _.pull(this._listenersOnce, listener)
  }

  get length(): number {
    return this._listeners.length + this._listenersOnce.length
  }

  removeAll(): void {
    this._listeners = []
    this._listenersOnce = []
  }

  runAll(...args: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      try{
        this._listeners.forEach((listener) => {
          listener(...args)
        })
        this._listenersOnce.forEach((listener) => {
          listener(...args)
        })
      }catch(error){
        reject(error)
        return
      }
      // remove once
      this._listenersOnce = []
      resolve()
    })
  }
}
