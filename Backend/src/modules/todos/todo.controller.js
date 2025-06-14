import TodoModel from "../../../DB/models/Todo.model.js";

// GET /api/todos?page=1&limit=10&title=keyword
export const getTodos = async (req, res) => {
  const { page = 1, limit = 3, title = "" } = req.query;
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, parseInt(limit));

  try {
    const query = {
      title: { $regex: title, $options: "i" },
    };

    const totalCount = await TodoModel.countDocuments(query);
    const numOfPages = Math.ceil(totalCount / limitNum);
    const skip = (Math.min(pageNum, numOfPages || 1) - 1) * limitNum;

    const todos = await TodoModel.find(query).skip(skip).limit(limitNum);

    return res.status(200).json({ todos, numOfPages });
  } catch (error) {
    console.error("GET /todos error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST /api/todos
export const addTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    const todo = await TodoModel.create({ title, description });
    return res.status(201).json({ todo });
  } catch (error) {
    if (error.errors?.title) {
      return res.status(400).json({ message: "Title field is required" });
    }
    if (error.errors?.description) {
      return res.status(400).json({ message: "Description field is required" });
    }
    console.error("POST /todos error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/todos/:id
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await TodoModel.deleteOne({ _id: id });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "No todo found with that ID" });
    }

    return res.status(204).send();
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    console.error("DELETE /todos error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /api/todos/:id
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  try {
    const updated = await TodoModel.findByIdAndUpdate(id, { isCompleted });

    if (!updated) {
      return res.status(404).json({ message: "No todo found with that ID" });
    }

    return res.status(204).send();
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    console.error("PATCH /todos error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
