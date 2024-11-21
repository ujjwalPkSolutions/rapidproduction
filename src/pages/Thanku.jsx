// pages/thank-you.js
import Link from 'next/link'
import '../app/globals.css'

export default function ThankYou() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 mx-auto text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>

        <h1 className="text-3xl font-bold text-gray-900 mt-4">Thank You!</h1>
        <p className="text-lg text-gray-600 mt-2">
          Your submission was successfully received. We will get back to you shortly.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
