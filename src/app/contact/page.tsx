"use client"
import React from "react";
import { ReactTyped } from "react-typed";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from "lucide-react";

// Reuse same card styling as projects.tsx
const cardClassNames =
  "box-card bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl rounded-2xl transition-transform transform hover:scale-105 hover:shadow-2xl";

export default function ContactPage() {
  const contacts = [
    {
      icon: <Mail className="w-8 h-8 text-orange-400" />,
      title: "Email",
      detail: "prince47khan@gmail.com",
    },
    {
      icon: <Phone className="w-8 h-8 text-green-400" />,
      title: "Phone",
      detail: "+91-9239999852",
    },
    {
      icon: <MapPin className="w-8 h-8 text-red-400" />,
      title: "Location",
      detail: "Kolkata, WB, India",
    },
    {
      icon: <Github className="w-8 h-8 text-black-400" />,
      title: "Github",
      detail: "github.com/shahankhan47",
    },
    {
      icon: <Instagram className="w-8 h-8 text-pink-600" />,
      title: "Instagram",
      detail: "instagram.com/khan_shahan47",
    },
    {
      icon: <Linkedin className="w-8 h-8 text-blue-400" />,
      title: "LinkedIn",
      detail: "linkedin.com/in/shahan-ali-khan-74a674170/",
    },
  ];

  return (
    <section className="min-h-screen bg-white text-white relative p-10">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover"
        src="/videos/background.mp4" // replace with your actual video path
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Optional overlay for better text readability */}
      <div className="fixed inset-0 bg-black/50"></div>
      {/* Contact heading with ReactTyped */}
      <h2 className="relative text-4xl font-bold text-center mb-12 text-white z-20">
        <ReactTyped
          strings={["Get in Touch", "Contact Me"]}
          typeSpeed={50}
          backSpeed={30}
          loop
        />
      </h2>

      {/* Contact cards */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-20">
        {contacts.map((contact, index) => (
          <div key={index} className={cardClassNames}>
            <div className="flex flex-col items-center justify-center p-8">
              {contact.icon}
              <h3 className="mt-4 text-xl font-semibold text-white">
                {contact.title}
              </h3>
              <p className="mt-2 text-gray-300">{contact.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
