import clsx from "clsx";
import { MdOutlineDone, MdModeEditOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import type { JSX } from "react";
// import { Todo } from "../../types/todo";

interface Todo {
    _id: string;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    isEditing: boolean;
    setEditingTodo: (id: string | null) => void;
    editedText: string;
    setEditedText: (text: string) => void;
    saveEdit: (id: string) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
}

export const TodoItem = ({
    todo,
    isEditing,
    setEditingTodo,
    editedText,
    setEditedText,
    saveEdit,
    deleteTodo,
    toggleTodo,
}: TodoItemProps): JSX.Element => {
    return isEditing ? (
        <div className="flex items-center gap-x-3">
            <input
                className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />
            <div className="flex gap-x-2">
                <button
                    onClick={() => saveEdit(todo._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    aria-label="Save"
                >
                    <MdOutlineDone />
                </button>
                <button
                    onClick={() => setEditingTodo(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    aria-label="Cancel"
                >
                    <IoClose />
                </button>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4 overflow-hidden">
                <button
                    onClick={() => toggleTodo(todo._id)}
                    className={clsx(
                        "flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center",
                        {
                            "bg-green-500 border-green-500": todo.completed,
                            "border-gray-300 hover:border-blue-400":
                                !todo.completed,
                        }
                    )}
                    aria-label="Toggle Complete"
                >
                    {todo.completed && <MdOutlineDone />}
                </button>
                <span className="text-gray-800 truncate font-medium">
                    {todo.text}
                </span>
            </div>
            <div className="flex gap-x-2">
                <button
                    onClick={() => {
                        setEditingTodo(todo._id);
                        setEditedText(todo.text);
                    }}
                    className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                    aria-label="Edit"
                >
                    <MdModeEditOutline />
                </button>
                <button
                    onClick={() => deleteTodo(todo._id)}
                    className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                    aria-label="Delete"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};
