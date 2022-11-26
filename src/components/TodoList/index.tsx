import List from '@mui/material/List'
import { v1 as uuid } from 'uuid'
import { useState } from 'react'
import { TodoItem } from '@/models/TodoItem'
import { Button } from '@mui/material'
import { TaskLine } from '../TaskLine'
import styles from './styles.module.scss'

const cleanItem = (): TodoItem => ({ text: '', done: false, uuid: uuid(), editing: true })

export const TodoList = () => {
  const [items, setItems] = useState<TodoItem[]>([cleanItem()])

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
    setItems([...items, cleanItem()])
  }

  const removeItem = (item: TodoItem) => {
    const index = items.indexOf(item)
    const newItems = [...items]
    newItems.splice(index, 1)
    if (newItems.length === 0) {
      newItems.push(cleanItem())
    }
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
    <Button onClick={newItem}>Adicionar task</Button>
    </p>
    </div>
  )
}
