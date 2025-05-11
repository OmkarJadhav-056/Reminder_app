// src/pages/UpcomingReminders.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const UpcomingReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [selectedReminder, setSelectedReminder] = useState(null);

  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(storedReminders);
  }, []);

  const handleReminderClick = (reminder) => {
    setSelectedReminder(reminder);
  };

  const handleReplicate = () => {
    if (selectedReminder) {
      const replicatedReminder = { ...selectedReminder, id: Date.now(), dateTime: new Date().toISOString() };
      const updatedReminders = [...reminders, replicatedReminder];
      localStorage.setItem('reminders', JSON.stringify(updatedReminders));
      setReminders(updatedReminders);
      alert('Reminder replicated!');
      setSelectedReminder(null);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upcoming Reminders</h1>

      {/* Calendar View - Placeholder */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {/* Calendar Weekdays */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i} className="text-center font-semibold">{day}</div>
        ))}

        {/* Calendar Days */}
        {Array.from({ length: 30 }, (_, index) => (
          <div key={index} className="p-4 border border-gray-300 text-center">
            {index + 1}
            <div className="space-y-2 mt-2">
              {reminders
                .filter(r => new Date(r.dateTime).getDate() === index + 1)
                .map((r, i) => (
                  <div key={i} onClick={() => handleReminderClick(r)} className="text-sm bg-blue-200 p-1 rounded">
                    {r.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Reminder Details */}
      {selectedReminder && (
        <div className="mt-6 p-4 bg-white shadow rounded">
          <h2 className="text-xl font-semibold">{selectedReminder.title}</h2>
          <p>{selectedReminder.description}</p>
          <p className="text-sm text-gray-500">{format(new Date(selectedReminder.dateTime), 'MMMM dd, yyyy h:mm a')}</p>
          <button onClick={handleReplicate} className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Replicate Reminder
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingReminders;
