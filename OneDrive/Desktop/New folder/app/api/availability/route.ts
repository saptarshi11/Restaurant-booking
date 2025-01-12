import { NextResponse } from 'next/server'

// Mock database
let bookings: any[] = []

const OPENING_HOUR = 17 // 5 PM
const CLOSING_HOUR = 23 // 11 PM
const SLOT_DURATION = 60 // 60 minutes

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 })
  }

  const availableSlots = []
  const bookedSlots = bookings.filter(booking => booking.date === date).map(booking => booking.time)

  for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += SLOT_DURATION) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      const isAvailable = !bookedSlots.includes(time)
      availableSlots.push({ time, isAvailable })
    }
  }

  return NextResponse.json(availableSlots)
}

