import { supabase } from "../supabaseClient";
import { DiGithubBadge } from "react-icons/di";


const GitHubAuth = () => {
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "/todolist", // Redirige vers la page actuelle après connexion
      },
    });

    if (error) {
      console.error("Erreur de connexion avec GitHub :", error.message);
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
