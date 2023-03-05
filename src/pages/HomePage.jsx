import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
import Task from "../components/Tasks";

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const unsubscribe = firebase
        .firestore()
        .collection("tasks")
        .onSnapshot((snapshot) => {
            const newTasks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setTasks(newTasks);
        });
        return () => unsubscribe();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        const docRef = await firebase.firestore().collection("tasks").add({
            title: newTask,
            isCompleted: false,
        });
        const newTaskData = { id: docRef.id, title: newTask, isCompleted: false };
        setTasks([...tasks, newTaskData]);
        setNewTask("");
    };
    
    
    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.isCompleted;
        if (filter === "active") return !task.isCompleted;
        return true;
    });

    const deleteCompletedTasks = async () => {
        const completedTasks = tasks.filter((task) => task.isCompleted);
        const batch = firebase.firestore().batch();
        completedTasks.forEach((task) => {
            const taskRef = firebase.firestore().collection("tasks").doc(task.id);
            batch.delete(taskRef);
        });
        await batch.commit();
      };

    const handleLogout = () => {
        firebase.auth().signOut();
    }
    
    return (
        <div className="homepage">
        <header>
            <h1>Must-Do</h1>
            <div>
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("active")}>Active</button>
            <button onClick={() => setFilter("completed")}>Completed</button>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </header>
        <form onSubmit={addTask}>
            <input
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
        <ul>
            {filteredTasks.map((task) => (
            <Task key={task.id} task={task} />
            ))}
        </ul>
        <div>
            <button onClick={deleteCompletedTasks}>Delete Completed</button>
        </div>
        </div>
    );
}

export default HomePage;
