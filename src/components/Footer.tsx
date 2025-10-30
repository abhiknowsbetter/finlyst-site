export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container-mx py-8 text-center text-sm text-gray-400">
        <div className="mb-2 text-gray-500 font-medium">Follow us</div>
        <div className="mb-4 flex items-center justify-center gap-6">
          <a href="https://x.com/Finlystapp" className="hover:text-white transition" target="_blank" rel="noopener">X (Twitter)</a>
          <a href="https://www.instagram.com/finlyst_app?igsh=MXkyaDN1NHpqdGtrcg==" className="hover:text-white transition" target="_blank" rel="noopener">Instagram</a>
          <a href="https://www.linkedin.com/in/finlystapp" className="hover:text-white transition" target="_blank" rel="noopener">LinkedIn</a>
        </div>
        <p className="text-gray-400 mb-1">
          Write us: <a href="mailto:support@finlystapp.com" className="underline hover:text-white">support@finlystapp.com</a>
        </p>
        <p className="text-gray-500">© 2025 Finlyst by M/s Arthika Ventures. All rights reserved.</p>
      </div>
    </footer>
  );
}
