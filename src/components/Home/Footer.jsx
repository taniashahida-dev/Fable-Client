import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GiBlackBook } from "react-icons/gi";

export default function Footer() {
  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Browse Ebooks", href: "/ebooks" },
    { name: "Become a Writer", href: "/become-writer" },
    { name: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF size={14} />, href: "#", label: "f" },
    { icon: <FaXTwitter size={14} />, href: "#", label: "x" },
    { icon: <FaLinkedinIn size={14} />, href: "#", label: "in" },
    { icon: <FaInstagram size={14} />, href: "#", label: "ig" },
  ];

  return (
    <footer className="bg-[#0b132a] text-gray-400 font-sans border-t border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2">
               <span className="text-indigo-600 text-3xl font-bold"> <GiBlackBook  /></span>
              <span className="text-3xl agbalumo  font-bold text-white tracking-tight">Fable</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              A digital platform connecting ebook lovers with talented independent writers.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Stay in the loop
            </h4>
            <p className="text-sm text-slate-400">New releases, weekly.</p>
            
            {/* Subscribe Input Group */}
           
              <input
                type="email"
                placeholder="Email address"
             
                className="w-full bg-slate-800/40 text-sm text-white placeholder-slate-500 px-4 py-2.5 rounded-l-lg border border-slate-700/50 focus:outline-none focus:border-slate-600 transition"
              />
              <button
                type="submit"
                className="bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-semibold px-5 rounded-r-lg text-sm transition-colors duration-200"
              >
                Join
              </button>
           
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Fable. All rights reserved.
          </div>
          <div className="italic">
            Made for readers & writers everywhere.
          </div>
        </div>

      </div>
    </footer>
  );
}