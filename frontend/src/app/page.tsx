'use client'
import { Button } from '@/components/ui/button'

import { useState } from 'react'


export default function Home() {
  const [data, setData] = useState([])
  return (
    <div>
      <h1>Hello World</h1>
      <Button onClick={() => {
        fetch('http://localhost:8000/students')
          .then(response => response.json())
          .then(data => setData(data))
      }}>Click me</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
