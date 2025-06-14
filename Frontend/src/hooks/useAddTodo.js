import { useState } from "react";
import {
  CustomSuccessAlert,
  CustomErrorAlert,
  defaultTodo,
  baseURL,
} from "../utils/general.js";

const useAddTodos = (fetchTodos, page, limit, setNewTodo) => {
  const [isLoading, setIsLoading] = useState(false);

  const addTodo = async (todo) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${baseURL}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchTodos(page, limit);
      setNewTodo(defaultTodo);
      CustomSuccessAlert("New Todo added successfully");
    } catch (error) {
      CustomErrorAlert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addTodo, isAddingTodo: isLoading };
};

export default useAddTodos;
