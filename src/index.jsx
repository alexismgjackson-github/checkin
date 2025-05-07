// Import React's StrictMode, a tool for highlighting potential issues in the app during development
import { StrictMode } from "react";

// Import the createRoot function from React DOM's client package (used in React 18+ for concurrent rendering)
import { createRoot } from "react-dom/client";

// Import the root App component that serves as the main entry point of the application
import App from "./App";

// Find the root DOM node and render the App component inside it, wrapped in StrictMode
// StrictMode helps detect common problems like unsafe lifecycle methods and legacy API usage
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
