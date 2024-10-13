'use client'

import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CreateClassroom = () => {
  const [formData, setFormData] = useState({ name: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/classrooms', formData);
      alert('Classroom created successfully');
    } catch (error) {
      console.error('Error creating classroom:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Classroom</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Classroom Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mb-2"
        />
        <Button type="submit" variant="default">Create</Button>
      </form>
    </div>
  );
};

export default CreateClassroom;
