
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import BlogClient from '@/components/BlogClient';
import ContactForm from '@/components/ContactForm';
import Section from '@/components/Section';
import Footer from '@/components/Footer';
import WaitlistForm from '@/components/WaitlistForm';

export default function Page() {
  return (
    <main className="space-y-12">
    <Hero />
    <div className="hr-soft my-8" />
    <Features />
    <div className="hr-soft my-8" />
    <BlogClient />
    <div className="hr-soft my-8" />

  <Section id="security" className="container-mx">
        <h2 className="h2 accent-gradient mb-4">Security</h2>
        <p className="mb-8 text-lg text-gray-400">Your privacy and security are our top priorities. Here’s how Finlyst protects you:</p>
        <ul className="list-disc pl-6 space-y-4 text-gray-300">
          <li><span className="font-bold text-silver">AES-256 Encryption:</span> All sensitive data is encrypted at rest and in transit using industry-leading standards.</li>
          <li><span className="font-bold text-silver">Row-Level Security (RLS):</span> Your data is protected by strict access controls. Only you can view or modify your information.</li>
          <li><span className="font-bold text-silver">HTTPS-Only:</span> All connections to Finlyst use secure HTTPS. No insecure access is allowed.</li>
          <li><span className="font-bold text-silver">No Third-Party Sharing:</span> We never sell or share your data with advertisers or third parties.</li>
        </ul>
        <p className="mt-8 text-gold font-semibold">Spend. Track. Grow. — with confidence.</p>
  </Section>
  <div className="hr-soft my-8" />

  <Section id="forms">
        <div className="mx-auto max-w-3xl">
          <section id="waitlist" className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">Claim Your First 500 Offer</h2>
            <p className="mt-2 text-silver-300">First 500 users get 6 months FREE premium. Join now & reserve your spot!</p>
            <div className="mx-auto mt-5 max-w-xl">
              <WaitlistForm />
            </div>
          </section>

          <div className="my-10 h-px bg-white/10" />

          <section id="contact" className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">Contact Us</h2>
            <p className="mt-2 text-silver-300">We typically respond within 24–48 hours.</p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </section>
        </div>
  </Section>
  <div className="hr-soft my-8" />

      <Footer />
    </main>
  );
}