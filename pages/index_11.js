import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdConfirmationNumber } from "react-icons/md";
import axios from "axios";
import { format } from "date-fns";

const Index = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [todosCopy, setTodosCopy] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/todos");
      setTodos(response.data);
      setTodosCopy(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    try {
      if (editIndex === -1) {
        const response = await axios.post("http://127.0.0.1:8080/todos", {
          title: todoInput,
          completed: false,
        });
        setTodos([...todos, response.data]);
        setTodosCopy([...todos, response.data]);
        setTodoInput("");
      } else {
        const todoToUpdate = { ...todos[editIndex], title: todoInput };
        const response = await axios.put(
          `http://127.0.0.1:8080/todos/${todoToUpdate.id}`,
          todoToUpdate
        );
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = response.data;
        setTodos(updatedTodos);
        setTodoInput("");
        setEditIndex(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCompleted = async (index) => {
    try {
      const todoToUpdate = {
        ...todos[index],
        completed: !todos[index].completed,
      };
      const response = await axios.put(
        `http://127.0.0.1:8080/todos/${todoToUpdate.id}`,
        todoToUpdate
      );
      const updatedTodos = [...todos];
      updatedTodos[index] = response.data;
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const searchTodo = () => {
    const results = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(results);
  };

  const formatDate = (dateString) => {
    try {
      const data = new Date(dateString);
      return isNaN(data.getTime())
        ? "Invalid date"
        : format(data, "yyyy-MM-dd HH:mm:ss");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
};

export default Index;
