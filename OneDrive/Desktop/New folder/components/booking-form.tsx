"use client"

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookingConfirmation } from './booking-confirmation'

const API_URL = 'http://localhost:3001/api';

export function BookingForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState<string | undefined>(undefined)
  const [guests, setGuests] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const availableTimeSlots = [
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!date || !time) {
      setError('Please select both date and time')
      return
    }

    const booking = {
      date: date.toISOString().split('T')[0],
      time,
      guests: parseInt(guests),
      name,
      email,
      phone
    }

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create booking')
      }

      const data = await response.json()
      setBookingDetails(data)
      setShowConfirmation(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="date">Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <div className="space-y-6">
            <div>
              <Label htmlFor="time">Time</Label>
              <Select onValueChange={setTime} value={time}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Select onValueChange={setGuests} value={guests}>
                <SelectTrigger>
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full">Book Table</Button>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {showConfirmation && (
        <BookingConfirmation
          booking={bookingDetails}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </div>
  )
}

