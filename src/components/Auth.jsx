import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GitHubAuth from "./GitHubAuth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMessage(null);
    setErrorMessage(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMessage(error.message);
    } else {
      navigate("/todolist");
    }

    setLoading(false);
  };
  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.7 }}
        style= {{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
        <Navbar />
        <div className="auth-container">
            <div className="auth-form">
                <h2>Connexion</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="auth-btns">
                    <button type="submit" onClick={handleLogin} disabled={loading}>
                        Connexion
                    </button>
                </div>
                
                <div className="line"></div>
                <GitHubAuth />
                
                <p style={{ cursor: "pointer" }} onClick={() => navigate("/register")}>Pas encore de compte ?</p>
                {message && <p>{message}</p>}
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
        <Footer />
    </motion.div>
  );
}

export default Auth;
