import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [reminders, setReminders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('reminders')) || [];
    const sorted = [...stored].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    setReminders(sorted);
  }, []);

  const recentReminders = reminders.slice(-5).reverse(); // Last 5 added
  const upcomingReminders = reminders
    .filter(r => new Date(r.dateTime) >= new Date())
    .slice(0, 10); // Next 10 upcoming

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>

      <div className="flex flex-wrap justify-end gap-3 mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/add-reminder')}
        >
          + Add Reminder
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate('/added-reminders')}
        >
          View Added Reminders
        </button>
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          onClick={() => navigate('/upcoming-reminders')}
        >
          View Upcoming Reminders
        </button>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🕒 Recent Reminders</h2>
        {recentReminders.length === 0 ? (
          <p className="text-gray-500">No recent reminders added.</p>
        ) : (
          <ul className="space-y-2">
            {recentReminders.map((r, i) => (
              <li key={i} className="p-3 bg-white shadow rounded">
                <strong>{r.title}</strong>
                <div className="text-sm text-gray-500">{r.dateTime}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📅 Upcoming Reminders</h2>
        {upcomingReminders.length === 0 ? (
          <p className="text-gray-500">No upcoming reminders.</p>
        ) : (
          <ul className="space-y-2">
            {upcomingReminders.map((r, i) => (
              <li key={i} className="p-3 bg-white shadow rounded">
                <strong>{r.title}</strong>
                <div className="text-sm text-gray-500">{r.dateTime}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
