import React from 'react';

const colors = {
  primary: '#facc15',
  secondary: '#111827',
  overlay: 'rgba(0, 0, 0, 0.4)',
};

const categories = [
  { name: 'Car Batteries', count: '120+ Products' },
  { name: 'Marine Batteries', count: '45+ Products' },
  { name: 'Solar Storage', count: '30+ Products' },
  { name: 'Industrial UPS', count: '15+ Products' },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold mb-8" style={{ color: colors.secondary }}>
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group relative h-64 overflow-hidden rounded-xl bg-gray-200 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity group-hover:from-black/90" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl mb-1">{cat.name}</h3>
                <p
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: colors.primary }}
                >
                  {cat.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
