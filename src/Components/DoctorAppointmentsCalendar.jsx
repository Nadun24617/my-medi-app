import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DoctorAppointmentsCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [newName, setNewName] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost/my-medi-app/src/php/doctorappoint.php');
      const data = await response.json();
      const formattedData = data.reduce((acc, appointment) => {
        const date = appointment.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(appointment);
        return acc;
      }, {});
      setAppointments(formattedData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
    setNewDate(date.toISOString().split('T')[0]); // Format date to 'YYYY-MM-DD'
  };

  const addAppointment = async () => {
    
    try {
      const newAppointment = {
        name: newName,
        time: newTime,
        date: newDate,
        location: newLocation,
        image: 'https://randomuser.me/api/portraits/men/3.jpg', // Replace with actual image or placeholder
      };

      const response = await fetch('http://localhost/my-medi-app/src/php/doctorappoint.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });

      const addedAppointment = await response.json();

      setAppointments({
        ...appointments,
        [newDate]: [...(appointments[newDate] || []), addedAppointment],
      });

      setNewName('');
      setNewTime('');
      setNewDate('');
      setNewLocation('');
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  };

  const startEditing = (appointmentId, currentName, currentTime, currentDate, currentLocation) => {
    setEditingAppointmentId(appointmentId);
    setNewName(currentName);
    setNewTime(currentTime);
    setNewDate(currentDate);
    setNewLocation(currentLocation);
  };

  const saveEdit = async () => {
    try {
      const updatedAppointment = {
        id: editingAppointmentId,
        name: newName,
        time: newTime,
        date: newDate,
        location: newLocation,
        image: 'https://randomuser.me/api/portraits/men/3.jpg', // Replace with actual image or placeholder
      };

      await fetch('http://localhost/my-medi-app/src/php/doctorappoint.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAppointment),
      });

      setAppointments({
        ...appointments,
        [newDate]: appointments[newDate].map((appointment) =>
          appointment.id === editingAppointmentId
            ? updatedAppointment
            : appointment
        ),
      });

      setEditingAppointmentId(null);
      setNewName('');
      setNewTime('');
      setNewDate('');
      setNewLocation('');
    } catch (error) {
      console.error('Error saving appointment edit:', error);
    }
  };

  const deleteAppointment = async (appointmentId, appointmentDate) => {
    try {
      await fetch(`http://localhost/my-medi-app/src/php/doctorappoint.php?id=${appointmentId}`, {
        method: 'DELETE',
      });

      setAppointments({
        ...appointments,
        [appointmentDate]: appointments[appointmentDate].filter(
          (appointment) => appointment.id !== appointmentId
        ),
      });
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
      <div className="flex mb-4">
        <div className="w-1/2">
          <Calendar onChange={handleDateChange} value={date} />
        </div>
        <div className="w-1/2 pl-8">
          <h2 className="text-xl font-semibold mb-4">Schedule for {date.toDateString()}</h2>
          <ul>
            {appointments[newDate] && appointments[newDate].length > 0 ? (
              appointments[newDate].map((appointment) => (
                <li key={appointment.id} className="flex items-center mb-4">
                  <img
                    src={appointment.image}
                    alt={appointment.name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    {editingAppointmentId === appointment.id ? (
                      <div className="flex flex-col">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="Doctor's Name"
                          className="p-2 mb-2 border border-gray-300 rounded"
                        />
                        <input
                          type="time"
                          value={newTime}
                          onChange={(e) => setNewTime(e.target.value)}
                          className="p-2 mb-2 border border-gray-300 rounded w-full"
                        />
                        <input
                          type="date"
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className="p-2 mb-2 border border-gray-300 rounded w-full"
                        />
                        <input
                          type="text"
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          placeholder="Location"
                          className="p-2 mb-2 border border-gray-300 rounded"
                        />
                        <button onClick={saveEdit} className="text-green-500 mt-2">
                          Save
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-semibold">{appointment.name}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                        <p className="text-sm text-gray-500">{appointment.location}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center ml-auto">
                    <button
                      onClick={() =>
                        startEditing(
                          appointment.id,
                          appointment.name,
                          appointment.time,
                          newDate,
                          appointment.location
                        )
                      }
                      className="text-blue-500 ml-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAppointment(appointment.id, newDate)}
                      className="text-red-500 ml-2"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No appointments for this day.</p>
            )}
          </ul>
          <div className="mt-4">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Doctor's Name"
              className="p-2 mb-2 border border-gray-300 rounded w-full"
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="p-2 mb-2 border border-gray-300 rounded w-full"
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="p-2 mb-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Location"
              className="p-2 mb-2 border border-gray-300 rounded w-full"
            />
            <button
              onClick={addAppointment}
              className="p-2 bg-blue-500 text-white rounded w-full"
            >
              Add Appointment
            </button>
          </div>
        </div>
      </div>

      {/* All Appointments Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
        <ul>
          {Object.entries(appointments).map(([date, dailyAppointments]) =>
            dailyAppointments.map((appointment) => (
              <li key={appointment.id} className="flex items-center mb-4">
                <img
                  src={appointment.image}
                  alt={appointment.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-semibold">{appointment.name}</p>
                  <p className="text-sm text-gray-500">{appointment.time} on {date}</p>
                  <p className="text-sm text-gray-500">{appointment.location}</p>
                </div>
                <div className="flex items-center ml-auto">
                  <button
                    onClick={() =>
                      startEditing(
                        appointment.id,
                        appointment.name,
                        appointment.time,
                        date,
                        appointment.location
                      )
                    }
                    className="text-blue-500 ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAppointment(appointment.id, date)}
                    className="text-red-500 ml-2"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAppointmentsCalendar;
