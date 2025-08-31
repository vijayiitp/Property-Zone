import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white pt-28 overflow-hidden">
      {/* Wave Layers */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[calc(150%+1.3px)] h-[100px]"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z"
            fill="url(#waveGradient1)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="relative block w-[calc(150%+1.3px)] h-[100px] -mt-1"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C400,100 800,0 1200,80 L1200,0 L0,0 Z"
            fill="#0f172a"
            opacity="0.8"
          />
        </svg>
        <svg
          className="relative block w-[calc(150%+1.3px)] h-[100px] -mt-1"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C600,100 600,0 1200,90 L1200,0 L0,0 Z" fill="#000000" />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 lg:px-20 relative z-10 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-orange-500 text-2xl font-extrabold flex items-center gap-2">
              <span className="text-3xl">🏠</span> Property Zone
            </h2>
            <address className="mt-4 not-italic text-gray-400 leading-relaxed">
              59 Beverly Hill Ave, Brooklyn Town, <br />
              New York, NY 5630, CA, US
            </address>
            <p className="mt-2 text-gray-400 hover:text-white transition-colors duration-300">
              +(123) 456-7890
            </p>
            <p className="mt-1 text-gray-400 hover:text-white transition-colors duration-300">
              info@mail.com
            </p>

            <div className="flex gap-3 mt-4 text-orange-500">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 hover:scale-110 transform transition duration-300 cursor-pointer shadow-md"
                  >
                    <Icon />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Footer Links */}
          {[
            {
              title: "Features",
              links: ["Home v1", "Home v2", "About", "Contact", "Search"],
            },
            {
              title: "Information",
              links: [
                "Listing v1",
                "Listing v2",
                "Property Details",
                "Agent List",
                "Agent Profile",
              ],
            },
            {
              title: "Documentation",
              links: ["Blog", "FAQ", "Privacy Policy", "License"],
            },
            {
              title: "Others",
              links: [
                "Log in",
                "Enter OTP",
                "New Password",
                "Reset Password",
                "Create Account",
              ],
            },
          ].map((section, idx) => (
            <div key={idx}>
              <h3 className="font-bold mb-3 text-lg text-orange-400">{section.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, index) => (
                  <li
                    key={index}
                    className="hover:text-orange-400 cursor-pointer transition-colors duration-300"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4 text-sm">
          © {new Date().getFullYear()} Relasto. All rights reserved.
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </footer>
  );
}
