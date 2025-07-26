"use client";

import React from "react";
// APLC – Advance POSH Practice & Law Certification content moved from promex
// (removed duplicate React import)
import Link from "next/link";

export default function JoinUs() {
  return (
    <div className="px-8">
      <h1 className="text-4xl font-bold mb-6 text-pink-700">Join Us</h1>
      <p className="mb-4 text-lg">Become a part of the Women & Child Rights Trust (WCRT) community and contribute to advancing gender justice and child rights across India. We welcome passionate individuals to join our mission and make a difference.</p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Opportunities to Join</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Volunteer with Us:</strong> Support our initiatives and events by contributing your time and skills.
          </li>
          <li>
            <strong>Internships:</strong> Gain valuable experience in social work, legal research, and advocacy.
          </li>
          <li>
            <strong>Collaborate:</strong> Partner with us on projects that align with our mission.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Why Join WCRT?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Be part of a nationally recognized organization dedicated to gender justice and child rights.</li>
          <li>Work with a passionate, mission-driven team making real impact across India.</li>
          <li>Contribute to meaningful projects that create safer, more inclusive workplaces and communities.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Get Involved</h2>
        <p className="mb-4">To join us, please fill out the relevant forms below:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a href="https://forms.gle/DL2REUtYAV77ptXD6" className="text-blue-700 underline">Apply for Internships</a>
          </li>
          <li>
            <a href="https://forms.gle/DL2REUtYAV77ptXD6" className="text-blue-700 underline">Volunteer with Us</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
