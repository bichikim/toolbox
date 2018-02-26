import {EventListeners, IEventListeners} from './EventListeners'

export interface IEventEmitOnOptions {
  once?: boolean
}

export type TEventListener = (...args: any[]) => void

export interface IEventEmit {
  on(type: string, listener: TEventListener, options?: IEventEmitOnOptions): void
  once(type: string, listener: TEventListener): void
  off(type: string, listener: TEventListener): void
  emit(type: string, ...args: any[]): void
}

export class EventEmit implements IEventEmit {
  private _typedListeners: {[typeName: string]: IEventListeners}

  constructor() {
    this._typedListeners = {}
  }

  on(type: string, listener: TEventListener, {once = false}: IEventEmitOnOptions = {}): void {
    let listeners: IEventListeners | undefined = this._getListeners(type)
    if(!listeners){
      listeners = this._addListeners(type)
    }
    listeners.add(listener, {once})
  }
  once(type: string, listener: TEventListener) {
    return this.on(type, listener, {once: true})
  }
  off(type: string, listener: TEventListener) {
    const listeners: IEventListeners | undefined = this._getListeners(type)
    if(!listeners){
      return
    }
    listeners.remove(listener)
  }

  getLength(type: string): number {
    const listeners: IEventListeners | undefined = this._getListeners(type)
    if(!listeners){
      return 0
    }
    return listeners.length
  }

  emit(type: string, ...args: any[]): Promise<void> {
    const listeners: IEventListeners | undefined = this._getListeners(type)
    if(!listeners){
      return new Promise((resolve, reject) => {
        reject()
      })
    }
    return listeners.runAll(...args)
  }

  private _getListeners(type: string): IEventListeners | undefined {
    return this._typedListeners[type]
  }

  private _addListeners(type: string): IEventListeners {
    const eventListeners = new EventListeners()
    this._typedListeners[type] = eventListeners
    return eventListeners
  }
}
