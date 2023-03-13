import HomePage from './components/HomePage';
import JoinRoom from './components/JoinRoom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import NavBar from './components/NavBar';
import RandomVideo from './components/RandomVideo';
import CanvasPage from './components/CanvasPage';
import Footer from './components/Footer';


function App() {

  return (
      <div style={{backgroundColor:'var(--bg-color)', transition:'background 1s', minHeight:'100vh', position:'relative'}}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/chat" element={<JoinRoom />} />

          <Route path="/song-rec" element={<RandomVideo />} />

          <Route path="/canvas" element={<CanvasPage />} />
          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
