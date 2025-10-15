import Hero from '@/components/Hero';
import Features from '@/components/Features';
import BlogClient from '@/components/BlogClient';
import WaitlistForm from '@/components/WaitlistForm';
import ContactForm from '@/components/ContactForm';
import Section from '@/components/Section';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main className="space-y-12">
      <Hero />
      <Features />
  <BlogClient />

      <Section id="forms">
        <div className="mx-auto max-w-3xl">
          <section id="waitlist" className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">Join the Waitlist</h2>
            <p className="mt-2 text-silver-300">Be first to know when we launch. No spam, promise.</p>
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

      <Footer />
    </main>
  );
}