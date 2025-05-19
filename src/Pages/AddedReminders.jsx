import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const AddedReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [filter, setFilter] = useState({
    startDate: '',
    endDate: '',
    sortBy: 'date',
    priority: 'All',
  });

  useEffect(() => {
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const recentReminders = storedReminders.filter(reminder => {
      const reminderDate = new Date(reminder.dateTime);
      const last15Days = new Date();
      last15Days.setDate(last15Days.getDate() - 15);
      return reminderDate >= last15Days;
    });
    setReminders(recentReminders);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredReminders = reminders
    .filter((r) => (filter.priority === 'All' ? true : r.priority === filter.priority))
    .filter((r) => {
      if (!filter.startDate || !filter.endDate) return true;
      const date = new Date(r.dateTime);
      return date >= new Date(filter.startDate) && date <= new Date(filter.endDate);
    })
    .sort((a, b) => {
      if (filter.sortBy === 'priority') {
        return a.priority.localeCompare(b.priority);
      } else if (filter.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return new Date(a.dateTime) - new Date(b.dateTime);
      }
    });

  return (
    <div className="p-8 sm:p-6 max-w-3xl mx-auto sm:max-lg:px-14">
      <h1 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-8 text-center">Added Reminders</h1>
    
      {/* Filter Section */}
      <div className="mb-4">
        <label>Filter by Priority:</label>
        <select
          name="priority"
          value={filter.priority}
          onChange={handleFilterChange}
          className="ml-2 p-2 border rounded"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Sort by:</label>
        <select
          name="sortBy"
          value={filter.sortBy}
          onChange={handleFilterChange}
          className="ml-2 p-2 border rounded"
        >
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="mb-4">
        <label>Filter by Date Range:</label>
        <input
          type="date"
          name="startDate"
          value={filter.startDate}
          onChange={handleFilterChange}
          className="p-2 border rounded mr-2"
        />
        <input
          type="date"
          name="endDate"
          value={filter.endDate}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
      </div>

      {/* Display Reminders */}
      {filteredReminders.length === 0 ? (
        <p>No reminders found.</p>
      ) : (
        <ul className="space-y-2">
          {filteredReminders.map((r, i) => (
            <li key={i} className="p-3 bg-white shadow rounded">
              <strong>{r.title}</strong>
              <div className="text-sm text-gray-500">{format(new Date(r.dateTime), 'MMMM dd, yyyy h:mm a')}</div>
              <div className="text-gray-600">{r.priority}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddedReminders;
