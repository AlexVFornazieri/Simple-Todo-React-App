import List from '@mui/material/List'
import { v1 as uuid } from 'uuid'
import { useState } from 'react'
import { TodoItem } from '@/models/TodoItem'
import { Button } from '@mui/material'
import { TaskLine } from '../TaskLine'

const item = (): TodoItem => ({ text: '', done: false, uuid: uuid(), editing: true })

export const TodoList = () => {
  const [items, setItems] = useState<TodoItem[]>([item()])

  const updateItem = (item: TodoItem) => {
    const index = items.indexOf(item)
    if (index === -1) {
      return
    }
    const newItems = [...items]
    newItems[index] = item
    setItems(newItems)
  }

  const newItem = () => {
    setItems([...items, item()])
  }

  const handleToggle = (item: TodoItem) => () => {
    item.done = !item.done
    updateItem(item)
  }

  const updateText = (item: TodoItem, text: string) => {
    item.text = text
    updateItem(item)
  }

  return (
    <div>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {items.map((item) => {
        const labelId = `checkbox-list-label-${item.uuid}`

        return (
          <TaskLine
          key={labelId}
          labelId={labelId}
          item={item}
          handleToggle={handleToggle}
          updateText={updateText}
          />
        )
      })}
    </List>
    <Button onClick={newItem}>Adicionar task</Button>
    </div>
  )
}
