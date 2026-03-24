import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// 1. Define the Task Interface
interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const API_URL = "http://localhost:3000/tasks";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    // 2. Fetch Initial List
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get<Task[]>(API_URL);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="app-container">
            <h1>Task Manager</h1>

            {/* Placeholder for Add Task Form (Branch: add-task-feature) */}
            <section className="form-section">
                <input type="text" placeholder="New Task Title" disabled />
                <button disabled>Add</button>
            </section>

            <hr />

            {/* Task List (Branch: client-ui) */}
            <div className="task-list">
                {tasks.length === 0 ? (
                    <p>No tasks found. Add your first one!</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="task-item">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                readOnly
                            />
                            <div className="task-info">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                            <div className="actions">
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
