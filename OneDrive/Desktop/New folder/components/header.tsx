import Link from 'next/link'
import { Utensils } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Utensils className="h-8 w-8 text-amber-600" />
          <span className="text-2xl font-semibold text-gray-800">Luxe Dining</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-gray-600 hover:text-amber-600">Home</Link></li>
            <li><Link href="/menu" className="text-gray-600 hover:text-amber-600">Menu</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-amber-600">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

