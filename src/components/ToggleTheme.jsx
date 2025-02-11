import { useState, useEffect } from "react";
import { PiMoonLight } from "react-icons/pi";
import { BsSun } from "react-icons/bs";

function ToggleTheme() {
  // Vérifier le thème enregistré ou mettre "light" par défaut
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Appliquer le thème au chargement du composant
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Fonction pour basculer le thème
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.getElementById("indicator").classList.toggle("active");
  };

  return (
    <div id="toggle-btn" onClick={toggleTheme}>
      {isDark ? (
        <i id="indicator" className="indicator"> <PiMoonLight /></i>
      ) : (
        <i id="indicator" className="indicator"> <BsSun /></i>
      )}
    </div>
  );
}

export default ToggleTheme;
