/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import {expect} from 'chai'
import {any, array, boolean, number, object, string, validate} from './index'
describe('are-u', () => {
  describe('string', () => {
    it('can validate', () => {
      const schema = string()
      expect(validate('this is string', schema)).to.equal(true)
      expect(validate(2, schema)).to.equal(false)
      expect(validate(() => 1, schema)).to.equal(false)
      expect(validate([], schema)).to.equal(false)
      expect(validate({}, schema)).to.equal(false)
      expect(validate(true, schema)).to.equal(false)
      expect(validate(undefined, schema)).to.equal(true)
      const schemaRequired = string().required()
      expect(validate(undefined, schemaRequired)).to.equal(false)
      const schemaTest = string().test(/\.js$/)
      expect(validate('test.js', schemaTest)).to.equal(true)
      expect(validate('j-test.s', schemaTest)).to.equal(false)
      const schemaEmail = string().email()
      expect(validate('test@test.net', schemaEmail)).to.equal(true)
      expect(validate('test-test@net', schemaEmail)).to.equal(false)
      const schemaUuid = string().uuid()
      expect(validate('02BECFE0-4736-11E7-BE0C-B10A93E9DE77', schemaUuid)).to.equal(true)
      expect(validate('02BECFE0-4736-11E7-B-0C-B10A93E9DE77', schemaUuid)).to.equal(false)
    })
  })
  describe('number', () => {
    it('can validate', () => {
      const schema = number()
      expect(validate('this is string', schema)).to.equal(false)
      expect(validate(2, schema)).to.equal(true)
      expect(validate(() => 1, schema)).to.equal(false)
      expect(validate([], schema)).to.equal(false)
      expect(validate({}, schema)).to.equal(false)
      expect(validate(true, schema)).to.equal(false)
      expect(validate(undefined, schema)).to.equal(true)
      const schemaRequired = number().required()
      expect(validate(undefined, schemaRequired)).to.equal(false)
    })
  })
  describe('boolean', () => {
    it('can validate type and required', () => {
      const schema = boolean()
      expect(validate('this is string', schema)).to.equal(false)
      expect(validate(2, schema)).to.equal(false)
      expect(validate(() => 1, schema)).to.equal(false)
      expect(validate([], schema)).to.equal(false)
      expect(validate({}, schema)).to.equal(false)
      expect(validate(true, schema)).to.equal(true)
      expect(validate(undefined, schema)).to.equal(true)
      const schemaRequired = boolean().required()
      expect(validate(undefined, schemaRequired)).to.equal(false)
    })
  })
  describe('any', () => {
    it('can validate type and required', () => {
      const schema = any()
      expect(validate('this is string', schema)).to.equal(true)
      expect(validate(2, schema)).to.equal(true)
      expect(validate(() => 1, schema)).to.equal(true)
      expect(validate([], schema)).to.equal(true)
      expect(validate({}, schema)).to.equal(true)
      expect(validate(true, schema)).to.equal(true)
      expect(validate(undefined, schema)).to.equal(true)
      const schemaRequired = boolean().required()
      expect(validate(undefined, schemaRequired)).to.equal(false)
    })
  })
  describe('object', () => {
    it('can validate object type and members', () => {
      const schema = object({})
      expect(validate('this is string', schema)).to.equal(false)
      expect(validate(2, schema)).to.equal(false)
      expect(validate(() => 1, schema)).to.equal(false)
      expect(validate([], schema)).to.equal(false)
      expect(validate({}, schema)).to.equal(true)
      expect(validate(true, schema)).to.equal(false)
      expect(validate(undefined, schema)).to.equal(true)
      const schemaHasMembers = object({
        age: number(),
        isMale: boolean(),
        name: string(),
      })
      expect(
        validate(
          {
            age: 900,
            isMale: true,
            name: 'bichi',
          },
          schemaHasMembers,
        ),
      ).to.equal(true)
      expect(
        validate(
          {
            age: '900',
            isMale: 'true',
            name: 'bichi',
          },
          schemaHasMembers,
        ),
      ).to.equal(false)
    })
    it('can validate deep', () => {
      const schema = object({
        items: object({
          ball: boolean(),
          map: string(),
        }),
        name: string(),
      })
      expect(
        validate(
          {
            items: {
              ball: true,
              map: 'would map',
            },
            name: 'bichi',
          },
          schema,
        ),
      ).to.equal(true)
      expect(
        validate(
          {
            items: {
              ball: true,
              map: false,
            },
            name: 'bichi',
          },
          schema,
        ),
      ).to.equal(false)
    })
  })
  describe('array', () => {
    it('can validate array type and members', () => {
      const schema = array([])
      expect(validate('this is string', schema)).to.equal(false)
      expect(validate(2, schema)).to.equal(false)
      expect(validate(() => 1, schema)).to.equal(false)
      expect(validate([], schema)).to.equal(true)
      expect(validate({}, schema)).to.equal(false)
      expect(validate(true, schema)).to.equal(false)
      expect(validate(undefined, schema)).to.equal(true)
      const schemaRequired = array([]).required()
      expect(validate(undefined, schemaRequired)).to.equal(false)
      const schemaMembers = array([string()])
      expect(
        validate(['the', 'super', 'easy', 'and', 'fast', 'validation'], schemaMembers),
      ).to.equal(true)
      expect(
        validate(['the', 'super', 'easy', 'and', 'fast', 'validation', 2], schemaMembers),
      ).to.equal(false)
      const schemaMembersMoreTypes = array([string(), number(), any().required()])
      expect(
        validate(['the', 'super', 'easy', 'and', 'fast', 'validation'], schemaMembersMoreTypes),
      ).to.equal(false)
      expect(
        validate(
          ['the', 2, false, 'super', 'easy', 'and', 'fast', 'validation'],
          schemaMembersMoreTypes,
        ),
      ).to.equal(true)
      expect(validate(['the', 2], schemaMembersMoreTypes)).to.equal(false)
    })
    it('can validate deep', () => {
      const schema = array([
        object({
          age: number().required(),
          name: string().required(),
        }),
        boolean().required(),
      ])
      expect(validate([{age: 9999, name: 'bichi'}, true], schema)).to.equal(true)
      expect(validate([{age: 9999, name: 'bichi'}], schema)).to.equal(false)
      expect(validate([{age: 'unknown', name: 'bichi'}], schema)).to.equal(false)
    })
  })
})
