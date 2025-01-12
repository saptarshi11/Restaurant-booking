import { NextResponse } from 'next/server'
import { z } from 'zod'

// Mock database
let bookings: any[] = []

// Validation schema
const bookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  guests: z.number().int().min(1).max(10),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
})

// Business rules
const MINIMUM_NOTICE_HOURS = 2
const MAXIMUM_PARTY_SIZE = 10
const SLOT_DURATION_MINUTES = 90

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const booking = bookingSchema.parse(body)

    // Check minimum notice period
    const bookingDateTime = new Date(`${booking.date}T${booking.time}`)
    const now = new Date()
    const hoursDifference = (bookingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    if (hoursDifference < MINIMUM_NOTICE_HOURS) {
      return NextResponse.json({ error: `Bookings must be made at least ${MINIMUM_NOTICE_HOURS} hours in advance` }, { status: 400 })
    }

    // Check maximum party size
    if (booking.guests > MAXIMUM_PARTY_SIZE) {
      return NextResponse.json({ error: `Maximum party size is ${MAXIMUM_PARTY_SIZE}` }, { status: 400 })
    }

    // Check if the slot is available
    const conflictingBooking = bookings.find(b => {
      const existingBookingTime = new Date(`${b.date}T${b.time}`).getTime()
      const newBookingTime = bookingDateTime.getTime()
      return Math.abs(existingBookingTime - newBookingTime) < SLOT_DURATION_MINUTES * 60 * 1000
    })

    if (conflictingBooking) {
      return NextResponse.json({ error: 'This time slot is not available' }, { status: 400 })
    }

    // Add booking
    const newBooking = { ...booking, id: Date.now().toString() }
    bookings.push(newBooking)

    return NextResponse.json(newBooking, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (date) {
    const filteredBookings = bookings.filter(booking => booking.date === date)
    return NextResponse.json(filteredBookings)
  }

  return NextResponse.json(bookings)
}

