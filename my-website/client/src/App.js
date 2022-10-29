import HomePage from './components/HomePage';
import JoinRoom from './components/JoinRoom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import NavBar from './components/NavBar';


function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/chat" element={<JoinRoom />} />
        
        <Route path="*" element={<ErrorPage />} />
      </Routes> 
    </Router>
  );
}

export default App;
