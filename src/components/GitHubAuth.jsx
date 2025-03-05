import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { DiGithubBadge } from "react-icons/di";


const GitHubAuth = () => {
  const navigate = useNavigate();
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("Erreur de connexion avec GitHub :", error.message);
    } else {
      navigate("/todolist");
    }
  };

  return (
    <button 
      onClick={handleGitHubLogin}
      className="btn-github"
    >
      <DiGithubBadge />
      Se connecter avec GitHub
    </button>
  );
};

export default GitHubAuth;
