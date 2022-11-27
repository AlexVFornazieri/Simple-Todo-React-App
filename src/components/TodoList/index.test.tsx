import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as store from '@/store'

import { TodoList } from '.'

jest.mock('@/store')

describe('Todo list', () => {
  it('Should call getObject and start with one empty task', async () => {
    const getObjectSpy = jest.spyOn(store, 'getObject')
      .mockImplementation((): any => new Promise(resolve => resolve(null)))
    render(<TodoList />)

    await waitFor(() => {
      const addButton = screen.getByTestId('addButton')
      expect(addButton).toBeInTheDocument()
    })
    expect(getObjectSpy).toBeCalledWith('todoItems')
  })
})
