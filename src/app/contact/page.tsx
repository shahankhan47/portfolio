export default function ContactPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-10">
      <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
      <p className="mb-4">You can reach me via email at <span className="text-blue-400">youremail@example.com</span></p>
      <div className="flex space-x-6">
        <a href="#" className="hover:text-blue-400">LinkedIn</a>
        <a href="#" className="hover:text-blue-400">GitHub</a>
        <a href="#" className="hover:text-blue-400">Twitter</a>
      </div>
    </section>
  );
}
