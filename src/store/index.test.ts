import { getObject, saveObject } from '.'

describe('Store module', () => {
  it('Shold save to and get from storage', async () => {
    saveObject('test', { okay: true })
    const saved = await getObject('test')
    expect(saved.okay).toBeTruthy()
  })
})
