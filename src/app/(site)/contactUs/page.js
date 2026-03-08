"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";

const ContactUs = () => {
  const [openIndex, setOpenIndex] = useState(1);

  const faqs = [
    "Figma ipsum component variant main layer.?",
    "Figma ipsum component variant main layer.?",
    "Figma ipsum component variant main layer.?",
    "Figma ipsum component variant main layer.?",
    "Figma ipsum component variant main layer.?",
    "Figma ipsum component variant main layer.?",
  ];

  return (
    <div className="font-raleway bg-white ">
      <div className="container mx-auto px-10">
        <div className=" py-10">
          <h1 className="text-4xl">Contact Us</h1>
        </div>

        {/* Get in Touch Section */}
        <section className="flex flex-col md:flex-row  items-stretch  gap-12 pb-20 container mx-auto">
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold mb-2">Get in Touch</h3>
            <p className="text-xs text-gray-500 mb-8">
              Have a question or need assistance? Fill out the form below and
              our team will get back to you as soon as possible.
            </p>

            <form className="space-y-6">
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 p-3 outline-none focus:border-black transition"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-200 p-3 outline-none focus:border-black transition"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                  How can we help
                </label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-200 p-3 outline-none focus:border-black transition"
                ></textarea>
              </div>
              <button className="border border-gray-300 px-8 py-2 rounded-full text-[10px] font-bold hover:bg-black hover:text-white transition">
                Let Us Know
              </button>
            </form>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/contact/contact1.jpg"
              alt="Contact"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
        </section>

        {/* Other Ways Section */}
        <section className="bg-[#f2e9d9] py-16 px-10">
          <div className="container mx-auto">
            <h3 className="text-xl font-bold mb-10">Other Ways to Reach Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex items-start gap-4">
                <Mail size={20} />
                <div>
                  <h5 className="font-bold text-sm">Email</h5>
                  <p className="text-xs text-gray-600">seoulmirage@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={20} />
                <div>
                  <h5 className="font-bold text-sm">Phone</h5>
                  <p className="text-xs text-gray-600">+82 2 123 4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={20} />
                <div>
                  <h5 className="font-bold text-sm">Address</h5>
                  <p className="text-xs text-gray-600">
                    123 Beauty Lane, Gangnam, Seoul, South Korea
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="flex flex-col md:flex-row items-stretch py-20  container mx-auto">
          <div className="md:w-2/5">
            <img
              src="/images/contact/contact2.jpg"
              alt="FAQ"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-3/5 p-10 md:p-20">
            <h3 className="text-2xl font-serif mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-gray-500 mb-10">
              Find answers to our most commonly asked questions.
            </p>

            <div className="border-t border-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? -1 : index)
                    }
                    className="w-full flex items-center justify-between py-5 text-left transition hover:text-gray-600"
                  >
                    <span className="text-[13px] font-bold text-gray-800">
                      {faq}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="pb-5 text-[11px] text-gray-500 leading-relaxed animate-in fade-in slide-in-from-top-1">
                      Figma ipsum component variant main layer. Line ellipse
                      object list undo rectangle duplicate editor distribute
                      overflow. Arrow pen union device share scrolling style.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
