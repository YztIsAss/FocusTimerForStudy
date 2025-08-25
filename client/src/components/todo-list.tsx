import { useState } from "react";
import { 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  Checkbox, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton,
  Stack
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React hooks", completed: false },
    { id: 2, text: "Build awesome components", completed: false },
    { id: 3, text: "Set up development environment", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <Box sx={{ bgcolor: "grey.900", color: "white", p: 2 }}>
        <Typography variant="h6" component="h3">
          Todo List
        </Typography>
        <Typography variant="body2" color="grey.300">
          Form handling and list management
        </Typography>
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            size="small"
          />
          <Button
            onClick={addTodo}
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add
          </Button>
        </Stack>
        
        <List disablePadding>
          {todos.map((todo) => (
            <ListItem 
              key={todo.id} 
              sx={{ 
                bgcolor: "grey.50", 
                mb: 1, 
                borderRadius: 1,
                px: 2
              }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText 
                primary={todo.text}
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  opacity: todo.completed ? 0.6 : 1
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => deleteTodo(todo.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
