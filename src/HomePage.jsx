import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore";

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
        await firebase.firestore().collection("tasks").add({
        title: newTask,
        isCompleted: false,
        });
        setNewTask("");
    };    
}

export default HomePage;