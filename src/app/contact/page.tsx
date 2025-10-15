import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';

export const revalidate = 60;

export default function ContactPage() {
  return (
    <main className="space-y-12">
      <Section id="contact">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="h2 accent-gradient">Contact Us</h1>
          <p className="mt-2 text-silver-300">We typically respond within 24–48 hours.</p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </Section>
    </main>
  );
}
