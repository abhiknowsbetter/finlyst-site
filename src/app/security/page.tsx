
import Section from "@/components/Section";

export default function SecurityPage() {
  return (
    <Section className="section-pad container-mx">
      <h1 className="text-center text-[32px] sm:text-[40px] font-extrabold accent-gold title-soft-glow mb-4 flex items-center justify-center gap-2">
        <span role="img" aria-label="shield" className="text-3xl">🔐</span>
        Your Security, Our Promise
      </h1>
      <p className="mb-8 text-center text-lg text-silver-300 max-w-2xl mx-auto">
        At Finlyst, your privacy and security are non-negotiable. Here’s how we protect your money and data:
      </p>
      <ul className="grid gap-6 sm:grid-cols-2 list-none p-0 mb-8">
        <li className="bg-silver-900/80 border border-silver-700 rounded-xl p-5 shadow-lg flex gap-3 items-start">
          <span className="text-2xl" role="img" aria-label="check">✅</span>
          <div>
            <span className="font-bold accent-gold">AES-256 Encryption</span>
            <p className="mt-2 text-silver-300 text-sm">All sensitive data is encrypted at rest and in transit using industry-leading standards.</p>
          </div>
        </li>
        <li className="bg-silver-900/80 border border-silver-700 rounded-xl p-5 shadow-lg flex gap-3 items-start">
          <span className="text-2xl" role="img" aria-label="lock">🔒</span>
          <div>
            <span className="font-bold accent-gold">Row-Level Security (RLS)</span>
            <p className="mt-2 text-silver-300 text-sm">Strict access controls ensure only you can view or modify your information.</p>
          </div>
        </li>
        <li className="bg-silver-900/80 border border-silver-700 rounded-xl p-5 shadow-lg flex gap-3 items-start">
          <span className="text-2xl" role="img" aria-label="globe">🌐</span>
          <div>
            <span className="font-bold accent-gold">HTTPS-Only</span>
            <p className="mt-2 text-silver-300 text-sm">All connections to Finlyst use secure HTTPS. No insecure access is allowed.</p>
          </div>
        </li>
        <li className="bg-silver-900/80 border border-silver-700 rounded-xl p-5 shadow-lg flex gap-3 items-start">
          <span className="text-2xl" role="img" aria-label="no">🚫</span>
          <div>
            <span className="font-bold accent-gold">No Third-Party Sharing</span>
            <p className="mt-2 text-silver-300 text-sm">We never sell or share your data with advertisers or third parties.</p>
          </div>
        </li>
      </ul>
      <p className="mt-8 text-center text-gold font-semibold text-lg">
        Finlyst keeps your data secure — so you can focus on your goals, not your worries.
      </p>
    </Section>
  );
}
