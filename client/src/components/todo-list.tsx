import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-900 text-white p-4">
        <h3 className="text-lg font-semibold">Todo List</h3>
        <p className="text-gray-300 text-sm">Form handling and list management</p>
      </div>
      <div className="p-8">
        <div className="mb-6">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addTodo} className="bg-primary hover:bg-primary/90">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <span 
                className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}
              >
                {todo.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
