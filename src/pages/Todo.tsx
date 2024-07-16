import React, { useState, useEffect } from "react";
import { TextInput } from "@primer/react";
import { ButtonPrimary } from "@primer/react/deprecated";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import TodoItem from "../components/TodoItem";
import { url } from "../envConstants";
import NavBar from "../components/NavBar";
interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}



const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    axios.get(`${url}/todo`)
      .then((response: any) => {
        setTodos(response.data);
      })
      .catch((error: any) => {
        console.log("Error fetching data", error.message);
      })
      .finally(() => {});
  };

  const addTodo = async () => {
    axios.post(`${url}/todo`, {
      title: newTitle,
      description: newDescription,
    }).then((response: any) => {
      setTodos([...todos, response.data]);
      setNewTitle("");
      setNewDescription("");
    })
    .catch((error: any) => {
      console.error("Error adding todo:", error.message);
    })
    .finally(() => {});
  };
  

  return (
    <>
    <NavBar/>
    <div className="w-[910px] bg-slate-300 mx-auto p-3 rounded-lg mt-3">
      <h1 className="text-center text-3xl font-bold mb-6">Our Todo List</h1>

      <div className="inline-flex mb-4">
        <TextInput
          width={400}
          className="mr-2"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter a new todo title"
        />
        <TextInput
          width={400}
          className="mr-2"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter a new todo description"
        />
        <ButtonPrimary onClick={addTodo}>
          <IoMdAdd />
        </ButtonPrimary>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoItem key={todo.id} fetchTodos={fetchTodos} todo={todo} />
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Todo;
