"use client";

import { useState } from "react";
import BlogCard from "./blogCard";

const blogs = [
  {
    title: "6 Strategies to Find Your Conference Keynote and Other Speakers",
    description:
      "Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos...",
    date: "12 Mar",
    author: "John Doe",
    imageUrl: "/assets/blog/blog1.png",
  },
  {
    title:
      "How Successfully Used Paid Marketing to Drive Incremental Ticket Sales",
    description:
      "Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos...",
    date: "12 Mar",
    author: "John Doe",
    imageUrl: "/assets/blog/blog2.png",
  },
  {
    title:
      "Introducing Workspaces: Work smarter, not harder with new navigation",
    description:
      "Sekarang, kamu bisa produksi tiket fisik untuk eventmu bersama Bostiketbos...",
    date: "12 Mar",
    author: "John Doe",
    imageUrl: "/assets/blog/blog3.png",
  },
];

const BlogDetails = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(blogs.slice(0, 3));

  const loadMore = () => {
    setVisibleBlogs((prevVisibleBlogs) => [
      ...prevVisibleBlogs,
      ...blogs.slice(prevVisibleBlogs.length, prevVisibleBlogs.length + 3),
    ]);
  };

  return (
    <div className="container mx-auto py-8 mt-20 px-4 md:px-0">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 font-proximanova2">Blog</h1>
      <p className="text-center mb-8 md:mb-12 text-gray-600 text-sm md:text-base">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleBlogs.map((blog, index) => (
          <BlogCard
            key={index}
            title={blog.title}
            description={blog.description}
            date={blog.date}
            author={blog.author}
            imageUrl={blog.imageUrl}
          />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button
          onClick={loadMore}
          className="px-6 md:px-10 py-3 md:py-4 text-lg font-bold text-indigo-600 border-2 border-indigo-600 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
