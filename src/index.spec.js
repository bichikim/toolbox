import toolbox, {merge, mergeDeep, mergeInfinity} from './'
describe('Toolbox', () => {
  it('has members', () => {
    expect(toolbox).to.be.an('object')
    expect(merge).to.be.a('function')
    expect(mergeDeep).to.be.a('function')
    expect(mergeInfinity).to.be.a('function')
    expect()
  })
})
