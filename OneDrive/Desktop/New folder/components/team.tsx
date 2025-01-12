import Image from 'next/image'

export function Team() {
  const teamMembers = [
    { name: 'Chef Maria Rodriguez', role: 'Executive Chef', image: '/placeholder.svg?height=300&width=300' },
    { name: 'Sommelier Jean-Pierre', role: 'Head Sommelier', image: '/placeholder.svg?height=300&width=300' },
    { name: 'Olivia Chen', role: 'Pastry Chef', image: '/placeholder.svg?height=300&width=300' },
    { name: 'Marcus Johnson', role: 'Restaurant Manager', image: '/placeholder.svg?height=300&width=300' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

