import React from "react";
import firebase from "firebase/compat/app";
import "firebase/firestore";

const Task = ({ task }) => {
    const toggleComplete = () => {
        firebase
            .firestore()
            .collection("tasks")
            .doc(task.id)
            .update({ isCompleted: !task.isCompleted });
    };
    const deleteTask = () => {
        const taskRef = firebase.firestore().collection("tasks").doc(task.id);
        taskRef.get().then((doc) => {
            if (doc.exists) {
                taskRef.delete();
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    };
    

    return (
        <li className={task.isCompleted ? "completed" : ""} onClick={toggleComplete}>
            <input type="checkbox" checked={task.isCompleted} readOnly />
            <span>{task.title}</span>
            {task.isCompleted && <button onClick={deleteTask}>🗑</button>}
        </li>
    );
};

export default Task;
