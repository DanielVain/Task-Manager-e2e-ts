import { useState } from "react";
import axios from "axios";

// Define the interface for our task
interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface AddTaskProps {
    onTaskAdded: (newTask: Task) => void;
}

export const AddTask = ({ onTaskAdded }: AddTaskProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            // POST the new task to the backend
            const response = await axios.post<Task>(
                "http://localhost:3000/tasks",
                {
                    title,
                    description,
                    completed: false,
                },
            );

            // Pass the new task back to the parent (App.tsx)
            onTaskAdded(response.data);

            // Clear form
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Failed to add task:", error);
            alert("Error: Make sure your server is running on port 3000!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};
