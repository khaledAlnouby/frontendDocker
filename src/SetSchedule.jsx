import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {API_BASE_URL} from './config';
const SetSchedule = () => {
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctorSlots, setDoctorSlots] = useState([]);


  useEffect(() => {
    // get the list of doctors 
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/view_doctors`);
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error('Error fetching doctors:', error.message);
      }
    };

    fetchDoctors();
  }, []); 

  useEffect(() => {
    // Fetch the selected doctor's schedule when the selected doctor changes
    const fetchDoctorSlots = async () => {
      try {
        if (selectedDoctor) {
          const response = await axios.get(`${API_BASE_URL}/api/view_doctor_slots/${selectedDoctor}`);
          setDoctorSlots(response.data.doctors_slots);
        }
      } catch (error) {
        console.error('Error fetching doctor slots:', error.message);
      }
    };

    fetchDoctorSlots();
  }, [selectedDoctor]);


  const handleSetSchedule = async () => {
    try {
      const data = {
        day,
        start_time: startTime,
        end_time: endTime,
      };
  
      const response = await axios.post(`http://localhost:5000/api/set_schedule/${selectedDoctor}`, data);
  
      setMessage(response.data.msg);
    } catch (error) {
      console.error('Error setting schedule:', error.message);
      setMessage('Error setting schedule');
    }
  };
  
  return (
    <div>
    <h2>User type : doctor </h2>
      <h2>Set Schedule</h2>
    
      <div>
        <label>Select a Doctor:</label>
        <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
          <option value="">Select a doctor</option>
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor}>{doctor}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label>Day:</label>
        <input type="text" value={day} onChange={(e) => setDay(e.target.value)} />
      </div>
      <div>
        <label>Start Time:</label>
        <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <div>
        <label>End Time:</label>
        <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <button onClick={handleSetSchedule}>Set Schedule</button>
      <p>{message}</p>
      {doctorSlots && doctorSlots.length > 0 && (
        <div>
          <h3>Doctor's Schedule:</h3>
          <ul>
            {doctorSlots.map((slot, index) => (
              <li key={index}>
                <strong>Day:</strong> {slot.day}<br />
                <strong>Start Time:</strong> {slot.start_time}<br />
                <strong>End Time:</strong> {slot.end_time}<br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SetSchedule;
