import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import ClubsDirectory from './pages/ClubsDirectory';
import ClubDetail from './pages/ClubDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Events from './pages/Events';
import Venues from './pages/Venues';
import Members from './pages/Members';
import Profile from './pages/Profile'; // <--- Ensure this is here
import EventSeating from './pages/EventSeating';

// Inside <Routes>

export default function App() {
  return (
    <Router>
      <div className="relative z-10">
        <Navbar />
        <main className="min-h-screen pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clubs" element={<ClubsDirectory />} />
            <Route path="/club/:id" element={<ClubDetail />} /> 
            <Route path="/events" element={<Events />} />
            <Route path="/profile" element={<Profile />} /> {/* <--- Ensure this is here */}
            <Route path="/venues" element={<Venues />} />
            <Route path="/members" element={<Members />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events/:id/seating" element={<EventSeating />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}