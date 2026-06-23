import { decrement, increment, reset } from "@/lib/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";

export default function CounterComponent() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
          Next.js + Redux Toolkit
        </h1>

        <div className="my-8 text-6xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
          {count}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => dispatch(decrement())}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
          >
            Decrement
          </button>

          <button
            onClick={() => dispatch(increment())}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-200 dark:shadow-none transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch(reset())}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-200 dark:shadow-none transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  );
}
