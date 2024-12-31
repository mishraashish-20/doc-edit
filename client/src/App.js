import "./App.css";
import Homepage from "./Homepage";
import { URLProvider } from "./URLContext";
import CreatePage from "./components/CreatePage";
import Editor from "./components/Editor";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AuthPage from "./pages/auth/auth";

function App() {
  return (
    <Router>
      <URLProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/docs/:id" element={<Editor />} />
        </Routes>
      </URLProvider>
    </Router>
  );
}

export default App;
