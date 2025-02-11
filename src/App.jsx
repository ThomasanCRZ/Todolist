import {motion} from "framer-motion";
import { BsXLg } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {
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
                    <div className="main-text">
                        <h2>Gestionnaire de tâches</h2>
                        <p>Une application épurée et intuitive pour organiser efficacement votre temps.</p>
                        <p>Ajoutez vos tâches, suivez leur avancement et simplifiez votre gestion quotidienne.</p>
                        <div className="label-container">
                            <div className="label">
                                <p><span>#</span> Interactif</p>
                            </div>
                            <div className="label">
                                <p><span>#</span> Minimaliste</p>
                            </div>
                            <div className="label">
                                <p><span>€</span> Gratuit</p>
                            </div>
                        </div>
                    </div>
                    <div className="main-component">
                        <h3>Todolist</h3>
                        <p>La liste de vos tâches à effectuer.</p>
                        <div className="task">
                            {/* Checkbox Custom non cochée */}
                            <div className="task-item">
                                <div className="custom-checkbox"></div>
                                <span>Faire les courses</span>
                                <BsPencilSquare />
                                <BsXLg />
                            </div>
                            <div className="task-item">
                                <div className="custom-checkbox"></div>
                                <span>Appeler le plombier</span>
                                <BsPencilSquare />
                                <BsXLg />
                            </div>
                            <div className="task-item">
                                <div className="custom-checkbox"></div>
                                <span>Réparer la voiture</span>
                                <BsPencilSquare />
                                <BsXLg />
                            </div>
                        </div>
                        <p>La liste de vos tâches terminées.</p>
                        <div className="task">
                            {/* Checkbox Custom cochée */}
                            <div className="task-item">
                                <div className="custom-checkbox checked"></div>
                                <span>Répondre aux emails</span>
                                <BsPencilSquare />
                                <BsXLg />
                            </div>
                            <div className="task-item">
                                <div className="custom-checkbox checked"></div>
                                <span>Faire du sport</span>
                                <BsPencilSquare />
                                <BsXLg />
                            </div>
                            <div className="task-item">
                                <div className="custom-checkbox checked"></div>
                                <span>Promenner le chien</span>
                                <BsPencilSquare />
                                <BsXLg />
                            </div>
                        </div>
                        <div className="add-task">
                            <p>Ajouter une tâche</p>
                        </div>
                    </div>
                </div>
                <div className="cta-wrapper">
                    <div className="line"></div>
                    <div className="cta-text">
                        <h3>Envie de gérer vos tâches ?</h3>
                        <p>Un gain de temps pour votre quotidien !</p>
                    </div>
                    <div className="btn-to-todolist">
                        <Link to="/todolist">Commencer</Link>
                    </div>
                </div>
                
                
            </div>
            <Footer />
        </motion.div>
    </>
  )
}

export default App