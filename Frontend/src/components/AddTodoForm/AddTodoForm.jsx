import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { defaultTodo } from "../../utils/general.js";
import useAddTodo from "../../hooks/useAddTodo.js";

const AddTodoForm = ({ fetchTodos, page, limit }) => {
  const [newTodo, setNewTodo] = useState(defaultTodo);
  const { addTodo, isAddingTodo } = useAddTodo(
    fetchTodos,
    page,
    limit,
    setNewTodo
  );

  const isValid = () =>
    newTodo.title.trim().length >= 10 &&
    newTodo.description.trim().length >= 15;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;
    await addTodo(newTodo);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexGrow: 1,
        height: "70px",
        gap: 4,
      }}
    >
      <TextField
        id="title"
        name="title"
        label="Todo Title"
        variant="outlined"
        value={newTodo.title}
        onChange={(e) =>
          setNewTodo({ ...newTodo, title: e.target.value })
        }
        error={
          newTodo.title.length > 0 && newTodo.title.trim().length < 10
        }
        helperText={
          newTodo.title.length > 0 && newTodo.title.trim().length < 10
            ? "Title must be at least 10 characters"
            : ""
        }
        sx={{ width: "30%" }}
      />
      <TextField
        id="description"
        name="description"
        label="Todo Description"
        variant="outlined"
        value={newTodo.description}
        onChange={(e) =>
          setNewTodo({ ...newTodo, description: e.target.value })
        }
        error={
          newTodo.description.length > 0 &&
          newTodo.description.trim().length < 15
        }
        helperText={
          newTodo.description.length > 0 &&
          newTodo.description.trim().length < 15
            ? "Description must be at least 15 characters"
            : ""
        }
        sx={{ flexGrow: 1 }}
      />
      <LoadingButton
        loading={isAddingTodo}
        variant="contained"
        size="large"
        type="submit"
        disabled={!isValid()}
        sx={{
          p: "14px",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        }}
      >
        Add Todo
      </LoadingButton>
    </Box>
  );
};

export default AddTodoForm;
