"use client";
import React, { useState } from "react";
import "../app/globals.css";
import Form from "@/Component/Form";
import FAQ from "@/Component/FAQ";
import Footer from "@/Component/Footer";
import Header from "@/Component/Header"; // Assuming you have a separate Header component

function Landing() {
  const [headerVisible, setHeaderVisible] = useState(false); // State to toggle header visibility on mobile

  // Function to toggle header visibility on mobile
  const toggleHeader = () => {
    setHeaderVisible(!headerVisible);
  };

  return (
    <>
      {/* Main Header Component for Desktop */}
      <div className="lg:block m-auto">
        <Header />
      </div>

      {/* Main Content with background image */}
      <div
        className="section-1 flex flex-col md:flex-row justify-center px-4 py-8 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://shipcartoanotherstate.com/assets/images/ship-car-to-another-state.webp")',
        }}
      >
        <div className="left flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Best Company To Ship A Car
            <br />
            To Another State
          </h1>
          <h3 className="text-lg md:text-xl mb-2 text-white">
            Best Auto Transporter since 2012
          </h3>
          <h3 className="text-lg md:text-xl mb-2 text-white">
            100,000 + Successful Cars Delivered
          </h3>
          <h3 className="text-lg md:text-xl mb-2 text-white">
            24x7 Auto Transport Experts
          </h3>
          <h3 className="text-lg md:text-xl mb-4 text-white">+1 (833) 233-4447</h3>
          <img src="/green.svg" alt="" className="h-40 md:h-52" />

          <p className="text-base md:text-lg mt-4 text-white">
            ShipCartoAnotherState rating <br />
            Based on 13,956 customer reviews
          </p>
        </div>

        <div className="right flex-1 mt-8 md:mt-0 relative">
          {/* Adjusted Form component size */}
          <div className="max-w-sm mx-auto pt-16 relative">
            {/* Image inside the form, positioned in the top-left corner */}
            <img
              src="/insurance.svg"
              alt=""
              className="h-20 md:h-24 absolute top-0 left-0"
            />
            <Form />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="section-2 px-4 py-8">
        <div className="review grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rleft flex flex-col items-center">
            <h1 className="text-xl">Google</h1>
            <div className="text-lg">⭐⭐⭐⭐⭐</div>
            <p>(14,534 reviews)</p>
          </div>
          <div className="rright flex flex-col items-center">
            <h1 className="text-xl">4.8</h1>
            <img src="/ggl.jpeg" alt="" className="w-24 h-12" />
          </div>

          <div className="rleft flex flex-col items-center">
            <h1 className="text-xl">Transport Reviews</h1>
            <div className="text-lg">⭐⭐⭐⭐⭐</div>
            <p>(3,534 reviews)</p>
          </div>
          <div className="rright flex flex-col items-center">
            <h1 className="text-xl">4.8</h1>
            <img src="/transport.png" alt="" className="w-24 h-12" />
          </div>

          <div className="rleft flex flex-col items-center">
            <h1 className="text-xl">BBB</h1>
            <div className="text-lg">⭐⭐⭐⭐⭐</div>
            <p>(7,534 reviews)</p>
          </div>
          <div className="rright flex flex-col items-center">
            <h1 className="text-xl">4.8</h1>
            <img src="/bbb.png" alt="" className="w-20 h-10" />
          </div>

          <div className="rleft flex flex-col items-center">
            <h1 className="text-xl">Trustpilot</h1>
            <div className="text-lg">⭐⭐⭐⭐⭐</div>
            <p>(14,534 reviews)</p>
          </div>
          <div className="rright flex flex-col items-center">
            <h1 className="text-xl">4.8</h1>
            <img src="/trustpilot.png" alt="" className="w-24 h-12" />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="px-4 py-8">
        <FAQ />
      </div>

      {/* Footer Section */}
      <div className="px-4 py-8">
        <Footer />
      </div>
    </>
  );
}

export default Landing;
