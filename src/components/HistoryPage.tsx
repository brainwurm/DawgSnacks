import React from 'react';
import Card from './Card';

interface HistoryPageProps {
  posts: Array<{
    _id: string;
    title: string;
    createdAt?: string;
  }>;
}

export default function HistoryPage({ posts }: HistoryPageProps) {
  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <Card className="p-4">
          <p className="text-white text-center">No history yet</p>
        </Card>
      ) : (
        posts.map(post => (
          <Card key={post._id} className="p-4">
            <h3 className="text-white font-bold mb-2">{post.title}</h3>
            {post.createdAt && (
              <p className="text-gray-300 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
