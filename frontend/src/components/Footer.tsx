import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-300 overflow-hidden">
      {/* Footer Content */}
      <div className="container mx-auto px-6 py-5 sm:px-10 lg:px-20 relative z-10 animate-fadeIn">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-orange-500 text-2xl font-extrabold flex items-center gap-2">
              <span className="text-3xl">🏠</span> Property Zone
            </h2>
            <address className="mt-4 not-italic text-gray-400 leading-relaxed text-sm sm:text-base">
              59 Beverly Hill Ave, Brooklyn Town, <br />
              New York, NY 5630, CA, US
            </address>
            <p className="mt-2 text-gray-400 hover:text-white transition">
              +(123) 456-7890
            </p>
            <p className="mt-1 text-gray-400 hover:text-white transition">
              info@propertyzone.com
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4 text-orange-500">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-full bg-gray-800 hover:bg-orange-500 hover:text-white hover:scale-110 transform transition duration-300 cursor-pointer shadow-md"
                  >
                    <Icon size={16} />
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
              title: "Account",
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
              <h3 className="font-bold mb-3 text-lg text-orange-400">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
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
        <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-4 text-xs sm:text-sm">
          © {new Date().getFullYear()} Property Zone. All rights reserved.
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
