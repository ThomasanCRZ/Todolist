import {motion} from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BsPencilSquare, BsXLg } from "react-icons/bs";

function Todolist() {

    // useState 
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]); // Liste des tâches en cours
    const [tasksFinished, setTasksFinished] = useState([]); // Liste des tâches terminées
    const [tasksToAdd, setTasksToAdd] = useState(""); // État pour gérer l'input d'ajout de tâche
    const [editingTask, setEditingTask] = useState(null); // Index de la tâche à modifier
    const [editedText, setEditedText] = useState(""); // Texte modifié de la tâche à modifier

    // Remonter en haut de page au chargement 
    useEffect(() => {
        window.scrollTo({top:0, behavior: "smooth"});
    }, []); // Ajout de dépendance pour éviter boucle infinie

    // Vérifier si un utilisateur est connecté
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user }} = await supabase.auth.getUser();
            setUser(user);
            console.log(user); // Vérifie si l'utilisateur est bien récupéré
        };
        checkUser();
    }, []); // Ce useEffect vérifie l'utilisateur une seule fois au début
    
    useEffect(() => {
        if (!user) return;
            const fetchTasks = async () => {
                const { data, error } = await supabase
                    .from("tasks")
                    .select("*")
                    .eq("user_id", user.id); // Récupère les tâches associées à l'utilisateur connecté
                if (error) {
                    console.error("Error fetching tasks:", error);
                } else {
                    console.log(data); // Vérifie les tâches récupérées
                    // Sépare les tâches en cours et terminées
                    setTasks(data.filter(task => !task.is_finished));
                    setTasksFinished(data.filter(task => task.is_finished));
                }
            };
            fetchTasks();
    }, [user]); // Ce useEffect se déclenche à chaque changement d'utilisateur

    // Fonction pour gérer la saisie dans l'input
    const handleInputChange = (e) => {
        e.preventDefault();
        setTasksToAdd(e.target.value);
    };

    // Fonction pour ajouter une tâche à la liste
    const addTask = async (e) => {
        e.preventDefault();
        if (!user || tasksToAdd.trim() === "") return;

        const newTask = { task: tasksToAdd, is_finished: false, user_id: user.id };
        const { error } = await supabase.from("tasks").insert([newTask]);

        if (error) {
            console.error("Error adding task:", error);
        } else {
            // Rafraîchir les tâches après l'ajout
            const { data: allTasks, error: fetchError } = await supabase
                .from("tasks")
                .select("*")
                .eq("user_id", user.id);

            if (fetchError) {
                console.error("Error fetching tasks:", fetchError);
            } else {
                setTasks(allTasks.filter(task => !task.is_finished));
                setTasksFinished(allTasks.filter(task => task.is_finished));
                setTasksToAdd("");
            }
        }
    };

    
    
    // Fonction pour terminer une tâche
    const finishTask = async (index) => {
        const taskToFinish = tasks[index]; // Récupère la tâche à terminer

        // Mise à jour dans Supabase (on met à jour uniquement is_finished)
        const { error } = await supabase
            .from("tasks")
            .update({ is_finished: true })
            .eq("id", taskToFinish.id);

        if (error) {
            console.error("Error updating task:", error);
        } else {
            // Mise à jour de l'état local après confirmation
            const newTasks = tasks.filter((_, i) => i !== index);  // Supprime la tâche à terminer
            setTasks(newTasks);

            // Ajouter la tâche dans la liste des tâches terminées
            setTasksFinished(prevTasks => [...prevTasks, taskToFinish]);
        }
    };

    // Fonction pour redéfinir une tâche terminée en tâche en cours
    const resetTask = async (index) => {
        const taskToReset = tasksFinished[index]; // Récupère la tâche à redéfinir

        // Mise à jour dans Supabase (on remet is_finished à false)
        const { error } = await supabase
            .from("tasks")
            .update({ is_finished: false })
            .eq("id", taskToReset.id);

        if (error) {
            console.error("Error updating task:", error);
        } else {
            // Mise à jour de l'état local après confirmation
            const newTasks = [...tasks, taskToReset]; // Ajoute la tâche à la liste des tâches en cours
            const newTasksFinished = tasksFinished.filter((_, i) => i !== index); // Supprime la tâche des terminées
            setTasks(newTasks);
            setTasksFinished(newTasksFinished);
        }
    };

    // Fonction pour récupérer la tâche à modifier
    const startEditing = (index, isFinished) => {
        setEditingTask({index, isFinished});
        setEditedText(isFinished ? tasksFinished[index].task : tasks[index].task); // Remplir l'input avec la valeur actuelle
    };

    const saveEditedTask = async (e) => {
        e.preventDefault();
        if (editedText.trim() && editingTask !== null) {
            let taskList = editingTask.isFinished ? [...tasksFinished] : [...tasks];
            let taskIndex = editingTask.index;
    
            // Mise à jour locale
            taskList[taskIndex] = { ...taskList[taskIndex], task: editedText };
    
            if (editingTask.isFinished) {
                setTasksFinished(taskList);
            } else {
                setTasks(taskList);
            }
    
            // Mise à jour dans Supabase
            const { error } = await supabase
                .from("tasks")
                .update({ task: editedText })
                .eq("id", taskList[taskIndex].id);
    
            if (error) {
                console.error("Error updating task:", error);
            }
    
            setEditingTask(null);
            setEditedText(""); // Réinitialiser le texte de l'édition
        }
    };
    

    // Fonction pour supprimer une tâche via son index
    const deleteTask = async (index, isFinished) => {
        let taskToDelete;
        let taskList;
        if (isFinished) {
            taskToDelete = tasksFinished[index];
            taskList = tasksFinished;
        } else {
            taskToDelete = tasks[index];
            taskList = tasks;
        }
    
        const updatedList = taskList.filter((_, i) => i !== index);
        if (isFinished) {
            setTasksFinished(updatedList);
        } else {
            setTasks(updatedList);
        }
    
        // Suppression dans Supabase
        const { error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", taskToDelete.id);
    
        if (error) {
            console.error("Error deleting task:", error);
        }
    };
    

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.7 }}
                style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
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
                                        <span>{task.task}</span>
                                        <BsPencilSquare onClick={() => startEditing(index, false)}/>
                                        <BsXLg onClick={() => deleteTask(index, false)} />
                                    </div>
                                )) : "Vous n'avez aucune tâche à effectuer." }
                            </div>
                            <p>Liste des tâches terminées.</p>
                            <div className="tasks">
                                {tasksFinished.length > 0 ? tasksFinished.map((task, index) => (
                                    <div className="task-item" key={index}>
                                        <div className="custom-checkbox checked" onClick={() => resetTask(index)}></div>
                                        <span>{task.task}</span>
                                        <BsPencilSquare onClick={() => startEditing(index, true)}/>
                                        <BsXLg onClick={() => deleteTask(index, true)} />
                                    </div>
                                )) : "Vous n'avez aucune tâche terminée." }
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
