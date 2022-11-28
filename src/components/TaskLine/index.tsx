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
  handleToggle: (item: TodoItem) => void
  updateText: (item: TodoItem, text: string) => void
  removeItem: (item: TodoItem) => void
}

export const TaskLine = ({
  item,
  handleToggle,
  updateText,
  removeItem,
}: TaskLineProps) => {
  return (
  <ListItem>
    <Checkbox
      edge="start"
      onClick={() => handleToggle(item)}
      checked={item.done}
      tabIndex={-1}
      disableRipple
      inputProps={{ role: 'checkbox' }}
    />
    <TextField
    variant="standard"
    placeholder="Whats need to be done?"
    value={item.text}
    onChange={(e) => {
      updateText(item, e.target.value)
    }}
    className={`${item.done ? styles.listChecked : ''} ${styles.textField}`}
    />
      <ListItemSecondaryAction>
    <IconButton onClick={() => removeItem(item)} role="remove-button">
      <Delete
      color="error"
      />
    </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
  )
}
