export default function HomePage() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden -z-11">
      {/* Background Video */}
      <video
        className="fixed w-auto min-w-full min-h-full max-w-none object-cover -z-10"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay for dim effect */}
      <div className="fixed inset-0 bg-black/50 -z-5"></div>

      {/* Content */}
      <div className="relative z-10 text-white">
        <h1 className="text-6xl font-bold mb-4">Hi, I’m Shahan</h1>
        <p className="text-2xl">Developer • Designer • Creator</p>
      </div>
    </section>
  );
}
