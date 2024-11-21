// pages/contact.js
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import '../app/globals.css';
import Header from "@/Component/Header";
import FAQ from "@/Component/FAQ";
import Footer from "@/Component/Footer";

export default function Contact() {
  return (
    <>

    <Header/>
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for any queries or to request a shipping quote. We are here to assist you with all your transportation and logistics needs.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
              <FaPhone className="text-blue-500 w-8 h-8 mr-4" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-700">Phone</h3>
                <p className="text-gray-600">+1 800 123 4567</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-green-500 w-8 h-8 mr-4" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-700">Email</h3>
                <p className="text-gray-600">info@transportcompany.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-center mb-6">
              <FaMapMarkerAlt className="text-purple-500 w-8 h-8 mr-4" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-700">Address</h3>
                <p className="text-gray-600">123 Logistics Street, City, Country</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaFacebook className="text-blue-600 w-8 h-8 mr-4" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-700">Follow Us</h3>
                <p className="text-gray-600">Facebook | LinkedIn | Twitter</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 mb-6">Business Hours</h3>
            <p className="text-gray-600">Monday to Friday: 9:00 AM - 6:00 PM</p>
            <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Send Us a Message</h2>
          <form action="#" method="POST" className="space-y-6">
            <div className="flex space-x-6">
              <div className="w-full">
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" required className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" required className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" required rows="5" className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
        <FAQ/>
        <Footer/>
    </>
  );
}
