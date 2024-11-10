import React from "react";
import { Item } from "../page";

interface TodoItemProps {
    item: Item;
    setTodoList: React.Dispatch<React.SetStateAction<Item[]>>;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, setTodoList }) => {
    const completeTodo = () => {
        setTodoList((prevTodoList) =>
            prevTodoList.map((todo) =>
                todo.id === item.id
                    ? { ...todo, is_completed: !todo.is_completed }
                    : todo
            )
        );
    };

    return (
        <button
            id={item.id}
            onClick={() => completeTodo()}
            className="flex flex-row items-center bg-slate-600 p-2" // Added p-2 for padding if desired
        >
            <svg
                width="24" // Set appropriate width
                height="24" // Set appropriate height
                fill={item.is_completed ? "#22C55E" : "#0d0d0d"}
                className="mr-2" // Add margin-right for spacing if desired
            >
                <circle cx="12" cy="12" fillRule="nonzero" r="10" />
            </svg>
            <p
                style={
                    item.is_completed ? { textDecoration: "line-through" } : {}
                }
            >
                {item.title}
            </p>
        </button>
    );
};

export default TodoItem;
