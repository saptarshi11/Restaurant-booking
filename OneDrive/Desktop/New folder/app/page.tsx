import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { BookingForm } from '../components/booking-form'
import { AboutUs } from '../components/about-us'
import { Services } from '../components/services'
import { Team } from '../components/team'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="relative h-[60vh] bg-cover bg-center" style={{backgroundImage: "url('/hero-image.jpg')"}}>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Luxe Dining</h1>
              <p className="text-xl md:text-2xl mb-8">Experience culinary excellence in every bite</p>
              <a href="#booking" className="bg-amber-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-amber-700 transition duration-300">Book a Table</a>
            </div>
          </div>
        </section>
        <AboutUs />
        <Services />
        <Team />
        <section id="booking" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Reserve Your Table</h2>
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

