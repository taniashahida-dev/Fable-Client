"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

// import { authClient, useSession } from "@/lib/auth-client";
import NavLink from "./NavLinks";
import { GiBlackBook } from "react-icons/gi";



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // const { data, isPending } = useSession();
  // const user = data?.user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Ebooks", href: "/ebooks" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "/about" },
  ];

  // const handleLogOut = async () => {
  //   await authClient.signOut();
  //   window.location.href = "/";
  // };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white ${
        isScrolled ? "border-b border-gray-200/80 shadow-sm" : "border-b border-gray-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-indigo-600 text-3xl font-bold"> <GiBlackBook  /></span>
            <span className="text-2xl agbalumo font-bold text-slate-900 tracking-tight">Fable</span>
          </Link>

          {/* Desktop Menu Center Links */}
          <div className="hidden md:flex items-center gap-8 h-full">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                href={link.href}
                className=" font-medium text-slate-500 hover:text-slate-900 transition-colors  flex items-center relative"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* {user ? (
              <div className="flex items-center gap-4">
                <p className="text-sm text-slate-600 font-medium">Hello, {user?.name}</p>
                <button 
                  onClick={handleLogOut} 
                  className="border border-gray-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Log Out
                </button>
              </div>
            ) : ( */}
              <>
                <Link
                  href="/sign-in"
                  className="border border-gray-200 text-slate-800 text-sm font-medium px-5 py-2 rounded-xl hover:bg-gray-50 transition"
                >
                  Log in
                </Link>
                <Link href="/sign-up">
                  <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition">
                    Sign up
                  </button>
                </Link>
              </>
            {/* )} */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-700 hover:text-slate-900 focus:outline-none"
          >
            {isOpen ? <AiOutlineClose size={24} /> : <IoMenuSharp size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                href={link.href}
                className="block  text-slate-600 hover:text-slate-900 font-medium transition"
              >
                {link.name}
              </NavLink>
            ))}

            <div className="border-t border-gray-200 pt-3 flex flex-col gap-3">
              {/* {user ? (
                <>
                  <p className="text-sm text-slate-600 font-medium px-2">Hello, {user?.name}</p>
                  <button 
                    onClick={handleLogOut} 
                    className="w-full bg-white border border-gray-200 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
                  >
                    Log out
                  </button>
                </>
              ) : ( */}
                <>
                  <Link
                    href="/sign-in"
                    className="w-full text-center border border-gray-200 text-slate-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
                  >
                    Log in
                  </Link>
                  <Link href="/sign-up" className="w-full">
                    <button className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition">
                      Sign up
                    </button>
                  </Link>
                </>
              {/* )} */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}