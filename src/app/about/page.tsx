import Image from "next/image"

export default function AboutPage() {
    return (
        <div>
            <div className="relative rounded overflow-hidden">
                <Image
                    src="/about.png"
                    width={1200}
                    height={720}
                    alt="About"
                    className="w-full rounded"
                />
                <h1 className="text-2xl absolute top-0 text-white p-4 px-10">About Us</h1>
            </div>
            <section className="py-10 text-lg">
                <p>Women and Child Rights Thrust is a dedicated initiative committed to promoting, protecting, and empowering the rights of women and children across India. We believe that every woman and child deserves to live with dignity, safety, and opportunity, free from discrimination, violence, and marginalization.</p>
                <p>Our mission is to create a just and inclusive society by addressing issues such as gender-based violence, child protection, access to education, health, legal rights, and economic empowerment. Through evidence-based advocacy, community engagement, policy research, and capacity-building programs, we aim to drive systemic change at the grassroots and policy level.</p>
                <p>We work closely with government agencies, civil society organisations, educators, healthcare professionals, legal experts, and local communities to ensure that the voices of women and children are not only heard — but acted upon.</p>
                <p>Since our inception, we have conducted awareness campaigns, legal aid drives, workshops, and outreach programs that have touched the lives of thousands. Whether it’s ensuring safe spaces, facilitating access to justice, or supporting survivors — our efforts are grounded in empathy, resilience, and action.</p>
                <p>At Women and Child Rights Thrust, we believe change begins with awareness and grows through collective responsibility. Join us as we continue to advocate for the rights, safety, and well-being of every woman and child.</p>
            </section>
        </div>
    )
}