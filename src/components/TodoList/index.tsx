import List from '@mui/material/List'
import { v1 as uuid } from 'uuid'
import { useState } from 'react'
import { TodoItem } from '@/models/TodoItem'
import { TaskLine } from '../TaskLine'

const item = (): TodoItem => ({ text: '', done: false, uuid: uuid(), editing: true })

export const TodoList = () => {
  const [items, setItems] = useState<TodoItem[]>([item()])

  const newItem = () => {
    setItems([...items, item()])
  }

  const handleToggle = (item: TodoItem) => () => {
    const index = items.indexOf(item)
    const newItems = [...items]
    if (index !== -1 && !item.editing) {
      newItems[index].done = !item.done
    }
    setItems(newItems)
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {items.map((item) => {
        const labelId = `checkbox-list-label-${item.uuid}`

        return (
          <TaskLine key={labelId} labelId={labelId} item={item} handleToggle={handleToggle}/>
        )
      })}
    </List>
  )
}
