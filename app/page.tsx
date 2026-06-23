import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/ChatGPT_Image_May_13__2026__10_26_24_PM-removebg-preview.png')" }}>
        <div className="bg-black bg-opacity-60 p-8 rounded-lg text-center max-w-2xl">
          <p className="text-sm uppercase tracking-widest mb-2">BRAND IDENTITY FOR MARKET LEADERS</p>
          <h1 className="text-5xl font-extrabold mb-4">WE BUILD BRANDS THAT COMMAND THE ROOM.</h1>
          <p className="text-lg mb-6">Identity systems built for founders and executives who don't compete on price.</p>
          <a href="#systems" className="inline-block bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-full transition-colors">VIEW THE SYSTEMS</a>
        </div>
      </section>

      {/* Scroll Reveal Intro */}
      <section className="py-20 px-8 text-center max-w-3xl mx-auto">
        <p className="text-xl">Aesthetic is not enough. To dominate a market, a brand requires structural integrity. At DESOV, we engineer high‑contrast, scalable identity systems that force your competitors into the background. You bring the vision; we build the architecture.</p>
      </section>

      {/* Capabilities */}
      <section id="systems" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12">OUR CAPABILITIES</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Identity Architecture</h3>
              <p>We don't just draw logos; we build comprehensive visual systems. From typographic hierarchy to color theory, we establish the core DNA of your brand so it remains flawless across every medium.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Packaging & Spatial</h3>
              <p>Physical touchpoints that demand to be held. We design premium packaging for independent labels—like Earth‑Brew and Brew Bud—that dominate retail shelves and elevate the unboxing experience.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Immersive Digital</h3>
              <p>Your website is your digital flagship. We combine modern WebGL, 3D motion, and brutalist typography to engineer web experiences that command attention and refuse to be ignored.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work / Portfolio */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">ENGINEERED SYSTEMS</h2>
          <p className="text-center mb-8 text-gray-300">A select archive of identities built for market disruption.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-lg shadow-lg">
              <Image src="/assets/earth brew/placeholder.jpg" alt="Earth Brew" width={600} height={400} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-semibold mb-2">Earth‑Brew Coffee Roasters</h3>
                <p className="text-center px-4">Stripping away the noise of the organic coffee market to create a stark, premium package that owns the shelf.</p>
                <a href="#" className="mt-4 inline-block bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded">INSPECT PROJECT</a>
              </div>
            </div>
            {/* Additional project placeholders can be added here */}
            <div className="bg-gray-700 h-64 flex items-center justify-center rounded-lg">
              <span className="text-gray-400">Additional project placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* About / Agency */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">THE ARCHITECT</h2>
          <h3 className="text-2xl font-semibold mb-6 text-gray-200">DESIGNED BY DISCIPLINE.</h3>
          <p className="text-lg text-gray-300 mb-6">
            DESOV is an independent brand identity practice founded by Sourav Yadav.
          </p>
          <p className="text-lg text-gray-300">
            We operate on a simple principle: good design is invisible, but great design is undeniable. We partner exclusively with ambitious founders who understand that brand perception dictates market value. By merging raw, brutalist aesthetics with highly disciplined typographic structures, we don't just help you compete—we help you set the standard.
          </p>
        </div>
      </section>

      {/* Contact / Inquire */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">INITIATE A PROJECT</h2>
          <h3 className="text-2xl font-semibold mb-6 text-gray-200">READY TO COMMAND YOUR MARKET?</h3>
          <p className="text-gray-300 mb-8">We take on a strictly limited number of projects per quarter to ensure absolute focus. If you are ready to build an uncompromising identity, submit your brief below.</p>
          <form className="grid gap-4 text-left">
            <input type="text" placeholder="Name / Title" className="bg-gray-800 border border-gray-600 rounded p-2" />
            <input type="text" placeholder="Company / Label" className="bg-gray-800 border border-gray-600 rounded p-2" />
            <select className="bg-gray-800 border border-gray-600 rounded p-2">
              <option>Brand Identity</option>
              <option>Packaging</option>
              <option>Full Digital Rollout</option>
            </select>
            <select className="bg-gray-800 border border-gray-600 rounded p-2">
              <option>$5k+</option>
              <option>$10k+</option>
              <option>$20k+</option>
            </select>
            <textarea placeholder="Project Details" rows={4} className="bg-gray-800 border border-gray-600 rounded p-2"></textarea>
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-full transition-colors">SUBMIT BRIEF</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 bg-gray-950">
        <p>© {new Date().getFullYear()} Desov Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
