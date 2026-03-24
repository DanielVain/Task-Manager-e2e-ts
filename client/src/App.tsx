import { useState, useEffect } from "react";
import axios from "axios";
import { AddTask } from "./components/AddTask.js"; // Import the new component
import "./App.css";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const API_URL = "http://localhost:3000/tasks";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios
            .get<Task[]>(API_URL)
            .then((res) => setTasks(res.data))
            .catch((err) => console.error(err));
    }, []);

    // Update the list without needing a page refresh
    const handleTaskAdded = (newTask: Task) => {
        setTasks((prev) => [...prev, newTask]);
    };

    const handleDelete = async (id: number) => {
        try {
            // 1. Tell the backend to delete it
            await axios.delete(`${API_URL}/${id}`);

            // 2. Update the UI state by filtering out the deleted ID
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Failed to delete task:", error);
            alert("Could not delete the task. Is the server running?");
        }
    };
    const handleToggle = async (task: Task) => {
        try {
            const response = await axios.put<Task>(`${API_URL}/${task.id}`, {
                ...task,
                completed: !task.completed,
            });

            // Update the local state
            setTasks((prev) =>
                prev.map((t) => (t.id === task.id ? response.data : t)),
            );
        } catch (error) {
            console.error("Failed to toggle task:", error);
        }
    };
    const handleEdit = async (task: Task) => {
        const newTitle = window.prompt("Edit task title:", task.title);
        if (!newTitle || newTitle === task.title) return;

        try {
            const response = await axios.put<Task>(`${API_URL}/${task.id}`, {
                ...task,
                title: newTitle,
            });

            setTasks((prev) =>
                prev.map((t) => (t.id === task.id ? response.data : t)),
            );
        } catch (error) {
            console.error("Failed to edit task:", error);
        }
    };

    return (
        <div className="app-container">
            <h1>Task Manager</h1>
            <AddTask onTaskAdded={handleTaskAdded} />

            <hr />

            <div className="task-list">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="task-item"
                        style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                        }}
                    >
                        {/* Toggle Checkbox */}
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(task)}
                            style={{ cursor: "pointer" }}
                        />

                        <span
                            style={{
                                flex: 1,
                                textDecoration: task.completed
                                    ? "line-through"
                                    : "none",
                                color: task.completed ? "#888" : "inherit",
                            }}
                        >
                            {task.title}
                        </span>

                        {/* Edit Button */}
                        <button onClick={() => handleEdit(task)}>Edit</button>

                        {/* Delete Button (From previous branch) */}
                        <button onClick={() => handleDelete(task.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
