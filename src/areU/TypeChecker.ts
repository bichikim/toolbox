import _ from 'lodash'
export interface ITypeChecker {
  check(data: any): boolean
  required(): ITypeChecker
}
export class TypeChecker implements ITypeChecker {
  private _required: boolean
  private _typeChecker: (data: any) => boolean
  constructor(validator: (data: any) => boolean) {
    this._required = false
    this._typeChecker = validator
  }
  check(data: any): boolean {
    if(_.isNil(data)){
      return !this._required
    }
    return this._typeChecker(data)
  }

  required(): ITypeChecker {
    this._required = true
    return this
  }
}
