const errorMessages = {
    "Invalid login credentials": "Identifiants de connexion invalides.",
    "User already registered": "Cet utilisateur est déjà enregistré.",
    "Email not confirmed": "Votre email n'est pas confirmé.",
    "User not found": "Utilisateur non trouvé.",
    "Invalid email or password": "Email ou mot de passe incorrect.",
    "Email is required": "L'email est requis.",
    "Password is required": "Le mot de passe est requis.",
    "Password should be at least 6 characters": "Le mot de passe doit contenir au moins 6 caractères.",
  };
  
 const translateError = (message) => {
    return errorMessages[message] || "Une erreur est survenue.";
  };

  export default translateError