export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Luxe Dining</h3>
            <p className="text-gray-400">Experience culinary excellence</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <p className="text-gray-400">123 Gourmet Street, Foodville</p>
            <p className="text-gray-400">Phone: (555) 123-4567</p>
            <p className="text-gray-400">Email: info@luxedining.com</p>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Hours</h4>
            <p className="text-gray-400">Mon-Fri: 11am - 10pm</p>
            <p className="text-gray-400">Sat-Sun: 10am - 11pm</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2023 Luxe Dining. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

