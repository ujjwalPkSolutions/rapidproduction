import React from "react";
import "@/styles/footer.css";

function Footer() {
  return (
    <>
      <footer className=" py-6 bg">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Column 1: Company */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-semibold mb-2 text-white">
              shipcartoanotherstate.com
              </h3>
              <p className="text-white text-sm">
                An Auto Transportation Agency you can rely on regards shipping
                your loveable Vehicles from one part of the nation to another
                with hassle free Cars Shipping Process since 2012.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Follow Us */}
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-white">
                Follow Us
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white hover:text-gray-400">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-white">Contact</h3>
              <address className="text-white text-sm">
                123 Street Name, City, Country
                <br />
                Email:{" "}
                <a
                  href="mailto:info@company.com"
                  className="hover:text-gray-400"
                >
                  info@company.com
                </a>
                <br />
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:text-gray-400">
                  +123 456 7890
                </a>
              </address>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="text-center text-white mt-6">
            <p>&copy; 2024 Company Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
