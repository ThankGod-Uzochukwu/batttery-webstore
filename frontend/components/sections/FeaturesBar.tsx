import React from 'react';

const colors = {
  primary: '#facc15', // yellow-400
  secondary: '#1f2937', // gray-800
  text: '#4b5563', // gray-600
};

const features = [
  { title: 'Fast Shipping', desc: 'Across Australia' },
  { title: '2 Year Warranty', desc: 'On all products' },
  { title: 'Expert Support', desc: '24/7 technical help' },
  { title: 'Secure Payment', desc: '100% safe checkout' },
];

export default function FeaturesBar() {
  return (
    <section className="border-y bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center md:items-start md:text-left space-y-1"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }} />
                <h3
                  className="font-bold text-xs uppercase tracking-widest"
                  style={{ color: colors.secondary }}
                >
                  {feature.title}
                </h3>
              </div>
              <p className="text-xs" style={{ color: colors.text }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
