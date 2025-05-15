import { FormEvent, type JSX } from "react";
import { Button } from "./Button";

interface TodoFormProps {
    newTodo: string;
    setNewTodo: (value: string) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const TodoForm = ({
    newTodo,
    setNewTodo,
    onSubmit,
}: TodoFormProps): JSX.Element | null => {
    return (
        <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 shadow-sm border border-gray-200 rounded-lg p-4"
        >
            <div className="relative flex-1">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="w-full outline-none px-3 py-2 text-gray-700 text-sm peer border-1 border-gray-200 rounded-lg"
                    required
                />
                <span className="absolute top-[10px] left-3 peer-focus:top-[-10px] pointer-events-none transition-translate duration-300 bg-white px-1 text-gray-400 text-sm">
                    What needs to be done?
                </span>
            </div>
            <Button>Add Task</Button>
        </form>
    );
};

export default TodoForm;
