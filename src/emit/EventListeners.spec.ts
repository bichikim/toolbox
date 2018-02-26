/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
import {expect} from 'chai'
import {EventListeners} from './EventListeners'
describe('EventListeners', () => {
  describe('without an once option', () => {
    {
      const els = new EventListeners()
      const state1 = {a: 0, b: 0}
      const state2 = {a: 0, b: 0}
      const func1 = (a, b) => {
        state1.a = a
        state1.b = b
      }
      const func2 = (a, b) => {
        state2.a = a
        state2.b = b
      }
      it('can get length of listeners', () => {
        expect(els.length).to.equal(0)
      })
      it('can add a listener', () => {
        els.add(func1)
        els.add(func2)
        expect(els.length).to.equal(2)
      })
      it('can run all listeners with params', (done) => {
        els
          .runAll(2, -1)
          .then(() => {
            expect(state1.a).to.equal(2)
            expect(state1.b).to.equal(-1)
            expect(state2.a).to.equal(2)
            expect(state2.b).to.equal(-1)
            done()
          })
          .catch((error) => {
            throw new Error(error)
          })
      })
    }
    {
      const els = new EventListeners()
      const state1 = {a: 0, b: 0}
      const state2 = {a: 0, b: 0}
      const func1 = (a, b) => {
        state1.a = a
        state1.b = b
      }
      const func2 = (a, b) => {
        state2.a = a
        state2.b = b
      }
      it('can remove listener', (done) => {
        els.add(func1)
        els.add(func2)
        els.remove(func1)
        expect(els.length).to.equal(1)
        els.runAll(2, 1).then(() => {
          expect(state1.a).to.equal(0)
          expect(state1.b).to.equal(0)
          expect(state2.a).to.equal(2)
          expect(state2.b).to.equal(1)
          done()
        })
      })
    }
    {
      const els = new EventListeners()
      const state1 = {a: 0, b: 0}
      const func1 = (a, b) => {
        state1.a = a
        state1.b = b
      }
      it('cannot add same function twice', () => {
        els.add(func1)
        els.add(func1)
        expect(els.length).to.equal(1)
      })
    }
  })

  describe('with an once option', () => {
    const els = new EventListeners()
    const state1 = {a: 0, b: 0}
    const state2 = {a: 0, b: 0}
    const func1 = (a, b) => {
      state1.a = a
      state1.b = b
    }
    const func2 = (a, b) => {
      state2.a = a
      state2.b = b
    }
    it('can remove all listeners after run all listeners', (done) => {
      els.add(func1, {once: true})
      els.add(func2, {once: true})
      els.runAll({}, true).then(() => {
        expect(els.length).to.equal(0)
        done()
      })
    })
  })
})
