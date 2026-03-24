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
        </div>
    );
}

export default App;
