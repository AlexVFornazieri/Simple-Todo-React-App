import List from '@mui/material/List'
import { useEffect, useState } from 'react'
import { TodoItem } from '@/models/TodoItem'
import { Button, LinearProgress } from '@mui/material'
import { getObject, saveObject } from '@/store'

import { TaskLine } from '../TaskLine'
import styles from './styles.module.scss'

const collection = 'todoItems'

export const TodoList = () => {
  const [items, setItems] = useState<TodoItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const updateItem = (item: TodoItem) => {
    const index = items.indexOf(item)
    if (index === -1) {
      return
    }
    const newItems = [...items]
    newItems[index] = item
    saveObject(collection, newItems)
    setItems(newItems)
  }

  useEffect(() => {
    getObject(collection)
      .then((data) => {
        const storedItems = data ?? [new TodoItem()]
        setItems(storedItems)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [setItems, setLoading])

  const newItem = () => {
    setItems([...items, new TodoItem()])
  }

  const removeItem = (item: TodoItem) => {
    const index = items.indexOf(item)
    const newItems = [...items]
    newItems.splice(index, 1)
    saveObject(collection, newItems)
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
          item={item}
          handleToggle={handleToggle}
          updateText={updateText}
          removeItem={removeItem}
          />
        )
      })}
    </List>
    <p className='textCenter'>
      {
      loading
        ? <LinearProgress />
        : <Button data-testid='addButton' onClick={newItem}>Add task</Button>
      }
    </p>
    </div>
  )
}
