/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import _ from 'lodash'
import {ITypeChecker} from './TypeChecker'
export class ObjectChecker implements ITypeChecker {
  private _required: boolean
  private _schemas: {[key: string]: ITypeChecker}
  constructor(schemas: {[key: string]: ITypeChecker}) {
    this._required = false
    this._schemas = schemas
  }
  check(data: any): boolean {
    if(_.isNil(data)){
      return !this._required
    }
    if(!_.isObject(data) || _.isFunction(data) || _.isArray(data)){
      return false
    }
    let checkingFlag: boolean = true
    _.forEach(this._schemas, (typeChecker, key) => {
      if(!typeChecker.check(data[key])){
        checkingFlag = false
        return false
      }
    })
    return checkingFlag
  }

  required(): ITypeChecker {
    this._required = true
    return this
  }
}
