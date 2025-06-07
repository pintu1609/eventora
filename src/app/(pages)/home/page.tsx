"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCalendarCheck, FaQrcode, FaUsers } from "react-icons/fa";

export default function Home() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-purple-100 py-24 px-6 md:px-20 min-h-screen">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6"
        >
          Plan Events Like a Pro with <span className="text-purple-600">Eventora</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-700 mb-10"
        >
          From guest lists to QR check-ins, we make every step seamless — so you can focus on the magic, not the mess.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-purple-700 transition-all duration-300">
            Get Started
          </button>
          <button className="bg-white text-purple-600 border border-purple-600 px-6 py-3 rounded-lg text-lg hover:bg-purple-50 transition-all duration-300">
            Learn More
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Feature
            icon={<FaCalendarCheck size={30} className="text-blue-600" />}
            title="Effortless Planning"
            description="Create, manage, and organize events in just a few clicks."
          />
          <Feature
            icon={<FaQrcode size={30} className="text-green-600" />}
            title="Smart Check-In"
            description="Generate QR codes for every guest — scan and go!"
          />
          <Feature
            icon={<FaUsers size={30} className="text-pink-600" />}
            title="Real-Time Guest Tracking"
            description="Monitor entry status, live — no spreadsheets required."
          />
        </motion.div>
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
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-3">
        {icon}
        <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
