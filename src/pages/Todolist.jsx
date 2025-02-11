import {motion} from "framer-motion";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BsPencilSquare, BsXLg } from "react-icons/bs";

function Todolist() {
    // useState 
    const [tasks, setTasks] = useState([]); // Liste des tâches en cours
    const [tasksFinished, setTasksFinished] = useState([]); // Liste des tâches terminées
    const [tasksToAdd, setTasksToAdd] = useState(""); // État pour gérer l'input d'ajout de tâche
    const [editingTask, setEditingTask] = useState(null); // Index de la tâche à modifier
    const [editedText, setEditedText] = useState(""); // Texte modifié de la tâche à modifier

    // Remonter en haut de page au chargement 
    useEffect(() => {
        window.scrollTo({top:0, behavior: "smooth"});
    })
    // Charger les tâches depuis localStorage au montage du composant
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")); // Récupère les tâches en cours stockées
        const storedTasksFinished = JSON.parse(localStorage.getItem("tasksFinished")); // Récupère les tâches terminées stockées
        const tasksInitialized = localStorage.getItem("tasksInitialized"); // Vérifie si l'init a déjà été faite

        if (!tasksInitialized) {
            // Ajoute une tâche par défaut uniquement la première fois
            const defaultTasks = ["Exemple de tâche à effectuer"];
            const defaultTasksFinished = ["Exemple de tâche terminée"];
            localStorage.setItem("tasks", JSON.stringify(defaultTasks));
            localStorage.setItem("tasksFinished", JSON.stringify(defaultTasksFinished));
            localStorage.setItem("tasksInitialized", "true"); // Marque comme initialisé
            setTasks(defaultTasks);
            setTasksFinished(defaultTasksFinished);
        } else {
            setTasks(storedTasks);
            setTasksFinished(storedTasksFinished);
        }
        if (storedTasks) setTasks(storedTasks); // Charge les tâches si elles existent
        if (storedTasksFinished) setTasksFinished(storedTasksFinished); // Charge les tâches terminées si elles existent
    }, []);

    // Sauvegarde les tâches dans localStorage à chaque mise à jour de tasks et tasksFinished
    useEffect(() => {
        if (tasks.length > 0) {
            localStorage.setItem("tasks", JSON.stringify(tasks)); // Sauvegarde des tâches en JSON
        }
        if (tasksFinished.length > 0) {
            localStorage.setItem("tasksFinished", JSON.stringify(tasksFinished)); // Sauvegarde des tâches terminées
        }
    }, [tasks, tasksFinished]);


    // Fonction pour gérer la saisie dans l'input
    const handleInputChange = (e) => {
        setTasksToAdd(e.target.value);
    };

    // Fonction pour ajouter une tâche à la liste
    const addTask = (e) => {
        e.preventDefault();
        if (tasksToAdd.trim()) {  // Vérifie si l'input n'est pas vide
            const newTasks = [...tasks, tasksToAdd]; // Ajoute la nouvelle tâche à la liste
            setTasks(newTasks);
            setTasksToAdd(""); // Réinitialise l'input

            // Mise à jour immédiate de localStorage
            localStorage.setItem("tasks", JSON.stringify(newTasks));
        }
    };
    
    // Fonction pour terminer une tâche en récupérant son index et son nom
    const finishTask = (index) => {
        const taskToFinish = tasks[index]; // Récupère la tâche à terminer
        const newTasks = tasks.filter((_, i) => i !== index);  // Supprime la tâche à terminer
        const newTasksFinished = [...tasksFinished, taskToFinish]; // Ajoute la tâche à la liste des tâches terminées

        setTasks(newTasks);
        setTasksFinished(newTasksFinished);

        // Mise à jour immédiate de localStorage
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        localStorage.setItem("tasksFinished", JSON.stringify(newTasksFinished));
    };

    // Fonction pour redéfinir une tache terminé en tache en cours
    const resetTask = (index) => {
        const taskToReset = tasksFinished[index]; // Récupère la tâche à redéfinir
        const newTasks = [...tasks, taskToReset]; // Ajoute la tâche à la liste des tâches en cours
        const newTasksFinished = tasksFinished.filter((_, i) => i !== index); // Supprime la tâche à redéfinir

        setTasks(newTasks);
        setTasksFinished(newTasksFinished);

        // Mise à jour immédiate de localStorage
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        localStorage.setItem("tasksFinished", JSON.stringify(newTasksFinished));
    };
    // Fonction pour récupérer la tâche à modifier
    const startEditing = (index, isFinished) => {
        setEditingTask({index, isFinished});
        setEditedText(isFinished ? tasksFinished[index] : tasks[index]); // Remplit l'input avec la valeur actuelle
    };

    // Mettre à jour la tâche modifiée
    const saveEditedTask = () => {
        if (editedText.trim() && editingTask !== null) {
            if (editingTask.isFinished) {
                const updatedTasksFinished = [...tasksFinished];
                updatedTasksFinished[editingTask.index] = editedText;
                setTasksFinished(updatedTasksFinished);
                localStorage.setItem("tasksFinished", JSON.stringify(updatedTasksFinished));
            } else {
                const updatedTasks = [...tasks];
                updatedTasks[editingTask.index] = editedText;
                setTasks(updatedTasks);
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            }
            setEditingTask(null);
        }
    };
    // Fonction pour supprimer une tâche via son index
    const deleteTask = (index, isFinished) => {
        if (isFinished) {
            const newTasksFinished = tasksFinished.filter((_, i) => i !== index); // Supprime la tâche des terminées
            setTasksFinished(newTasksFinished);
            localStorage.setItem("tasksFinished", JSON.stringify(newTasksFinished));
        } else {
            const newTasks = tasks.filter((_, i) => i !== index); // Supprime la tâche des en cours
            setTasks(newTasks);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.7 }}
            >
                <Navbar />    
                <div className="main">
                    <div className="main-content">
                        <div className="todolist-wrapper">
                            <h3>Todolist</h3>
                            <p>Liste des tâches à effectuer.</p>
                            <div className="tasks">
                                {tasks.length > 0 ? tasks.map((task, index) => (
                                    <div className="task-item" key={index}>
                                        <div className="custom-checkbox" onClick={() => finishTask(index)}></div>
                                        <span>{task}</span>
                                        <BsPencilSquare onClick={() => startEditing(index, false)}/>
                                        <BsXLg onClick={() => deleteTask(index, false)} />
                                    </div>
                                )) : "Vous n'avez aucune tâche à effectuer" }
                            </div>
                            <p>Liste des tâches terminées.</p>
                            <div className="tasks">
                                {tasksFinished.length > 0 ? tasksFinished.map((task, index) => (
                                    <div className="task-item" key={index}>
                                        <div className="custom-checkbox checked" onClick={() => resetTask(index)}></div>
                                        <span>{task}</span>
                                        <BsPencilSquare onClick={() => startEditing(index, true)}/>
                                        <BsXLg onClick={() => deleteTask(index, true)} />
                                    </div>
                                )) : "Vous n'avez aucune tâche terminée" }
                            </div>
                            <form onSubmit={addTask}>
                                <input 
                                    type="text" 
                                    placeholder="Ajouter une tâche" 
                                    value={tasksToAdd} 
                                    onChange={handleInputChange} 
                                />
                                <button type="submit">Ajouter</button>
                            </form>
                        </div>
                    </div>
                    {/* Modal pour modifier une tâche */}
                    {editingTask !== null && (
                        <div className="modal-update">
                            <div className="modal-update-content">
                                <h3>Modifer le nom de la tâche</h3>
                                <form>
                                    <input
                                        type="text"
                                        placeholder="Modifier une tâche"
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                    />
                                    <div className="btns-update">
                                        <button type="submit" onClick={saveEditedTask}>Sauvegarder</button>
                                        <button onClick={() => setEditingTask(null)}>Annuler</button>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </motion.div>
        </>
    );
}

export default Todolist;
