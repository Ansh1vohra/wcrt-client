'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <div className="mt-12 border-t pt-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200 max-w-2xl w-full">
        <Link href="/" className="block">
          <Image
            src="/wrctlogo.png"
            alt="Women & Child Right Trust"
            width={400}
            height={150}
            className="object-contain mx-auto"
            priority
          />
        </Link>
        <div className="mt-6 text-center">
          <Link 
            href="/support" 
            className="bg-[#FF1493] text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors font-semibold inline-block"
          >
            Support Us
          </Link>
        </div>
      </div>
    </div>
  )
}