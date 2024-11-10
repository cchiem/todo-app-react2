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
        <div className="flex justify-center items-center flex-col pt-24 p-4">
            <div className="w-[450px] flex flex-col gap-8   ">
                <div className="flex justify-between items-center border-[2px] border-neutral-300 rounded-lg py-4 px-12">
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
                            className="bg-[#87AA39] py-3 px-3 rounded-lg flex justify-center items-center text-center"
                        >
                            <svg
                                clip-rule="evenodd"
                                fill-rule="evenodd"
                                stroke-linejoin="round"
                                stroke-miterlimit="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                            >
                                <path
                                    d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                                    fill-rule="nonzero"
                                ></path>
                            </svg>
                        </button>
                    </form>
                </div>
                {todoList.length == 0 && (
                    <div className="text-center p-4">
                        <h1>Seems lonely in here, what are you up to?</h1>
                    </div>
                )}
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
