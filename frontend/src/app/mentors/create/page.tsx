'use client'

import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CreateMentor = () => {
  const [formData, setFormData] = useState({ name: '', expertise: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/mentors', formData);
      alert('Mentor created successfully');
    } catch (error) {
      console.error('Error creating mentor:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Mentor</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Mentor Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Expertise"
          value={formData.expertise}
          onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
          className="mb-2"
        />
        <Button type="submit" variant="default">Create</Button>
      </form>
    </div>
  );
};

export default CreateMentor;
