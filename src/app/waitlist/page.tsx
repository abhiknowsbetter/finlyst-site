import Section from '@/components/Section';
import WaitlistForm from '@/components/WaitlistForm';

export const revalidate = 60;

export default function WaitlistPage() {
  return (
    <main className="space-y-12">
      <Section id="waitlist">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="h2 accent-gradient">Join the Waitlist</h1>
          <p className="mt-2 text-silver-300">Be first to know when we launch. No spam, promise.</p>
          <div className="mx-auto mt-5 max-w-xl">
            <WaitlistForm />
          </div>
        </div>
      </Section>
    </main>
  );
}
