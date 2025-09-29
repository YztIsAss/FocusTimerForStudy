import { useEffect, useState } from "react";
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
  IconButton,
  Stack,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(saveTodos, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
          やることリスト
        </Typography>
        <Typography variant="body2" color="grey.300">
          取り組みたい科目や範囲などを決めてメモしよう！
        </Typography>
      </Box>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="追加するタスクを入力"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyPress}
            size="small"
          />
          <IconButton
            onClick={addTodo}
            color="primary"
          >
            <Add/>
          </IconButton>
        </Stack>

        <List disablePadding>
          {todos.map((todo) => (
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => deleteTodo(todo.id)}
                  color="error"
                >
                  <Delete />
                </IconButton>
              }
              key={todo.id}
              sx={{
                mb: 1,
                borderRadius: 1,
                px: 2,
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
                  opacity: todo.completed ? 0.6 : 1,
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
