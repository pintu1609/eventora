"use client";

import React from "react";
import { FaBolt, FaLock, FaUserFriends, FaMagic } from "react-icons/fa";

export default function About() {
  return (
    <section className="bg-white py-16 px-6 md:px-20 mt-[-44px]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">🎉 About Us</h2>
        <p className="text-lg text-gray-600 mb-10">
          Welcome to <span className="font-semibold text-blue-600">Eventora</span> – Where Every Moment Matters.
        </p>
        <p className="text-gray-700 text-base md:text-lg mb-8">
         We&rsquo;re not just another event management platform. Eventora is your backstage pass to flawlessly planned, beautifully executed, and truly unforgettable events.
        </p>
        <p className="text-gray-700 text-base md:text-lg mb-12">
          Whether you&rsquo;re throwing a cozy birthday bash or launching a global tech conference, our mission is simple:
          <span className="block font-semibold italic mt-2">&ldquo;You dream it, we manage it.&rdquo;</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          <Feature
            icon={<FaUserFriends size={28} className="text-blue-500" />}
            title="Lightning-Fast Guest Management"
            description="Add, approve, and track guests with ease — no more spreadsheets, no more chaos."
          />
          <Feature
            icon={<FaMagic size={28} className="text-purple-500" />}
            title="One-Click Magic"
            description="Generate QR codes, send invites, and get updates in seconds. Simplicity meets superpowers."
          />
          <Feature
            icon={<FaLock size={28} className="text-red-500" />}
            title="Smart & Secure Entry"
            description="Only verified guests get in. Say goodbye to gatecrashers, and hello to safety."
          />
          <Feature
            icon={<FaBolt size={28} className="text-yellow-500" />}
            title="Built for Speed"
            description="No clutter. No complexity. Just clean, fast tools that work the way you do."
          />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">🥂 Let’s Raise a Toast</h3>
          <p className="text-gray-600">
            Whether you&rsquo;re a pro planner or party starter, Eventora helps you
            <span className="font-semibold text-blue-600"> make memories, not spreadsheets.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
