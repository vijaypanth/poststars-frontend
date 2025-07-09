export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Poststars</h1>
      <p className="mb-6 text-lg">Automate your social media content generation with AI Agents.</p>
      <div className="flex space-x-4">
        <a href="/login" className="bg-white text-purple-700 px-6 py-2 rounded font-semibold hover:bg-purple-100 transition">Login</a>
        <a href="/signup" className="bg-transparent border border-white px-6 py-2 rounded font-semibold hover:bg-white hover:text-purple-700 transition">Sign Up</a>
      </div>
    </main>
  )
}
