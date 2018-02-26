/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import _ from 'lodash'
import {ITypeChecker} from './TypeChecker'
export class ArrayChecker implements ITypeChecker {
  private _required: boolean
  private _schemas: ITypeChecker[]
  constructor(schemas: ITypeChecker[]) {
    this._required = false
    this._schemas = schemas
  }
  check(data: any): boolean {
    if(_.isNil(data)){
      return !this._required
    }
    if(!_.isArray(data)){
      return false
    }
    let checkingFlag: boolean = true
    // if it has only 1 schemas it means all members are using same schema
    if(this._schemas.length === 1){
      const typeChecker = this._schemas[0]
      _.forEach(data, (aData) => {
        if(!typeChecker.check(aData)){
          checkingFlag = false
          return false
        }
      })
    }else{
      _.forEach(this._schemas, (typeChecker, key) => {
        if(!typeChecker.check(data[key])){
          checkingFlag = false
          return false
        }
      })
    }
    return checkingFlag
  }
  required(): ITypeChecker {
    this._required = true
    return this
  }
}
