
import './App.css';
import Accueil from './component/accueil';
import Navbar from './component/navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Router>
       <Navbar />
       <Routes>

          <Route path="/accueil" element={<Accueil />}></Route>

     </Routes>
     </Router>
    </div>
  );
}

export default App;
