import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import WorkspaceDetails from './pages/WorkspaceDetails';
import About from './pages/About';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="app d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-fill">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/workspace/:id" element={<WorkspaceDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;