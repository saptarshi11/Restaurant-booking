import { Utensils, Wine, Cake, Music } from 'lucide-react'

export function Services() {
  const services = [
    { icon: Utensils, title: 'Fine Dining', description: 'Experience our exquisite menu crafted by world-class chefs.' },
    { icon: Wine, title: 'Wine Pairing', description: 'Enjoy perfectly matched wines with your meal, selected by our sommeliers.' },
    { icon: Cake, title: 'Special Events', description: 'Let us host your celebrations with customized menus and impeccable service.' },
    { icon: Music, title: 'Live Entertainment', description: 'Delight in soothing live music during select evenings.' },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <service.icon className="w-12 h-12 mx-auto mb-4 text-amber-600" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

