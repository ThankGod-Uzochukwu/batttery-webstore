import React from 'react';

const colors = {
  primary: '#facc15',
  secondary: '#111827',
};

const posts = [
  {
    title: 'How to extend battery life',
    date: 'Oct 12, 2023',
    excerpt: 'Simple maintenance tips to keep your car starting every morning.',
  },
  {
    title: 'Lithium vs Lead Acid',
    date: 'Oct 05, 2023',
    excerpt: 'Which technology is right for your solar setup?',
  },
  {
    title: 'Signs of battery failure',
    date: 'Sep 28, 2023',
    excerpt: 'Dont get stranded. Learn the warning signs before it is too late.',
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Battery Insights</h2>
            <p className="text-gray-500 text-sm">Expert advice and maintenance guides</p>
          </div>
          <button
            className="text-sm font-bold border-b-2 transition-colors hover:border-black"
            style={{ borderColor: colors.primary }}
          >
            View All Articles
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article key={idx} className="group cursor-pointer">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden" />
              <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                <span className="font-bold uppercase" style={{ color: colors.primary }}>
                  Technical
                </span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:underline">{post.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
