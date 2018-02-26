/**
 *
 * @author Bichi Kim <bichi@live.co.kr> <bichi@pjfactory.com>
 */
import merge, {mergeInfinity, mergeDeep} from './index.ts'
describe('Assign', () => {

  it('has members', () => {
    expect(merge).to.be.a('function')
    expect(mergeDeep).to.be.a('function')
    expect(mergeInfinity).to.be.a('function')
  })
  let state, payload
  beforeEach(() =>{
    state = {
      foo: 'state1',
      bar: 'state2',
      john: {
        foo: 'jState1',
        bar: 'jState2',
        john: {
          foo: 'jjState1',
          bar: 'jjState2',
          john: {
            foo: 'jjjState1',
            bar: 'jjjState2',
          },
        },
      },
    }
    payload = {
      foo: 'payload1',
      bar: 'payload2',
      don: 'payload3',
      john: {
        foo: 'jPayload1',
        bar: 'jPayload2',
        john: {
          foo: 'jjPayload1',
          bar: 'jjPayload2',
          john: {
            foo: 'jjjPayload1',
            bar: 'jjjPayload2',
          },
        },
      },
    }
  })
  describe('merge', () => {
    it('should merge', () => {
      merge(state, payload)
      expect(state.foo).to.equal('payload1')
      expect(state.don).to.equal('payload3')
    })
    it('should merge in save mode', () => {
      merge(state, payload, true)
      expect(state.foo).to.equal('payload1')
      expect(state.don).to.equal(undefined)
    })
  })
  describe('mergeDeep', () => {
    it('should merge deeply', () => {
      mergeDeep(state, payload)
      expect(state.foo).to.equal('payload1')
      expect(state.bar).to.equal('payload2')
      expect(state.john.foo).to.equal('jPayload1')
      expect(state.john.bar).to.equal('jPayload2')
    })
  })
  describe('mergeInfinity', () => {
    it('should merge deeply', () => {
      mergeInfinity(state, payload)
      expect(state.foo).to.equal('payload1')
      expect(state.bar).to.equal('payload2')
      expect(state.john.foo).to.equal('jPayload1')
      expect(state.john.bar).to.equal('jPayload2')
      expect(state.john.john.foo).to.equal('jjPayload1')
      expect(state.john.john.bar).to.equal('jjPayload2')
      expect(state.john.john.john.foo).to.equal('jjjPayload1')
      expect(state.john.john.john.bar).to.equal('jjjPayload2')
    })
  })
})
