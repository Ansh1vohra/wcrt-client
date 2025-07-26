'use client'

import Image from "next/image"
import Link from 'next/link'

// Import animations
import '../about-animations.css'

export default function PoshAdvocatesPage() {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative mb-16">
                <div className="text-center animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pink-500">
                        <span className="text-pink-500">POSH</span> Advocates Training
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        Specialized training programs for advocates on Prevention of Sexual Harassment (POSH) at workplace, 
                        equipping legal professionals with the knowledge and skills to implement effective POSH measures.
                    </p>
                </div>
            </section>

            {/* Training Overview */}
            <section className="mb-16">
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12 animate-scale-in">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Training Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-wcrt-orange">Comprehensive POSH Understanding</h3>
                            <p className="text-gray-700 mb-6">
                                Our training provides advocates with an in-depth understanding of the Sexual Harassment 
                                of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. Participants 
                                learn about the legal framework, its implementation, and best practices for ensuring 
                                workplace safety.
                            </p>
                            <h3 className="text-xl font-bold mb-4 text-wcrt-orange">Practical Application</h3>
                            <p className="text-gray-700">
                                Through case studies, role-plays, and interactive sessions, advocates develop practical 
                                skills in handling POSH complaints, conducting inquiries, and providing sound legal advice 
                                to organizations and Internal Committees.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-wcrt-orange">Program Benefits</h3>
                            <ul className="text-gray-700 space-y-3">
                                <li className="flex items-start">
                                    <div className="w-5 h-5 rounded-full bg-wcrt-orange flex items-center justify-center mt-1 mr-3">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    <span>Expert insights from seasoned POSH practitioners and legal experts</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-5 h-5 rounded-full bg-wcrt-orange flex items-center justify-center mt-1 mr-3">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    <span>Certification recognized by industry leaders and organizations</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-5 h-5 rounded-full bg-wcrt-orange flex items-center justify-center mt-1 mr-3">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    <span>Networking opportunities with peers and POSH professionals</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-5 h-5 rounded-full bg-wcrt-orange flex items-center justify-center mt-1 mr-3">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    <span>Continuous support and resources after program completion</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Modules */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">Program Modules</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100 animate-scale-in" style={{animationDelay: '0.1s'}}>
                        <div className="w-12 h-12 rounded-full bg-wcrt-circle flex items-center justify-center mb-6">
                            <span className="text-wcrt-orange text-xl font-bold">01</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Legal Framework & Context</h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>• Understanding the POSH Act and its legal implications</li>
                            <li>• International standards and comparative frameworks</li>
                            <li>• Key definitions and scope under the Act</li>
                            <li>• Rights and responsibilities of various stakeholders</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100 animate-scale-in" style={{animationDelay: '0.2s'}}>
                        <div className="w-12 h-12 rounded-full bg-wcrt-circle flex items-center justify-center mb-6">
                            <span className="text-wcrt-orange text-xl font-bold">02</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Complaint Handling & Investigation</h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>• Procedures for receiving and recording complaints</li>
                            <li>• Conducting fair and thorough investigations</li>
                            <li>• Evidence collection and documentation</li>
                            <li>• Confidentiality protocols and witness handling</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100 animate-scale-in" style={{animationDelay: '0.3s'}}>
                        <div className="w-12 h-12 rounded-full bg-wcrt-circle flex items-center justify-center mb-6">
                            <span className="text-wcrt-orange text-xl font-bold">03</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Internal Committee Formation & Functioning</h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>• IC composition and member qualifications</li>
                            <li>• Roles and responsibilities of IC members</li>
                            <li>• Best practices for conducting IC proceedings</li>
                            <li>• Documentation and record-keeping requirements</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100 animate-scale-in" style={{animationDelay: '0.4s'}}>
                        <div className="w-12 h-12 rounded-full bg-wcrt-circle flex items-center justify-center mb-6">
                            <span className="text-wcrt-orange text-xl font-bold">04</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Report Writing & Implementation</h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>• Structuring comprehensive investigation reports</li>
                            <li>• Formulating appropriate recommendations</li>
                            <li>• Implementation strategies and follow-up procedures</li>
                            <li>• Handling appeals and legal challenges</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section>
                <div className="bg-wcrt-gradient rounded-2xl p-10 text-center text-white animate-scale-in">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Next Training Program</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        Enhance your legal expertise and contribute to creating safer workplaces across India. 
                        Our next POSH Advocates Training program is now open for registrations.
                    </p>
                    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        Please fill out the form in the CONNECT section for more details.
                    </p>
                </div>
            </section>

            {/* Pankaj Jha Profile Section */}
            <section className="relative mb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">POSH Advocates</h1>
                    <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100 animate-fade-in">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Pankaj Jha, LLM, LLB, M.Com, PGDBM</h2>
                        <h3 className="text-xl text-wcrt-orange font-semibold mb-2">Executive Committee Member</h3>
                        <p className="text-gray-600 mb-4">Women & Child Rights Trust</p>
                        <p className="text-gray-600 mb-4">Email: <a href="mailto:pankaj@wcrt.in" className="text-wcrt-orange">pankaj@wcrt.in</a></p>
                        <p className="text-gray-600 mb-4">Mobile: <a href="tel:+919210655760" className="text-wcrt-orange">+91-9210655760</a></p>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Profile Overview</h3>
                        <p className="text-gray-600 mb-4">
                            Pankaj Jha is a dedicated legal professional and devotes significant time to pro bono legal support for women facing dowry harassment, domestic violence, workplace discrimination, and other gender-based injustices. He has represented and guided women through complex legal procedures, ensuring access to justice for those most in need. Through community workshops and outreach, he actively educates women about their legal rights and remedies.
                        </p>
                        <p className="text-gray-600 mb-4">
                            He is a published researcher on contemporary legal issues and appears regularly before the Delhi High Court and district courts, with expertise in family law and women’s rights.
                        </p>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Core Strengths & Expertise</h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>• Pro bono legal support for women: Dowry, domestic violence, and workplace harassment</li>
                            <li>• Litigation & Representation: Family and commercial law in High Courts and lower courts</li>
                            <li>• Legal Education & Outreach: Rights awareness, legal counseling, and advocacy for vulnerable women</li>
                            <li>• Corporate Compliance & Taxation: Advisory on GST, income tax, and regulatory matters</li>
                            <li>• Digital Legal Solutions: Leveraging technology for case management and outreach</li>
                        </ul>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Commitment to WCRT’s Mission</h3>
                        <p className="text-gray-600 mb-4">
                            Pankaj Jha is committed to making justice accessible for women and children—working tirelessly to eradicate dowry, combat domestic violence, and empower women through the law. His voluntary legal efforts and advocacy exemplify his belief in equality, dignity, and social transformation.
                        </p>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Languages & Interests</h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>• Languages: English, Hindi, Maithili</li>
                            <li>• Interests: Women’s legal empowerment, community service, legal research, social impact</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}
