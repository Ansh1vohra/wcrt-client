"use client";

import React from "react";

const exams = [
  {
    name: "APLC – Advance POSH Practice & Law Certification",
    description: "Professional Certification on the Prevention of Sexual Harassment at Workplace Act, 2013 (POSH) for female legal/CS professionals and senior female officers.",
  },
  // Add more exams here as needed
];

export default function Exam() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-pink-700">Exams Offered by WCRT</h1>
      <ul className="mb-8 list-disc pl-6">
        {exams.map((exam, idx) => (
          <li key={idx} className="mb-2">
            <span className="font-semibold text-pink-700">{exam.name}</span>: {exam.description}
          </li>
        ))}
      </ul>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">APLC – Advance POSH Practice & Law Certification Details</h2>
        <p className="mb-2 font-semibold">Women & Child Rights Trust (WCRT)</p>
        <p className="mb-2">C-84, Sector 2 Noida Uttar Pradesh India</p>
        <h3 className="text-xl font-bold mb-2 text-pink-600">Programme Overview</h3>
        <ul className="list-disc pl-6 mb-2">
          <li>Professional Certification on the Prevention of Sexual Harassment at Workplace Act, 2013 (POSH), designed exclusively for:</li>
          <li>Female Advocates (enrolled with any State Bar Council in India)</li>
          <li>Female Company Secretaries (ACS/FCS, ICSI Members)</li>
          <li>Female Class A Officers (Retired/Serving; IAS, IPS, IRS, IFS, etc.)</li>
        </ul>
        <p>This comprehensive programme will equip participants with the knowledge, skills, and practical exposure to serve as External Members of POSH Internal Committees, Complaint Designers, POSH Trainers, and IC Report Writers. The course aligns with the requirements of the POSH Act, 2013, and is ideal for those seeking advanced expertise and credentials in workplace gender justice and legal compliance.</p>

        <h3 className="text-xl font-bold mb-2 text-pink-600 mt-6">Eligibility Criteria</h3>
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

        <h3 className="text-xl font-bold mb-2 text-pink-600 mt-6">Admission Process</h3>
        <ol className="list-decimal pl-6 mb-2">
          <li>Application Submission: Fill out the application at <a href="https://www.wcrt.in" className="text-blue-700 underline">www.wcrt.in</a></li>
          <li>Entrance Examination: All applicants must clear the WCRT POSH Entrance Exam (Online/Offline).
            <ul className="list-disc pl-6">
              <li>Exam Fee: ₹3,100 (non-refundable)</li>
              <li>Exam Pattern: 90 minutes, 100 marks (Objective)
                <ul className="list-disc pl-6">
                  <li>General Awareness: Women’s Rights, Gender Sensitization, Workplace Safety</li>
                  <li>Child Protection Laws & Practical Scenarios</li>
                  <li>Indian Constitution & Human Rights</li>
                  <li>Aptitude and English</li>
                  <li>Case Study Analysis</li>
                </ul>
              </li>
              <li>Passing marks: 60%</li>
            </ul>
          </li>
          <li>Shortlisting & Personal Interview: Qualifying candidates will be called for a short interview (online/offline).</li>
          <li>Admission Confirmation: Upon selection, the full programme fee to be deposited.</li>
        </ol>

        <h3 className="text-xl font-bold mb-2 text-pink-600 mt-6">Fee Structure</h3>
        <table className="min-w-full border border-gray-300 text-left text-sm mb-2">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Description</th>
              <th className="px-4 py-2 border border-gray-300">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Entrance Exam Fee</td>
              <td className="px-4 py-2 border border-gray-300">₹3,100</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">Course Fee (Full)</td>
              <td className="px-4 py-2 border border-gray-300">₹52,000</td>
            </tr>
            <tr className="font-bold">
              <td className="px-4 py-2 border border-gray-300">TOTAL</td>
              <td className="px-4 py-2 border border-gray-300">₹55,100</td>
            </tr>
          </tbody>
        </table>
        <ul className="list-disc pl-6 text-sm">
          <li>Includes all classes, course materials, case studies, access to e-library, and certification.</li>
          <li>Installment options available upon request.</li>
          <li>Fee waivers for economically disadvantaged/retired officers at the discretion of the Trust.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-pink-600 mt-6">Programme Duration & Format</h3>
        <ul className="list-disc pl-6">
          <li>Duration: 4 Months (16 Weeks)</li>
          <li>Mode: Hybrid (Online + Onsite at Noida C-84)</li>
          <li>Total Classes: 60 (90 minutes per class)</li>
          <li>Attendance: Minimum 75% attendance required for certification.</li>
          <li>Assessment: Ongoing assignments, final exam, and viva voce.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-pink-600 mt-6">Course Modules & Subjects</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left text-xs md:text-sm">
            <thead className="bg-gray-100 font-semibold">
              <tr>
                <th className="px-2 py-1 border border-gray-300">S.No</th>
                <th className="px-2 py-1 border border-gray-300">Module/Subject</th>
                <th className="px-2 py-1 border border-gray-300">Topics Covered</th>
                <th className="px-2 py-1 border border-gray-300">No. of Classes</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border px-2 py-1">1</td><td className="border px-2 py-1">Introduction & Background of POSH Act</td><td className="border px-2 py-1">History, International Norms, Key Definitions, Applicability</td><td className="border px-2 py-1">3</td></tr>
              <tr><td className="border px-2 py-1">2</td><td className="border px-2 py-1">Gender Sensitization & Workplace Culture</td><td className="border px-2 py-1">Gender Roles, Sensitivity Training, Diversity and Inclusion</td><td className="border px-2 py-1">3</td></tr>
              <tr><td className="border px-2 py-1">3</td><td className="border px-2 py-1">Institutional Framework under POSH</td><td className="border px-2 py-1">IC Constitution, Roles, Employer Duties, External Member’s Role</td><td className="border px-2 py-1">4</td></tr>
              <tr><td className="border px-2 py-1">4</td><td className="border px-2 py-1">Complaint Drafting & Receipt</td><td className="border px-2 py-1">Complaint Formats, Online/Offline Filings, Anonymous Complaints</td><td className="border px-2 py-1">4</td></tr>
              <tr><td className="border px-2 py-1">5</td><td className="border px-2 py-1">Inquiry Procedure & Evidence Gathering</td><td className="border px-2 py-1">Inquiry Steps, Evidence Types, Cross Examination, Interim Measures</td><td className="border px-2 py-1">6</td></tr>
              <tr><td className="border px-2 py-1">6</td><td className="border px-2 py-1">Principles of Natural Justice</td><td className="border px-2 py-1">Legal Principles, Due Process, Ensuring Fairness, Bias Avoidance</td><td className="border px-2 py-1">3</td></tr>
              <tr><td className="border px-2 py-1">7</td><td className="border px-2 py-1">Report Writing & Recommendations</td><td className="border px-2 py-1">IC Report Format, Legal Writing, Findings & Orders, Drafting Orders</td><td className="border px-2 py-1">5</td></tr>
              <tr><td className="border px-2 py-1">8</td><td className="border px-2 py-1">Redressal Mechanism & Enforcement</td><td className="border px-2 py-1">Interim Relief, Final Relief, Disciplinary Action, Appeal Procedure</td><td className="border px-2 py-1">4</td></tr>
              <tr><td className="border px-2 py-1">9</td><td className="border px-2 py-1">Case Law & Landmark Judgements</td><td className="border px-2 py-1">Supreme Court & High Court Precedents, Analysis of Notable Cases</td><td className="border px-2 py-1">4</td></tr>
              <tr><td className="border px-2 py-1">10</td><td className="border px-2 py-1">Ethics, Confidentiality & Retaliation</td><td className="border px-2 py-1">Confidentiality, Non-Retaliation, Victim/Witness Protection</td><td className="border px-2 py-1">3</td></tr>
              <tr><td className="border px-2 py-1">11</td><td className="border px-2 py-1">Digital Compliance & E-Tools</td><td className="border px-2 py-1">Digital Record Keeping, e-Complaint Tools, Online IC Meetings</td><td className="border px-2 py-1">3</td></tr>
              <tr><td className="border px-2 py-1">12</td><td className="border px-2 py-1">Practical Workshops & Mock Hearings</td><td className="border px-2 py-1">Role-Play, Drafting Exercises, Mock Inquiries, Sample Reports</td><td className="border px-2 py-1">6</td></tr>
              <tr><td className="border px-2 py-1">13</td><td className="border px-2 py-1">Trainer & Advocacy Skills</td><td className="border px-2 py-1">POSH Training Methodology, Policy Drafting, Sensitization Workshops</td><td className="border px-2 py-1">4</td></tr>
              <tr><td className="border px-2 py-1">14</td><td className="border px-2 py-1">Child Safety Laws & Intersection with POSH</td><td className="border px-2 py-1">Child Labour, POCSO, Child Witness Protection, Child-Friendly IC</td><td className="border px-2 py-1">3</td></tr>
              <tr><td className="border px-2 py-1">15</td><td className="border px-2 py-1">Special Focus: Women & Marginalized Groups</td><td className="border px-2 py-1">Intersectionality, Protection for LGBTQ+, Disabled, Contract Workers</td><td className="border px-2 py-1">3</td></tr>
              <tr><td className="border px-2 py-1">16</td><td className="border px-2 py-1">Assessment & Viva Voce</td><td className="border px-2 py-1">Written Test, Oral Exam, Practical Assignment</td><td className="border px-2 py-1">3</td></tr>
              <tr className="font-bold"><td colSpan={3} className="border px-2 py-1 text-right">TOTAL</td><td className="border px-2 py-1 font-bold">60</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold mb-2 text-pink-600 mt-6">Learning Outcomes & Certification</h3>
        <ul className="list-disc pl-6">
          <li>Receive a Professional Certification as POSH Internal Committee Member & External Expert (WCRT Certified).</li>
          <li>Be eligible for appointment as an External Member on Internal Committees (ICs) under POSH Act, 2013.</li>
          <li>Gain proficiency in complaint drafting, IC inquiry process, report writing, and POSH compliance audits.</li>
          <li>Become eligible to conduct POSH awareness and training sessions for corporates, schools, colleges, and government institutions.</li>
          <li>Access lifetime membership to WCRT’s network and continued professional development resources.</li>
        </ul>

        <h3 className="text-xl font-bold mb-2 text-pink-600 mt-6">Contact & Application</h3>
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
