import HeroSection from '../components/sections/HeroSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturedProducts />
    </main>
  );
}
