// components/BlogPage.js

import Link from 'next/link';
import '../app/globals.css'
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';    
import FAQ from '@/Component/FAQ';


const blogPosts = [
  {
    id: 1,
    title: 'Introduction to Next.js',
    description: 'Learn about Next.js, a React framework that provides structure and great developer experience.',
    date: '2024-11-01',
  },
  {
    id: 2,
    title: 'Understanding Tailwind CSS',
    description: 'Tailwind CSS is a utility-first CSS framework that can help you design custom interfaces easily.',
    date: '2024-10-25',
  },
  {
    id: 3,
    title: 'React Basics',
    description: 'React is a powerful JavaScript library for building user interfaces. Here is a basic introduction.',
    date: '2024-10-10',
  },
  {
    id: 1,
    title: 'Introduction to Next.js',
    description: 'Learn about Next.js, a React framework that provides structure and great developer experience.',
    date: '2024-11-01',
  },
  {
    id: 2,
    title: 'Understanding Tailwind CSS',
    description: 'Tailwind CSS is a utility-first CSS framework that can help you design custom interfaces easily.',
    date: '2024-10-25',
  },
  {
    id: 3,
    title: 'React Basics',
    description: 'React is a powerful JavaScript library for building user interfaces. Here is a basic introduction.',
    date: '2024-10-10',
  },
];

const Blog = () => {
  return (

    <>
    <Header/>
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <div className="text-sm text-gray-500 mb-4">{post.date}</div>
            <Link href={`/blog/${post.id}`} className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
    <FAQ/>
    <Footer/>
    </>
  );
};

export default Blog;
