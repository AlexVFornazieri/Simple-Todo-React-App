import { wait } from './index'
describe('Utils index unit test', () => {
  it('wait must await a certain interval', async () => {
    const spySetTimeout = jest.spyOn(global, 'setTimeout')
    await wait(100)
    expect(spySetTimeout).toHaveBeenCalledWith(expect.any(Function), 100)
  })
})
