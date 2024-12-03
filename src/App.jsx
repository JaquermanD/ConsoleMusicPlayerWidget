import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import PlayerWidget from "./components/PlayerWidget.jsx";
import AuthButtons from "./components/AuthButtons.jsx";
import Callback from "./components/Callback.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthButtons />} />
          <Route path="/widget" element={<PlayerWidget />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
//<div>
//<h1>Bienvenido</h1>
//<DebugEnv />
//</div>
//    <Router>
//<div className="App">
//<Routes>
//<Header />
//<Route path="/" element={<AuthButtons />} />
//<Route path="/widget" element={<PlayerWidget />} />
//<Route path="/callback" element={<Callback />} />
//</Routes>
//</div>
//</Router>
