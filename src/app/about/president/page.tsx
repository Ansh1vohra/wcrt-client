'use client'

import Link from 'next/link'

// Import animations
import '../about-animations.css'

export default function PresidentPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            {/* Hero Section */}
            <section className="relative mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                    <div className="animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-800">
                            Pradeep Kumar
                        </h1>
                        <div className="mb-6">
                            <h2 className="text-2xl text-wcrt-orange font-semibold mb-2">President, Woman and Child Rights Trust</h2>
                            <p className="text-gray-600 text-lg mb-4">Social Impact | Women's Rights Advocacy | Legal Empowerment | Debt Syndication | Private Equity</p>
                            <p className="text-gray-700">(B.Com, M.Com, Advocate, Supreme Court of India)</p>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Visionary Leader in Social Transformation</h3>
                            <div className="w-20 h-1 bg-wcrt-orange mb-4"></div>
                        </div>
                        <div className="flex gap-4 mt-4">
                            <Link href="mailto:pradeep.adv@hotmail.com" className="px-4 py-2 bg-wcrt-gradient text-white rounded-lg flex items-center gap-2 shadow-warm hover:shadow-glow transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact
                            </Link>
                            <Link href="tel:+919999944807" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +91-9999944807
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="mb-16">
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12 relative animate-scale-in">
                    <div className="text-6xl text-wcrt-orange opacity-20 absolute top-4 left-8">"</div>
                    <blockquote className="text-xl md:text-2xl text-gray-700 italic relative z-10 pl-4">
                        As President, I envision a society where every woman and child is empowered to dream fearlessly, 
                        rise boldly, and contribute meaningfully to our nation's progress. With collective resolve and 
                        compassionate action, we can build a legacy of justice, dignity, and hope for generations to come.
                    </blockquote>
                    <div className="text-6xl text-wcrt-orange opacity-20 absolute bottom-4 right-8">"</div>
                    <p className="text-right mt-6 text-gray-600 font-medium">— Pradeep Kumar, Adv Supreme Court of India</p>
                </div>
            </section>

            {/* Areas of Focus */}
            <section className="mb-16">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">Areas of Focus</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100 animate-scale-in" style={{animationDelay: '0.1s'}}>
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-wcrt-circle flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wcrt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Philanthropy with Purpose</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            As President, driven by an unwavering belief in the transformative power of philanthropy. 
                            Under his stewardship, the trust has become a catalyst for social change, channeling resources, 
                            expertise, and compassion to those most in need.
                        </p>
                        <p className="text-gray-600">
                            He has spearheaded large-scale initiatives in education, healthcare, and livelihood generation, 
                            ensuring that interventions deliver sustainable, measurable impact.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100 animate-scale-in" style={{animationDelay: '0.2s'}}>
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-wcrt-circle flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wcrt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Championing Women's Empowerment</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            His core mission is to advance the cause of women's rights, safety, and socio-economic empowerment. 
                            Through strategic collaborations, the trust has launched landmark programs in women's legal literacy, 
                            access to justice, financial inclusion, and entrepreneurial skill-building.
                        </p>
                        <p className="text-gray-600">
                            He has initiated and nurtured mentorship networks, legal aid clinics, and gender sensitization campaigns—helping 
                            women break cycles of disadvantage and reclaim their agency.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100 animate-scale-in" style={{animationDelay: '0.3s'}}>
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-wcrt-circle flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wcrt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Advocate for Gender Justice and Inclusion</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            With a deep understanding of the barriers women face, he has worked tirelessly to dismantle discriminatory 
                            structures through policy advocacy, capacity-building workshops, and public awareness drives on women's rights, 
                            gender equality, and workplace safety (POSH compliance).
                        </p>
                        <p className="text-gray-600">
                            He believes that empowering women uplifts entire communities; hence, the trust consistently prioritizes 
                            girls' education, health, and leadership development.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100 animate-scale-in" style={{animationDelay: '0.4s'}}>
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-wcrt-circle flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wcrt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Driving Impactful Partnerships and Social Innovation</h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                            He has cultivated strong alliances with judiciary, senior legal luminaries, government bodies, 
                            and international NGOs—expanding the trust's reach and influence.
                        </p>
                        <p className="text-gray-600">
                            By fostering public-private partnerships, leveraging technology, and adopting evidence-based best practices, 
                            the trust continues to innovate for greater social impact and systemic change.
                        </p>
                    </div>
                </div>
            </section>

            {/* Additional Section */}
            <section className="mb-16">
                <div className="bg-white p-8 rounded-xl shadow-warm border border-gray-100 animate-fade-in">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Commitment to Transparency and Good Governance</h3>
                    <p className="text-gray-600 mb-4">
                        Pradeep Kumar is committed to the highest standards of governance, ensuring that every rupee entrusted 
                        to the organization is accounted for and maximized for public good.
                    </p>
                    <p className="text-gray-600">
                        The trust's philanthropic model is built on integrity, accountability, and the principles of inclusive leadership, 
                        empowering every stakeholder—especially women and the marginalized—to shape its mission.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section>
                <div className="bg-wcrt-gradient rounded-2xl p-10 text-center text-white animate-scale-in">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Connect with President Pradeep Kumar</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        For speaking engagements, consultations, or to learn more about WCRT's initiatives.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="mailto:pradeep.adv@hotmail.com" className="px-6 py-3 bg-white text-wcrt-orange font-semibold rounded-lg hover:bg-gray-100 transition-all">
                            pradeep.adv@hotmail.com
                        </Link>
                        <Link href="tel:+919999944807" className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-wcrt-orange transition-all">
                            +91-9999944807
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
