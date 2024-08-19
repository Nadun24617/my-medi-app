import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DoctorAppointmentsCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
    // Add logic to fetch and display doctor's appointments for the selected date
  };

  // Sample data for doctor appointments
  const appointments = {
    'Sun Aug 18 2024': [
      { name: 'Leslie Alexander', time: '1:00 PM - 2:30 PM', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { name: 'Michael Foster', time: '3:00 PM - 4:30 PM', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { name: 'Dries Vincent', time: '5:00 PM - 6:30 PM', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { name: 'Lindsay Walton', time: '7:00 PM - 8:30 PM', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { name: 'Courtney Henry', time: '9:00 PM - 10:30 PM', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
    ],
  };

  return (
    <div className="flex p-4 bg-white rounded-lg shadow-md">
      <div className="w-1/2">
        <Calendar onChange={handleDateChange} value={date} />
      </div>
      <div className="w-1/2 pl-8">
        <h2 className="text-xl font-semibold mb-4">Schedule for {date.toDateString()}</h2>
        <ul>
          {appointments[date.toDateString()] ? (
            appointments[date.toDateString()].map((appointment, index) => (
              <li key={index} className="flex items-center mb-4">
                <img src={appointment.image} alt={appointment.name} className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <p className="text-lg font-semibold">{appointment.name}</p>
                  <p className="text-sm text-gray-500">{appointment.time}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No appointments for this day.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAppointmentsCalendar;
