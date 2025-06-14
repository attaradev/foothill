import connectDb from "../../DB/connection.js";
import todoRouter from "./todos/todo.router.js";
import cors from "cors";

const initApp = async (app, express) => {
  const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };

  // Middleware
  app.use(cors(corsOptions));
  app.use(express.json());

  // Health check route
  app.get("/", (_req, res) => {
    res.status(200).json({ status: "ok", message: "Todo API is running" });
  });

  // Routes
  app.use("/api/todos", todoRouter);

  // Connect to DB
  await connectDb();
};

export default initApp;
