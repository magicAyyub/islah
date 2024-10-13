'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BaseUrl } from '../base';

interface Payment {
  id: number;
  amount: number;
}

const PaymentsList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    axios.get(`${BaseUrl}/payments`)
      .then(response => setPayments(response.data))
      .catch(error => console.error('Error fetching payments:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payments List</h1>
      <Button asChild variant="default">
        <Link href="/payments/create">Add Payment</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length > 0 ?
          (
            payments.map(payment => (
            <TableRow key={payment.id}>
              <TableCell>{payment.id}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>
                <Button asChild variant="outline">
                  <Link href={`/payments/${payment.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">No payments found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentsList;