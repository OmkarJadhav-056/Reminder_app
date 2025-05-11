import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddReminder = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dateTime: '',
    priority: 'Medium',
    repeat: 'None',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.title || !form.description || !form.dateTime) {
      return 'All fields except repeat are required';
    }
    if (form.title.length > 180) return 'Title must be under 180 characters';
    if (form.description.length > 500) return 'Description must be under 500 characters';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    const newReminder = {
      ...form,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('reminders')) || [];
    localStorage.setItem('reminders', JSON.stringify([...existing, newReminder]));

    alert('Reminder added!');
    navigate('/dashboard');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Reminder</h2>
      
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          maxLength={180}
          placeholder="Reminder Title (max 180 chars, emojis allowed 😊)"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          maxLength={500}
          placeholder="Description (max 500 characters)"
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <input
          type="datetime-local"
          name="dateTime"
          value={form.dateTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Repeat</label>
            <select
              name="repeat"
              value={form.repeat}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option>None</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save Reminder
        </button>
      </form>
    </div>
  );
};

export default AddReminder;
