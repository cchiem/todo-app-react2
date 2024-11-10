import React, { useEffect, useRef, useState } from "react";
import { Item } from "../page";

interface TodoItemProps {
    item: Item;
    setTodoList: React.Dispatch<React.SetStateAction<Item[]>>;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, setTodoList }) => {
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(item.title);
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input

    const completeTodo = () => {
        setTodoList((prevTodoList) =>
            prevTodoList.map((todo) =>
                todo.id === item.id
                    ? { ...todo, is_completed: !todo.is_completed }
                    : todo
            )
        );
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleInputBlur = () => {
        setEditing(false);
    };

    // Set focus when entering edit mode and position cursor at the end
    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(
                inputRef.current.value.length,
                inputRef.current.value.length
            );
        }
    }, [editing]);

    const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTodoList((prevTodoList) =>
            prevTodoList.map((todo) =>
                todo.id === item.id ? { ...todo, title: inputValue } : todo
            )
        );
        setEditing(false); // Close editing mode on submit
    };

    const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // Update the local state of input
    };

    const handleDelete = () => {
        setTodoList((prevTodoList) =>
            prevTodoList.filter((todo) => todo.id !== item.id)
        );
    };

    return (
        <li id={item.id}>
            {editing ? (
                <form onSubmit={handleInputSubmit}>
                    <input
                        ref={inputRef} // Attach the ref to the input
                        type="text"
                        value={inputValue} // Controlled input
                        onChange={handleOnChangeInput}
                        onBlur={handleInputBlur}
                        className="bg-[#1F2835] px-6 py-4 rounded-lg w-full"
                    />
                </form>
            ) : (
                <>
                    <button
                        id={item.id}
                        onClick={completeTodo}
                        className="flex flex-row items-center bg-slate-600 w-full"
                    >
                        <svg
                            width="24"
                            height="24"
                            fill={item.is_completed ? "#22C55E" : "#0d0d0d"}
                            className="mr-2"
                        >
                            <circle cx="12" cy="12" fillRule="nonzero" r="10" />
                        </svg>
                        <p
                            style={
                                item.is_completed
                                    ? { textDecoration: "line-through" }
                                    : {}
                            }
                        >
                            {item.title}
                        </p>
                    </button>
                    <div>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;
