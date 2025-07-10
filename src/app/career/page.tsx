"use client";

import React from "react";
// APLC – Advance POSH Practice & Law Certification content moved from promex
// (removed duplicate React import)
import Link from "next/link";

export default function Career() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-pink-700">Careers at WCRT</h1>
      <h2 className="text-lg font-semibold mb-4">Join Our Mission</h2>
      <p className="mb-4">Women & Child Rights Trust (WCRT) is committed to advancing gender justice and workplace safety across India. We invite passionate professionals to join us in our mission.</p>

      <section className="mb-8">
        <h3 className="text-2xl font-bold mb-2 text-pink-600">Current Opportunity: External Member & POSH Expert</h3>
        <p className="mb-2">WCRT is offering a Professional Certification on the Prevention of Sexual Harassment at Workplace Act, 2013 (POSH), designed exclusively for:</p>
        <ul className="list-disc pl-6 mb-2">
          <li>Female Advocates (enrolled with any State Bar Council in India)</li>
          <li>Female Company Secretaries (ACS/FCS, ICSI Members)</li>
          <li>Female Class A Officers (Retired/Serving; IAS, IPS, IRS, IFS, etc.)</li>
        </ul>
        <p>This comprehensive programme equips participants to serve as External Members of POSH Internal Committees, Complaint Designers, POSH Trainers, and IC Report Writers. It is ideal for those seeking advanced expertise and credentials in workplace gender justice and legal compliance.</p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-2 text-pink-600">Eligibility Criteria</h3>
        <ul className="list-disc pl-6 mb-2">
          <li>Female, aged 25 years and above.</li>
          <li>Minimum qualification:
            <ul className="list-disc pl-6">
              <li>Advocate (enrolled with Bar Council in any state of India)</li>
              <li>OR Company Secretary (ACS/FCS with valid membership)</li>
              <li>OR Retired/serving Female Class A Officer (IAS, IPS, IRS, IFS, Defence, PSU, etc.)</li>
            </ul>
          </li>
          <li className="text-red-600">Note: Males and non-officer class are NOT eligible. Strictly for female legal/CS professionals and senior female officers.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-2 text-pink-600">Why Join WCRT?</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Be part of a nationally recognized organization dedicated to gender justice and child rights.</li>
          <li>Work with a passionate, mission-driven team making real impact across India.</li>
          <li>Opportunities for professional growth, training, and certification in POSH and related fields.</li>
          <li>Access to exclusive workshops, seminars, and a network of legal and social sector experts.</li>
          <li>Contribute to meaningful projects that create safer, more inclusive workplaces and communities.</li>
          <li>Receive ongoing support for your career development and leadership journey.</li>
        </ul>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
          <span className="text-lg font-semibold text-green-700">Ready to make a difference?</span>
          <Link href="/contact">
            <button className="px-6 py-2 bg-pink-600 text-white rounded shadow hover:bg-pink-700 transition-all font-semibold text-base">Contact Us to Apply</button>
          </Link>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-2 text-pink-600">Programme Details</h3>
        <ul className="list-disc pl-6 mb-2">
          <li>Course Fee: ₹52,000 (Entrance Exam Fee: ₹3,100; Total: ₹55,100)</li>
          <li>Includes all classes, course materials, case studies, access to e-library, and certification.</li>
          <li>Installment options available upon request.</li>
          <li>Fee waivers for economically disadvantaged/retired officers at the discretion of the Trust.</li>
          <li>Duration: 4 Months (16 Weeks), Hybrid (Online + Onsite at Noida C-84)</li>
          <li>Total Classes: 60 (90 minutes per class)</li>
          <li>Minimum 75% attendance required for certification.</li>
          <li>Assessment: Ongoing assignments, final exam, and viva voce.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-2 text-pink-600">Learning Outcomes & Certification</h3>
        <ul className="list-disc pl-6">
          <li>Receive a Professional Certification as POSH Internal Committee Member & External Expert (WCRT Certified).</li>
          <li>Be eligible for appointment as an External Member on Internal Committees (ICs) under POSH Act, 2013.</li>
          <li>Gain proficiency in complaint drafting, IC inquiry process, report writing, and POSH compliance audits.</li>
          <li>Become eligible to conduct POSH awareness and training sessions for corporates, schools, colleges, and government institutions.</li>
          <li>Access lifetime membership to WCRT’s network and continued professional development resources.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-bold mb-2 text-pink-600">Contact & Application</h3>
        <ul className="list-disc pl-6 mb-2">
          <li>Website: <a href="https://www.wcrt.in" className="text-blue-700 underline">www.wcrt.in</a></li>
          <li>Email: <a href="mailto:info@wcrt.in" className="text-blue-700 underline">info@wcrt.in</a></li>
          <li>Phone: 011-20893146</li>
          <li>Address: C-84, Women & Child Rights Trust, Noida</li>
        </ul>
        <p className="text-sm">All admissions and course processes are managed by a designated Course Coordinator at WCRT, Noida.</p>
        <p className="mt-2 font-semibold text-green-700">Apply now to become a nationally recognized POSH expert and a certified external member, and lead the way in ensuring safe, inclusive, and equitable workplaces across India.</p>
      </section>
    </div>
  );
}
