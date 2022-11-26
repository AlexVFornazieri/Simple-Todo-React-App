import { TodoItem } from '@/models/TodoItem'
import { Delete } from '@mui/icons-material'
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  TextField,
} from '@mui/material'

import styles from './styles.module.scss'

interface TaskLineProps {
  item: TodoItem
  labelId: string
  handleToggle: (item: TodoItem) => () => void
  updateText: (item: TodoItem, text: string) => void
}

export const TaskLine = ({ item, labelId, handleToggle, updateText }: TaskLineProps) => {
  return (
  <ListItem>
    <Checkbox
      edge="start"
      onClick={handleToggle(item)}
      checked={item.done}
      tabIndex={-1}
      disableRipple
      inputProps={{ 'aria-labelledby': labelId }}
    />
    {item.editing && <>
    <TextField
    variant="standard"
    placeholder="Whats need to be done?"
    onChange={(e) => {
      updateText(item, e.target.value)
    }}
    className={`${item.done ? styles.listChecked : ''} ${styles.textField}`}
    />
      <ListItemSecondaryAction>
    <IconButton>
      <Delete
      color="error"
      />
    </IconButton>
    </ListItemSecondaryAction>
    </>}
  </ListItem>
  )
}
