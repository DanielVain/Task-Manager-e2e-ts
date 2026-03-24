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

    return (
        <div className="app-container">
            <h1>Task Manager</h1>
            <AddTask onTaskAdded={handleTaskAdded} />

            <hr />

            <div className="task-list">
                {tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            readOnly
                        />
                        <span>{task.title}</span>
                    </div>
                ))}
            </div>
            <div className="task-list">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="task-item"
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginBottom: "5px",
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            readOnly
                        />
                        <span style={{ flex: 1 }}>{task.title}</span>

                        {/* Add the Delete Button here */}
                        <button
                            onClick={() => handleDelete(task.id)}
                            style={{
                                backgroundColor: "#ff4d4d",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
