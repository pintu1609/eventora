"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { useAuthStatus } from "@/frontendHelper/auth";
export default function Navbar() {
    const isAuthenticated = useAuthStatus();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto relative">
        
        {/* Left - Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="text-xl font-bold">
            Eventora
          </Link>
        </div>

        {/* Center - Main Links */}
        <ul className="hidden md:flex gap-6 absolute left-1/2 transform -translate-x-1/2">
          <li>
          <Link href={isAuthenticated ? '/registrationList' : '/'}>
            {isAuthenticated ? 'Registration List' : 'Home'}
          </Link>
        </li>          <li><Link href="/about">About</Link></li>
          <li><Link href="/registartion">Event Registration</Link></li>
          {isAuthenticated && <li><Link href="/scanqr">Scan QR</Link></li>}
        </ul>

        {/* Right - Admin */}
        {!isAuthenticated && (
          <div className="hidden md:flex items-center">
            <Link href="/admin">Admin Login</Link>
          </div>
        )}
        {/* {isAuthenticated && (
          <div className="hidden md:flex items-center">
            <Link href="/scanqr">Scan QR</Link>
          </div>
        )} */}

        {isAuthenticated && (
          <div className="hidden md:flex items-center">
            <button onClick={() => {localStorage.removeItem("token"), window.location.href = "/"}}>Logout</button>
          </div>
        )}

        

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4 text-center bg-blue-500 py-4 rounded-md">
          <li><Link href={isAuthenticated ? '/registrationList' : '/'} onClick={() => setIsOpen(false)}>{isAuthenticated ? 'Registration List' : 'Home'}</Link></li>
          <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link href="/registartion" onClick={() => setIsOpen(false)}>Event Registration</Link></li>
          {isAuthenticated && <li><Link href="/scanqr" onClick={() => setIsOpen(false)}>Scan QR</Link></li>}
                  {!isAuthenticated && (
            <li><Link href="/admin" onClick={() => setIsOpen(false)}>Admin Login</Link></li>
          )}
          {isAuthenticated && (
            <li><button onClick={() => {localStorage.removeItem("token"), window.location.href = "/"}}>Logout</button></li>
          )}
        </ul>
      )}
    </nav>
  );
}
