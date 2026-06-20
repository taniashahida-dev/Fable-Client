"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { GiBlackBook } from "react-icons/gi";
import { authClient, useSession } from "@/lib/auth-client";
import NavLink from "./NavLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { data } = useSession();
  const user = data?.user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Ebooks", href: "/browse-books" },
    { name: "About", href: "/about" },
  ];
  
  const dashboardLinks = {
    reader: '/dashboard/reader',
    writer: '/dashboard/writer',
    admin: '/dashboard/admin'
  };

  if (user?.email) {
    navLinks.push({
      name: 'Dashboard',
      href: dashboardLinks[user?.role || 'reader']
    });
  }

  const handleLogOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 bg-white ${
        isScrolled ? "border-b border-gray-200/80 shadow-sm" : "border-b border-gray-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-indigo-600 text-3xl font-bold"> <GiBlackBook /></span>
            <span className="text-2xl font-agbalumo font-bold text-slate-900 tracking-tight">Fable</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                href={link.href}
                className="font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center relative"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <p className="text-sm text-slate-600 font-medium">Hello, {user?.name}</p>
                <button 
                  onClick={handleLogOut} 
                  className="border border-gray-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-indigo-600 transition"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/sign-in"
                  className="border border-gray-200 text-slate-800 text-sm font-medium px-5 py-2 rounded-xl hover:bg-gray-50 transition"
                >
                  Log in
                </Link>
                <Link href="/auth/sign-up">
                  <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition">
                    Sign up
                  </button>
                </Link>
              </>
            )} 
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-700"
          >
            {isOpen ? <AiOutlineClose size={24} /> : <IoMenuSharp size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-6" : "max-h-0"}`}>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink key={link.name} href={link.href} className="block text-slate-600 font-medium">
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}