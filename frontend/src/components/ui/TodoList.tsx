import type { JSX } from "react";
import { TodoItem } from "./TodoItem";

interface Todo {
    _id: string;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    editingTodo: string | null;
    setEditingTodo: (id: string | null) => void;
    editedText: string;
    setEditedText: (text: string) => void;
    saveEdit: (id: string) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

export const TodoList = ({
    todos,
    editingTodo,
    setEditingTodo,
    editedText,
    setEditedText,
    saveEdit,
    deleteTodo,
    toggleTodo,
}: TodoListProps): JSX.Element | null => {
    if (todos.length === 0) return null;
    return (
        <div className="flex flex-col gap-4 mt-4">
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    isEditing={editingTodo === todo._id}
                    editedText={editedText}
                    setEditedText={setEditedText}
                    saveEdit={saveEdit}
                    deleteTodo={deleteTodo}
                    toggleTodo={toggleTodo}
                    setEditingTodo={setEditingTodo}
                />
            ))}
        </div>
    );
};
