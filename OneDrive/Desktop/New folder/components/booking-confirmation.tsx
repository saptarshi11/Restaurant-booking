import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const API_URL = 'http://localhost:3001/api';

interface BookingConfirmationProps {
  booking: {
    id: string;
    date: string;
    time: string;
    guests: string;
    name: string;
    email: string;
    phone: string;
  };
  onClose: () => void;
}

export function BookingConfirmation({ booking, onClose }: BookingConfirmationProps) {
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings/${booking.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      onClose();
    } catch (error) {
      setDeleteError('Failed to delete booking. Please try again.');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking Confirmed!</DialogTitle>
          <DialogDescription>
            Thank you for choosing our restaurant. Here are your booking details:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Guests:</strong> {booking.guests}</p>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
          <p><strong>Booking ID:</strong> {booking.id}</p>
        </div>
        {deleteError && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {deleteError}
          </div>
        )}
        <div className="flex justify-between mt-6">
          <Button onClick={onClose}>Close</Button>
          <Button variant="destructive" onClick={handleDelete}>Cancel Booking</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

