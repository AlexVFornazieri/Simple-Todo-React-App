import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as store from '@/store'

import { TodoItem } from '@/models/TodoItem'
import { TodoList } from '.'

jest.mock('@/store')

describe('Todo list', () => {
  it('Should call getObject and start with one empty task', async () => {
    const getObjectSpy = jest.spyOn(store, 'getObject')
      .mockImplementation((): any => new Promise(resolve => resolve(null)))
    const wrapper = render(<TodoList />)
    await waitFor(() => {
      const addButton = wrapper.getByTestId('addButton')
      expect(addButton).toBeInTheDocument()
    })
    expect(getObjectSpy).toBeCalledWith('todoItems')
    const todoInputs = await wrapper.findAllByPlaceholderText('Whats need to be done?')
    expect(todoInputs.length).toBe(1)
    expect(todoInputs[0].getAttribute('value')).toBe('')
  })

  it('Should show saved TODOs correctly', async () => {
    // Create mooks todo items
    const todosMock = [
      new TodoItem('A todo', true),
      new TodoItem('Another todo'),
    ]

    // Mock store function
    jest.spyOn(store, 'getObject')
      .mockImplementation((): any => new Promise(resolve => resolve(todosMock)))

    const wrapper = render(<TodoList />)

    await waitFor(() => {
      // await for loading
      const addButton = wrapper.getByTestId('addButton')
      expect(addButton).toBeInTheDocument()
    })

    // Find all input
    const todoInputs = await wrapper.findAllByPlaceholderText('Whats need to be done?')
    expect(todoInputs.length).toBe(todosMock.length)

    // Check value in each input
    todoInputs.forEach((todo, n) => {
      expect((todo as HTMLInputElement).value).toBe(todosMock[n].text)
    })

    // Find all checkbox
    const todoChecks = await wrapper.findAllByRole('checkbox')
    expect(todoChecks.length).toBe(todosMock.length)

    // Check each checkboxes
    todoChecks.forEach((todo, n) => {
      expect((todo as HTMLInputElement).checked).toBe(todosMock[n].done)
    })
  })

  it('Should all remove buttons be rendered and works', async () => {
    // Create mooks todo itemse
    const todosMock = [
      new TodoItem('A todo', true),
      new TodoItem('Another todo'),
    ]

    // Mock store function
    jest.spyOn(store, 'getObject')
      .mockImplementation((): any => new Promise(resolve => resolve(todosMock)))
    const saveObjectMock = jest.spyOn(store, 'saveObject')
      .mockImplementation((): any => {})

    const wrapper = render(<TodoList />)

    await waitFor(() => {
      // await for loading
      const addButton = wrapper.getByTestId('addButton')
      expect(addButton).toBeInTheDocument()
    })

    // Find all removes
    let todoInputs = await wrapper.findAllByRole('remove-button')
    expect(todoInputs.length).toBe(todosMock.length)

    // Remove first item
    fireEvent.click(todoInputs[0])
    const newTodos = [...todosMock]
    newTodos.splice(0, 1)
    // Remove call save function with spliced array
    expect(saveObjectMock).toBeCalledWith('todoItems', newTodos)

    // Check render
    todoInputs = await wrapper.findAllByRole('remove-button')
    expect(todoInputs.length).toBe(todosMock.length - 1)
  })
})
