import express, { type Request, type Response } from "express";
import cors from "cors";
import type { Task } from "./task.model.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// In-memory Database
let tasks: Task[] = [
    {
        id: 1,
        title: "Study Git",
        description: "Practice branches and PRs",
        completed: false,
    },
];

// 1. Get all tasks
app.get("/tasks", (req: Request, res: Response) => {
    res.json(tasks);
});

// 2. Get task by ID
app.get("/tasks/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") return res.status(400).send("Invalid ID");

    const task = tasks.find((t) => t.id === parseInt(id, 10));
    if (!task) return res.status(404).send("Task not found");
    res.json(task);
});

// 3. Create new task
app.post("/tasks", (req: Request, res: Response) => {
    const { title, description } = req.body;

    const newTask: Task = {
        id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
        title,
        description: description || "",
        completed: false,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 4. Update task
app.put("/tasks/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") return res.status(400).send("Invalid ID");

    const taskId = parseInt(id, 10);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) return res.status(404).send("Task not found");

    // Strict check for noUncheckedIndexedAccess
    const existingTask = tasks[taskIndex]!;
    tasks[taskIndex] = { ...existingTask, ...req.body, id: taskId };

    res.json(tasks[taskIndex]);
});

// 5. Delete task
app.delete("/tasks/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== "string") return res.status(400).send("Invalid ID");

    const taskId = parseInt(id, 10);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) return res.status(404).send("Task not found");

    const deleted = tasks.splice(taskIndex, 1);
    res.json(deleted[0]);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
