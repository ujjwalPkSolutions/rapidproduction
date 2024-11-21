import React from "react";
import Link from 'next/link';

function Header() {
  return (
    <>
      <div className="header bg-blue-500 text-white py-2 px-4">
        <h1 className="text-sm sm:text-base md:text-lg lg:text-xl text-center sm:text-left">
          FREE TO CALL +1 (833) 233-4447
        </h1>
      </div>
      <div className="menu flex justify-between items-center bg-white shadow-md">
  <div className="flex flex-1 justify-center items-center  space-x-6 text-sm md:text-4xl font-bold">
    <Link style={{ textDecoration: "none", color: "black" }} href="/">Home</Link>
    <Link style={{ textDecoration: "none", color: "black" }} href="/Services">Services</Link>
    <div className="flex justify-center">
      <img src="/Modern.webp" alt="Logo" className="h-20 w-auto md:h-24" />
    </div>
    <Link style={{ textDecoration: "none", color: "black" }} href="/Contact">Contact</Link>
    <Link style={{ textDecoration: "none", color: "black" }} href="/Blogs">Blogs</Link>
  </div>
</div>





    </>
  );
}

export default Header;
