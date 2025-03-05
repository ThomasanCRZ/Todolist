import { supabase } from "../supabaseClient";
import { DiGithubBadge } from "react-icons/di";


const GitHubAuth = () => {
  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin,
      }
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
