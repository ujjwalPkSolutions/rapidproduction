// pages/services.js
import { FaTruck, FaShip, FaPlane, FaWarehouse } from "react-icons/fa";
import '../app/globals.css'
import Footer from "@/Component/Footer";
import Header from "@/Component/Header";
import FAQ from "@/Component/FAQ";


const servicesData = [
  {
    icon: <FaTruck className="text-blue-500 w-16 h-16" />,
    title: "Freight Transportation",
    description: "Our road freight services provide a reliable solution for your domestic and cross-border transportation needs. With a dedicated fleet and expert drivers, we ensure that your goods reach their destination on time and in perfect condition. Whether it’s a small parcel or a full truckload, we offer flexible and cost-effective solutions customized to your requirements.",
  },
  {
    icon: <FaShip className="text-green-500 w-16 h-16" />,
    title: "Sea Shipping",
    description: "Our sea shipping services offer global reach for large volumes of goods. We work with trusted carriers to provide reliable and economical options, whether it’s for container shipping, bulk cargo, or specialized equipment. Our team ensures that all customs and port handling processes are smoothly managed, offering you peace of mind from origin to destination.",
  },
  {
    icon: <FaPlane className="text-purple-500 w-16 h-16" />,
    title: "Air Freight",
    description: "Our air freight services prioritize speed and reliability for urgent or time-sensitive shipments. With access to major airlines and cargo hubs worldwide, we provide competitive rates and flexible options for small packages, high-value goods, and perishable items. Let us handle all documentation and logistics, ensuring fast and seamless transit times.",
  },
  {
    icon: <FaWarehouse className="text-red-500 w-16 h-16" />,
    title: "Warehousing",
    description: "Our warehousing solutions provide secure and accessible storage options to meet all your logistics needs. With state-of-the-art facilities, 24/7 security, and comprehensive inventory management, we enable efficient storage and distribution. From short-term to long-term storage, our warehousing services are ideal for businesses needing flexible storage space.",
  },
];

export default function Services() {
  return (
    <>

    <Header/>
    <div className="min-h-screen bg-gray-100 py-16">

      <div className="container mx-auto px-6">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Comprehensive Logistics Solutions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide end-to-end logistics solutions tailored to meet the diverse needs of our clients. From road freight and sea shipping to air freight and warehousing, our expert team and extensive network ensure that your cargo is transported safely, efficiently, and on schedule.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 text-center mb-4">{service.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-blue-600 text-white py-12 px-6 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us?</h2>
          <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
            With years of experience in the logistics industry, we are committed to providing superior transportation services with a customer-first approach. Our team goes the extra mile to ensure reliability, safety, and efficiency in every shipment. Here are some reasons why clients choose us for their logistics needs:
          </p>
          <ul className="flex flex-col md:flex-row md:justify-around gap-8 text-lg">
            <li>✅ Experienced and dedicated team</li>
            <li>✅ Advanced tracking and logistics technology</li>
            <li>✅ Extensive global network and partnerships</li>
            <li>✅ Flexible and scalable services</li>
          </ul>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 italic">
                "Excellent service! The team went above and beyond to ensure our shipment arrived on time despite tight deadlines."
              </p>
              <p className="text-gray-800 font-bold mt-4 text-right">- Alex M., Import Manager</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 italic">
                "Their warehousing and inventory management solutions have streamlined our supply chain and reduced overhead costs."
              </p>
              <p className="text-gray-800 font-bold mt-4 text-right">- Sarah K., Operations Director</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 italic">
                "Their customer service and communication throughout the process were outstanding. Highly recommended!"
              </p>
              <p className="text-gray-800 font-bold mt-4 text-right">- John D., Small Business Owner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FAQ/>
    <Footer/>
    </>
  );
}
