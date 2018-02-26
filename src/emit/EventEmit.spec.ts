import {expect} from 'chai'
import {EventEmit} from './EventEmit'
describe('EventEmit', () => {
  it('can add on listener', () => {
    const ee = new EventEmit()
    const func1 = () => 1
    const func2 = () => 1
    ee.on('test1', func1)
    ee.on('test2', func1)
    ee.on('test2', func2)
    ee.on('test2', func2)
    expect(ee.getLength('test1')).to.equal(1)
    expect(ee.getLength('test2')).to.equal(2)
  })

  it('can remove off listener', (done) => {
    const ee = new EventEmit()
    const state = {a: 0, b: 0, c: 0, d: 0}
    const func1 = (data) => (state.a = data)
    const func2 = (data) => (state.b = data)
    ee.on('test1', func1)
    ee.on('test2', func1)
    ee.on('test2', func2)
    ee.off('test1', func1)
    ee.off('test2', func2)
    expect(ee.getLength('test1')).to.equal(0)
    expect(ee.getLength('test2')).to.equal(1)
    ee.emit('test2', 5).then(() => {
      expect(state.a).to.equal(5)
      done()
    })
  })
  it('can add once listener', (done) => {
    const ee = new EventEmit()
    const state = {a: 0, b: 0, c: 0, d: 0}
    const func1 = (data) => (state.a = data)
    const func2 = (data) => (state.b = data)
    ee.once('test1', func1)
    ee.once('test2', func1)
    ee.once('test2', func2)
    ee.emit('test2', 5).then(() => {
      expect(ee.getLength('test2')).to.equal(0)
      done()
    })
  })

  it('can emit type of listeners', (done) => {
    const ee = new EventEmit()
    const state = {a: 0, b: 0, c: 0, d: 0}
    const func1 = (data) => (state.a = data)
    const func2 = (data) => (state.b = data)
    ee.on('test1', func1)
    ee.once('test2', func2)
    ee.emit('test2', 5).then(() => {
      expect(state.b).to.equal(5)
      ee.emit('test1', 10).then(() => {
        expect(state.a).to.equal(10)
        done()
      })
    })
  })
})
