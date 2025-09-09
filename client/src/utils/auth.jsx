// src/utils/auth.jsx

// Save fake "login state" in localStorage
export function login(email, password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", email);
  }
  
  // Fake register (for now just logs in user immediately)
  export function register(email, password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", email);
  }
  
  // Logout
  export function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  }
  
  // Check login
  export function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
  }
  
  // Get username
  export function getUsername() {
    return localStorage.getItem("username") || "Adventurer";
  }
  