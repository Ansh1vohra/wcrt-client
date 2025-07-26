"use client";

import React, { useState, useEffect } from "react";
// APLC – Advance POSH Practice & Law Certification content moved from promex
// (removed duplicate React import)
import Link from "next/link";

export default function JoinUs() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleBackdropClick = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    if (activeDropdown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeDropdown]);

  return (
    <div className="px-8">
      <h1 className="text-4xl font-bold mb-6 text-pink-700">Join Us</h1>
      <p className="mb-4 text-lg">
        Become a part of the Women & Child Rights Trust (WCRT) community and
        contribute to advancing gender justice and child rights across India. We
        welcome passionate individuals to join our mission and make a difference.
      </p>

      {/* Backdrop */}
      {activeDropdown && (
        <div
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-40"
          onClick={handleBackdropClick}
        />
      )}

      {/* Join Us Dropdown */}
      {activeDropdown === "join" && (
        <div className="fixed top-[73px] left-0 w-full h-[50vh] z-50 flex">
          <div className="w-1/3 bg-white p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-light mb-6 leading-tight text-pink-700">
              Join us
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Seeking creative collaborators to push us in exciting, new
              directions.
            </p>
          </div>
          <div className="w-2/3 bg-gray-100 p-12 flex items-center">
            <div className="max-w-2xl">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <a
                    href="#"
                    className="block text-xl font-light mb-4 underline hover:no-underline transition-all"
                  >
                    Current opportunities
                  </a>
                  <a
                    href="#"
                    className="block text-xl font-light mb-4 underline hover:no-underline transition-all"
                  >
                    Inclusion & belonging
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="block text-xl font-light mb-4 underline hover:no-underline transition-all"
                  >
                    Work at Weber
                  </a>
                  <a
                    href="#"
                    className="block text-xl font-light mb-4 underline hover:no-underline transition-all"
                  >
                    Employee stories
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Dropdown */}
      {activeDropdown === "connect" && (
        <div className="fixed top-[73px] left-0 w-full h-[50vh] z-50 flex">
          <div className="w-1/3 bg-white p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-light mb-4 leading-tight text-pink-700">
              Connect
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Ready to join us? Explore opportunities today.
            </p>
          </div>
          <div className="w-2/3 bg-gray-100 p-8 flex items-center overflow-y-auto">
            {/* Form content here */}
          </div>
        </div>
      )}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">
          Opportunities to Join
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Volunteer with Us:</strong> Support our initiatives and events
            by contributing your time and skills.
          </li>
          <li>
            <strong>Internships:</strong> Gain valuable experience in social work,
            legal research, and advocacy.
          </li>
          <li>
            <strong>Collaborate:</strong> Partner with us on projects that align
            with our mission.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">
          Why Join WCRT?
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Be part of a nationally recognized organization dedicated to gender
            justice and child rights.
          </li>
          <li>
            Work with a passionate, mission-driven team making real impact across
            India.
          </li>
          <li>
            Contribute to meaningful projects that create safer, more inclusive
            workplaces and communities.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Get Involved</h2>
        <p className="mb-4">
          To join us, please contact us directly for submission of your resume:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <button
              onClick={() => handleDropdownToggle("join")}
              className="text-blue-700 underline"
            >
              Join Us Dropdown
            </button>
          </li>
          <li>
            <button
              onClick={() => handleDropdownToggle("connect")}
              className="text-blue-700 underline"
            >
              Connect Dropdown
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
}
