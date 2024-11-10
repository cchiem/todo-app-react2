"use client";
import React, { useEffect, useState } from "react";
import TodoItem from "./component/TodoItem";

export interface Item {
    title: string;
    id: string; // string
    is_completed: boolean;
}
const Home = () => {
    const [todoList, setTodoList] = useState<Item[]>([]);
    const [value, setValue] = useState("");

    // Load todos from local storage on initial render
    useEffect(() => {
        const storedTodos = localStorage.getItem("todoList");
        if (storedTodos) {
            setTodoList(JSON.parse(storedTodos));
        }
    }, []);

    // Save todos to local storage whenever todoList changes
    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (value) {
            setTodoList((prevTodoList) => [
                ...prevTodoList,
                {
                    title: value,
                    id: crypto.randomUUID(),
                    is_completed: false,
                },
            ]);
            setValue("");
        }
    };

    return (
        <div className="flex justify-center items-center flex-col pt-10 p-4">
            <div className="w-[550px] flex flex-col gap-4">
                <div className="flex gap-8 justify-between items-center border-2 border-neutral-300 rounded-lg px-16 py-4">
                    <div>
                        <h1 className="text-3xl">Task Done</h1>
                        <p className="text-2xl">Keep it up!</p>
                    </div>
                    <div className="rounded-full size-[150px] bg-green-400 flex justify-center items-center">
                        <h1 className="text-6xl text-white">
                            {
                                todoList.filter((todo) => todo.is_completed)
                                    .length
                            }
                            /{todoList.length}
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <form
                        className="flex flex-row w-full justify-center items-center text-center gap-6"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <input
                            type="text"
                            placeholder="Write your next task"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="bg-[#1F2835] px-6 py-4 rounded-lg w-full"
                        />
                        <button
                            type="submit"
                            className="bg-[#87AA39] py-4 px-6 rounded-lg flex justify-center items-center text-center"
                        >
                            <p>+</p>
                        </button>
                    </form>
                </div>
                {todoList.map((todo, index) => (
                    <TodoItem
                        item={todo}
                        key={index}
                        setTodoList={setTodoList}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
