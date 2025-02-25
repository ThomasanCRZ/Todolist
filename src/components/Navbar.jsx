import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
import ToggleTheme from "./ToggleTheme"

function Navbar() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Vérifie si un utilisateur est connecté au chargement
  useEffect(() => {
    const checkUser = async () => {
      const {data: { user }} = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    // Écoute les changements d'authetification
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
    }, []);

    // Déconnexion
    const handleLogout = async () => {
      await supabase.auth.signOut();
      setUser(null);
      navigate("/auth");
    };

  return (
    <div className="navbar">
      <h1><Link to="/">Todolist</Link></h1>
      <div className="btns-right">
      {user ? (
          <button className="btn-logout" onClick={handleLogout}>Deconnexion</button>
        ) : (
          <Link to="/auth"><button className="btn-login">Connexion</button></Link>
        )}
        <ToggleTheme />
      </div>
    </div>
  )
}

export default Navbar