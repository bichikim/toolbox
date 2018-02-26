/**
 *
 * @author Bichi Kim <bichi@live.co.kr> <bichi@pjfactory.com>
 */
import {assign, deepAssign, deepInfinityAssign} from './index.ts'
describe('Assign', () => {
  it('has members', () => {
    expect(assign).to.be.a('function')
    expect(deepAssign).to.be.a('function')
    expect(deepInfinityAssign).to.be.a('function')
  })
  describe('assign', () => {
    it('should assign', () => {
      const state = {
        foo: 'state1',
        bar: 'state2',
      }
      const payload = {
        foo: 'payload1',
        bar: 'payload2',
      }
      assign(state, payload)
      expect(state.foo).to.equal('payload1')
      expect(state.bar).to.equal('payload2')
    })
    it('should assign in save mode', () => {
      const state = {
        foo: 'state1',
      }
      const payload = {
        foo: 'payload1',
        bar: 'payload2',
      }
      assign(state, payload, true)
      expect(state.foo).to.equal('payload1')
      expect(state.bar).to.equal(undefined)
    })
  })
  describe('deepAssign', () => {
    it('should assign deeply', () => {
      const state = {
        foo: 'state1',
        bar: 'state2',
        john: {
          foo: 'jState1',
          bar: 'jState2',
        },
      }
      const payload = {
        foo: 'payload1',
        bar: 'payload2',
        john: {
          foo: 'jPayload1',
          bar: 'jPayload2',
        },
      }
      assign(state, payload)
      expect(state.foo).to.equal('payload1')
      expect(state.bar).to.equal('payload2')
      expect(state.john.foo).to.equal('jPayload1')
      expect(state.john.bar).to.equal('jPayload2')
    })
  })
  describe('deepInfinityAssign', () => {
    it('should assign deeply and infinitely', () => {
      const state = {
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
      const payload = {
        foo: 'payload1',
        bar: 'payload2',
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
      assign(state, payload)
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
