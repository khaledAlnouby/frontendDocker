import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {API_BASE_URL} from './config';
const Patient_dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [patientEmail, setPatientEmail] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const [doctorSlots, setDoctorSlots] = useState([]);

  const navigate = useNavigate(); 


  useEffect(() => {
    axios.get(`${API_BASE_URL}api/patient_appointment`)
      .then(response => {
        setDoctors(response.data.doctors);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch the doctor's schedule when a doctor is selected
    if (doctorEmail) {
      axios.get(`${API_BASE_URL}/api/view_doctor_slots/${doctorEmail}`)
        .then(response => {
          setDoctorSlots(response.data.doctor_slots);
        })
        .catch(error => {
          console.error('Error fetching doctor slots:', error);
        });
    }
  }, [doctorEmail]);

  const handleBookAppointment = () => {
    axios.post(`${API_BASE_URL}/api/patient_appointment`, {
      patient_email: patientEmail,
      doctor_email: doctorEmail,
      day : day,
      start_time: startTime,
      end_time: endTime
    },{Headers:{
        "content-Type": "application/json"
    }
    })
      .then(response => {
        setMessage(response.data.msg);
        navigate('/View');
      })
      .catch(error => {
        console.error('Error booking appointment:', error);
        setMessage('Error booking appointment. Please try again.');
      });
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <div>
        <label>Patient Email:</label>
        <input type="text" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} />
      </div>
      <div>
        <label>Select a Doctor:</label>
        <select value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)}>
          <option value="">Select a doctor</option>
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor}>{doctor}</option>
          ))}
        </select>
      </div>
      {doctorSlots.length > 0 && (
        <div>
          <h3>Doctor's Schedule</h3>
          <ul>
            {doctorSlots.map((slot, index) => (
              <li key={index}>
                <strong>Day:</strong> {slot.day}<br />
                <strong>Start Time:</strong> {slot.start_time}<br />
                <strong>End Time:</strong> {slot.end_time}<br />
                <strong>Booked:</strong> {slot.booked ? 'Yes' : 'No'}<br />
              </li>
            ))}
          </ul>
        </div>
      )}

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
      <button onClick={handleBookAppointment}>Book Appointment</button>
      <p>{message}</p>
    </div>
  );
};

export default Patient_dashboard;
