import { NextResponse } from 'next/server'

// Mock database
let bookings: any[] = []

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const index = bookings.findIndex(booking => booking.id === id)

  if (index === -1) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  bookings.splice(index, 1)
  return NextResponse.json({ message: 'Booking deleted successfully' })
}

