import List from '@mui/material/List'
import { useState } from 'react'
import { TodoItem } from '@/models/TodoItem'
import { Button } from '@mui/material'
import { TaskLine } from '../TaskLine'
import styles from './styles.module.scss'

export const TodoList = () => {
  const [items, setItems] = useState<TodoItem[]>([new TodoItem()])

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
    setItems([...items, new TodoItem()])
  }

  const removeItem = (item: TodoItem) => {
    const index = items.indexOf(item)
    const newItems = [...items]
    newItems.splice(index, 1)
    setItems(newItems)
  }

  const handleToggle = (item: TodoItem) => {
    item.done = !item.done
    updateItem(item)
  }

  const updateText = (item: TodoItem, text: string) => {
    item.text = text
    updateItem(item)
  }

  return (
    <div className={styles.todoList}>
      <h1 className='textCenter'>A simple TO-DO list</h1>
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
          removeItem={removeItem}
          />
        )
      })}
    </List>
    <p className='textCenter'>
    <Button onClick={newItem}>Add task</Button>
    </p>
    </div>
  )
}
