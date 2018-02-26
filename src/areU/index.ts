import _ from 'lodash'
import {ArrayChecker} from './ArrayChecker'
import {ObjectChecker} from './ObjectChecker'
import {IStringChecker, StringChecker} from './StringChecker'
import {ITypeChecker} from './TypeChecker'
import {TypeChecker} from './TypeChecker'
type TObjectCheckerFactory = (schemas: {[key: string]: ITypeChecker}) => ITypeChecker
type TOArrayCheckerFactory = (schemas: ITypeChecker[]) => ITypeChecker
type TTypeCheckerFactory = () => ITypeChecker
type TTypeStringFactory = () => IStringChecker
type TValidate = (data: any, schema: ITypeChecker) => boolean

export const object: TObjectCheckerFactory = (schemas: {[key: string]: ITypeChecker}) => {
  return new ObjectChecker(schemas)
}

export const array: TOArrayCheckerFactory = (schemas: ITypeChecker[]) => {
  return new ArrayChecker(schemas)
}

export const string: TTypeStringFactory = () => {
  return new StringChecker((data: any) => _.isString(data))
}

export const number: TTypeCheckerFactory = () => {
  return new TypeChecker((data: any) => _.isNumber(data))
}

export const integer: TTypeCheckerFactory = () => {
  return new TypeChecker((data: any) => _.isInteger(data))
}

export const boolean: TTypeCheckerFactory = () => {
  return new TypeChecker((data: any) => _.isBoolean(data))
}

export const any: TTypeCheckerFactory = () => {
  return new TypeChecker(() => true)
}

export const validate: TValidate = (data: any, schema: ITypeChecker) => {
  return schema.check(data)
}
