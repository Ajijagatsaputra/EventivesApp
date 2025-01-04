import React from 'react';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  author: string;
  imageUrl: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description, date, author, imageUrl }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={imageUrl} alt="Blog" />
        
      </div>
      <div className="px-6 py-4">
        <h3 className="font-bold text-2xl mb-2 text-blue-900">{title}</h3>
        <p className="text-gray-700 text-base line-clamp-3">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">{date}</span>
          <span className="text-sm text-gray-600">•</span>
          <span className="text-sm text-gray-500">By {author}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
