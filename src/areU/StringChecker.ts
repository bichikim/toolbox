import _ from 'lodash'
import {ITypeChecker, TypeChecker} from './TypeChecker'
const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
const uuidReg = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/
export interface IStringChecker extends ITypeChecker {
  uuid(): IStringChecker
  email(): IStringChecker
  test(reg: any): IStringChecker
}

export class StringChecker extends TypeChecker implements IStringChecker {
  private _uuid: boolean
  private _email: boolean
  private _test: any
  constructor(validator: (data: any) => boolean) {
    super(validator)
    this._uuid = false
    this._email = false
    this._test = null
  }

  check(data: any): boolean {
    const isOk = super.check(data)
    if(!isOk){
      return false
    }
    if(this._uuid){
      if(!uuidReg.test(data)){
        return false
      }
    }
    if(this._email){
      if(!emailReg.test(data)){
        return false
      }
    }
    if(!_.isNil(this._test)){
      if(!this._test.test(data)){
        return false
      }
    }
    return true
  }

  test(reg: any): IStringChecker {
    if(reg && reg.test){
      this._test = reg
      return this
    }
    throw new Error('[are-u test] test reg is not Regular expression')
  }

  uuid(): IStringChecker {
    this._uuid = true
    return this
  }

  email(): IStringChecker {
    this._email = true
    return this
  }
}
