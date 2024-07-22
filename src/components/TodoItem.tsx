import React, { useState } from "react";
import axios from "axios";
import { TextInput } from "@primer/react";
import { ButtonPrimary, ButtonDanger, ButtonOutline } from "@primer/react/deprecated";
import { IoMdCheckmark, IoMdCreate, IoMdTrash, IoMdSave, IoMdClose } from "react-icons/io";
import { url } from "../envConstants";

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
  };
  fetchTodos: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, fetchTodos }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const updateTodo = async () => {
    axios.patch(`${url}/todo/${todo.id}`,
      {
        title: title,
        description: description
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then(
        (response: any) => {
          fetchTodos();
          setIsEditing(false);
          console.log(`Todo updated successfully: ${todo.title}`, response);
        }
      )
      .catch(
        (error: any) => {
          console.log("Error updating Todo", error.message);
        }
      );
  };

  const markComplete = async () => {
    axios.patch(`${url}/todo/${todo.id}/complete`, { isCompleted: !todo.isCompleted },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then(
        (response: any) => {
          fetchTodos();
          console.log(`Todo completion toggled: ${todo.title}`, response);
        }
      )
      .catch(
        (error: any) => {
          console.log("Error while toggling complete", error.message);
        }
      );
  };

  const deleteTodo = async () => {
    const confirmDelete = confirm(`Would you like to delete the task ${todo.title} ?`)
    if (!confirmDelete) return;
    axios.delete(`${url}/todo/${todo.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then(
        (response: any) => {
          fetchTodos();
          console.log(`Todo deleted successfully: ${todo.title}`, response);
        }
      )
      .catch(
        (error: any) => {
          console.log("Error deleting the Todo", error.message);
        }
      );
  };

  return (
    <tr>
      <td className="py-2 px-4 border-b">
        {isEditing ? (
          <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          <h3 className={`font-bold text-lg ${todo.isCompleted ? 'line-through' : ''} text-center`}>
            {title}
          </h3>
        )}
      </td>
      <td className="py-2 px-4 border-b">
        {isEditing ? (
          <TextInput value={description} onChange={(e) => setDescription(e.target.value)} />
        ) : (
          <p className={`text-base ${todo.isCompleted ? 'line-through' : ''} text-start`}>
            {description}
          </p>
        )}
      </td>
      <td className="py-2 px-4 border-b text-center">
        {isEditing ? (
          <ButtonOutline onClick={updateTodo} className="mr-2">
            <IoMdSave />
          </ButtonOutline>
        ) : (
          <ButtonOutline onClick={() => setIsEditing(true)} className="mr-2">
            <IoMdCreate />
          </ButtonOutline>
        )}
        <ButtonPrimary onClick={markComplete} className="mr-2">
          {todo.isCompleted ? (
            <>
              <IoMdClose />
            </>
          ) :
            (
              <>
                <IoMdCheckmark />
              </>
            )}

        </ButtonPrimary>
        <ButtonDanger onClick={deleteTodo}>
          <IoMdTrash />
        </ButtonDanger>
      </td>
    </tr>
  );
};

export default TodoItem;
