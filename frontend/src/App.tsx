import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

import { TodoForm } from "./components/ui/TodoForm";
import { TodoList } from "./components/ui/TodoList";

interface Todo {
    _id: string;
    text: string;
    completed: boolean;
}

function App() {
    const [newTodo, setNewTodo] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingTodo, setEditingTodo] = useState<string | null>(null);
    const [editedText, setEditedText] = useState<string>("");

    const fetchTodos = async () => {
        try {
            const response = await axios.get<Todo[]>("/api/todos");
            setTodos(response.data);
        } catch (error) {
            console.log("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        try {
            const response = await axios.post<Todo>("/api/todos", {
                text: newTodo,
            });
            setTodos([...todos, response.data]);
            setNewTodo("");
        } catch (error) {
            console.log("Error adding todo:", error);
        }
    };

    const updateTodoInState = (updateTodo: Todo) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo._id === updateTodo._id ? updateTodo : todo
            )
        );
    };

    const saveEdit = async (id: string) => {
        try {
            const response = await axios.patch<Todo>(`/api/todos/${id}`, {
                text: editedText,
            });
            updateTodoInState(response.data);
            setEditingTodo(null);
        } catch (error) {
            console.log("Error updating todo:", error);
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await axios.delete(`/api/todos/${id}`);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (err) {
            console.log("Error deleting todo", err);
        }
    };

    const toggleTodo = async (id: string) => {
        try {
            const todo = todos.find((todo) => todo._id === id);
            if (!todo) return;

            const response = await axios.patch<Todo>(`/api/todos/${id}`, {
                completed: !todo.completed,
            });
            updateTodoInState(response.data);
        } catch (error) {
            console.log("Error toggling todo", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient flex-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gradient">
                    Task Manager
                </h1>

                <TodoForm
                    newTodo={newTodo}
                    setNewTodo={setNewTodo}
                    onSubmit={addTodo}
                />

                <TodoList
                    todos={todos}
                    editingTodo={editingTodo}
                    setEditingTodo={setEditingTodo}
                    editedText={editedText}
                    setEditedText={setEditedText}
                    saveEdit={saveEdit}
                    deleteTodo={deleteTodo}
                    toggleTodo={toggleTodo}
                />
            </div>
        </div>
    );
}

export default App;
