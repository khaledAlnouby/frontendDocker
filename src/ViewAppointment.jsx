import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {API_BASE_URL} from './config';


const ViewAppointments = () => {
  const [patientEmails, setPatientEmails] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchPatientEmails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get_all_patient_emails');
        setPatientEmails(response.data.patientEmails);
      } catch (error) {
        console.error('Error fetching patient emails:', error.message);
      }
    };

    fetchPatientEmails();
  }, []);
  const Navigate =useNavigate();
  const handlePatientChange = async (selectedEmail) => {
    try {
      setSelectedPatient(selectedEmail);

      if (selectedEmail) {
        const response = await axios.get(`${API_BASE_URL}/api/view_patient_appointments/${selectedEmail}`);
        setAppointments(response.data.appointments);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error.message);
    }
  };
  const handlegoBook=function() { 
    Navigate("/patient_dashboard")
  };

  const handleCancelAppointment = async (appointment) => {
    try {
      const response = await axios.put(`${API_BASE_URL}api/cancel_appointment`, {
        patient_email: selectedPatient,
        doctor_email: appointment.doctor_email,
        day: appointment.day,
        start_time: appointment.start_time,
        end_time: appointment.end_time,
      });

      setMessage(response.data.msg);

      // Refresh the appointments after cancellation
      handlePatientChange(selectedPatient);
    } catch (error) {
      console.error('Error canceling appointment:', error.message);
      setMessage('Error canceling appointment. Please try again.');
    }
  };
  return (
    <div>
      <h2>View Appointments</h2>
      <div>
        <label>Select a Patient:</label>
        <select value={selectedPatient} onChange={(e) => handlePatientChange(e.target.value)}>
          <option value="">Select a patient</option>
          {patientEmails.map((email, index) => (
            <option key={index} value={email}>{email}</option>
          ))}
        </select>
      </div>
      <div>
        <h3>Appointments</h3>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id}>
                <strong>Doctor:</strong> {appointment.doctor_email}<br />
                <strong>Day:</strong> {appointment.day}<br />
                <strong>Start Time:</strong> {appointment.start_time}<br />
                <strong>End Time:</strong> {appointment.end_time}<br />
                <button onClick={() => handleCancelAppointment(appointment)}>Cancel Appointment</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => handlegoBook()}>new Book</button>

      </div>
      <p>{message}</p>
    </div>
  );
};

export default ViewAppointments;
