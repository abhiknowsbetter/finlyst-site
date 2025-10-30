export const dynamic = "force-static";
import Features from '@/components/Features';

export const revalidate = 60;

export default function FeaturesPage() {
  return (
    <main className="space-y-12">
      <Features />
    </main>
  );
}
