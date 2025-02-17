import React from 'react';
import { BlogPost } from '../types';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              <span className="mx-2">•</span>
              <span>{post.author}</span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              <a href={`#blog/${post.id}`} className="hover:text-indigo-600">
                {post.title}
              </a>
            </h3>
            
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            
            <a
              href={`#blog/${post.id}`}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Read more →
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}