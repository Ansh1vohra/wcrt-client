'use client'
import { useState, FormEvent } from 'react'

export default function Comments() {
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log({ comment, name, email, website, saveInfo })
  }

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-8">Leave a Reply</h2>
      <p className="text-gray-600 mb-4">
        Your email address will not be published. Required fields are marked <span className="text-red-600">*</span>
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="comment" className="block text-gray-700 mb-2">
            Comment <span className="text-red-600">*</span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full border rounded-lg p-3 min-h-[150px]"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg p-3"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="website" className="block text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="save-info"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="save-info" className="text-gray-700">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>
        
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          Post Comment
        </button>
      </form>
    </section>
  )
}