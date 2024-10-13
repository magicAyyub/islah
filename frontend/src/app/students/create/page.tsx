'use client'

import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CreateStudent = () => {
  const [formData, setFormData] = useState({ name: '', age: '', classroom_id: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/students', formData);
      alert('Student created successfully');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Student</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Student Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mb-2"
        />
        <Input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Classroom ID"
          value={formData.classroom_id}
          onChange={(e) => setFormData({ ...formData, classroom_id: e.target.value })}
          className="mb-2"
        />
        <Button type="submit" variant="default">Create</Button>
      </form>
    </div>
  );
};

export default CreateStudent;
