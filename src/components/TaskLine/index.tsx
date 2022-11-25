import { TodoItem } from '@/models/TodoItem'
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'

interface TaskLineProps {
  item: TodoItem
  labelId: string
  handleToggle: (item: TodoItem) => () => void
}

export const TaskLine = ({ item, labelId, handleToggle }: TaskLineProps) => {
  return (
  <ListItem>
    <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={item.done}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>
      <ListItemText>
        <TextField />
      </ListItemText>
    </ListItemButton>
  </ListItem>
  )
}
