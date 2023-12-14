import './App.css';
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewAppointment from './ViewAppointment';
import SetSchedule from './SetSchedule';
import Patient_dashboard from './Patient_dashboard';
import { API_BASE_URL } from './config';
function App() {
  return (
    <Router>
      <div>
        <h1>Clinic Reservation System</h1>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/View" element={< ViewAppointment/>} />
          <Route path="/Set" element={< SetSchedule/>} />
          <Route path="/patient_dashboard" element={<Patient_dashboard/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
