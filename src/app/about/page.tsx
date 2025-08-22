"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".about-stage");
    // Master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-container",
        pin: true,             // pin whole container
        scrub: true,           // tie animation to scroll
        snap: 1 / (sections.length+1), // snap to nearest stage
        end: "+=" + sections.length * window.innerHeight, // total scroll length
      },
    });

    // Prepare all sections off-screen (hidden)
    gsap.set(sections, { opacity: 0, y: 100 });

    // For each section, fade it in, then out, sequenced across scroll
    sections.forEach((section, index) => {
      tl.to(section, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      });

      // If not the last section, fade it out before the next one enters
      if (index !== sections.length - 1) {
        tl.to(section, {
          opacity: 0,
          y: -100,
          duration: 1,
          ease: "power3.in"
        });
      }
    });
  }, []);

  return (
    <section
      id="about"
      className="relative bg-gray-950 text-white min-h-screen overflow-hidden"
    >
      {/* Sticky heading */}
      <h2 className="sticky top-10 text-6xl font-bold text-white text-center z-0">
        About Me
      </h2>

      {/* Pinned scroll container */}
      <div className="about-container relative z-10 h-screen w-full flex items-center justify-center">
        {/* Each stage is responsive and full screen */}
        <div className="about-stage absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <img
            src="/images/about/school.jpg"
            alt="Schooling"
            className="about-image w-64 mb-6 max-w-full h-auto"
          />
          <p className="about-text text-xl text-gray-300 max-w-2xl">
            I began my journey with strong schooling foundations...
          </p>
        </div>

        <div className="about-stage absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <img
            src="/images/about/bachelors.jpg"
            alt="Bachelors"
            className="about-image w-64 mb-6 max-w-full h-auto"
          />
          <p className="about-text text-xl text-gray-300 max-w-2xl">
            Completed my Bachelors in Computer Science...
          </p>
        </div>

        <div className="about-stage absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <img
            src="/images/about/masters.jpg"
            alt="Masters"
            className="about-image w-64 mb-6 max-w-full h-auto"
          />
          <p className="about-text text-xl text-gray-300 max-w-2xl">
            Pursued Masters to deepen my expertise...
          </p>
        </div>

        <div className="about-stage absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <img
            src="/images/about/hobbies.jpg"
            alt="Hobbies"
            className="about-image w-64 mb-6 max-w-full h-auto"
          />
          <p className="about-text text-xl text-gray-300 max-w-2xl">
            Beyond work, I love music, gaming, and art.
          </p>
        </div>
      </div>
    </section>
  );
}
