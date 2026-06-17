import {
  HeroSection,
  FeaturesBar,
  CategoryGrid,
  FeaturedProducts,
  PromoBanner,
  FeaturedBrands,
  BlogSection,
  NewsletterCTA,
} from '@/components/sections';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturesBar />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoBanner />
      <FeaturedBrands />
      <BlogSection />
      <NewsletterCTA />
    </main>
  );
}
