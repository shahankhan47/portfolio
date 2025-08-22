"use client";
import { useEffect, useState } from "react";
import {ReactTyped} from "react-typed";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  useEffect(() => {
    // Reset scroll position on page load / navigation
    window.scrollTo(0, 0);

    // Register GSAP animations and ScrollTriggers in context
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".about-stage");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-container",
          pin: true,
          scrub: true,
          snap: 1 / (sections.length + 1),
          end: "+=" + sections.length * window.innerHeight,
        },
      });

      gsap.set(sections, { opacity: 0, y: 100 });

      sections.forEach((section, index) => {
        tl.to(section, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          onStart: () => {
            setActiveSection(index)},
        });

        if (index !== sections.length - 1) {
          tl.to(section, {
            opacity: 0,
            y: -100,
            duration: 1,
            ease: "power3.in",
          });
        }
      });
    });

    // Cleanup GSAP effects on unmount to prevent scroll locking
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      className="relative bg-white text-black min-h-screen overflow-hidden"
    >
      {/* Sticky heading */}
      <h2 className="sticky top-10 text-6xl font-bold text-black text-center z-0">
        About Me
      </h2>

      {/* Pinned scroll container */}
      <div className="about-container relative z-10 h-screen w-full flex items-center justify-center">
        {[ // Data-driven mapping to reduce repetition
          {
            imgSrc: "/images/about/school.jpg",
            alt: "Schooling",
            text: "I began my journey with strong schooling foundations...",
          },
          {
            imgSrc: "/images/about/bachelors.jpg",
            alt: "Bachelors",
            text: "Completed my Bachelors in Computer Science...",
          },
          {
            imgSrc: "/images/about/masters.jpg",
            alt: "Masters",
            text: "Pursued Masters to deepen my expertise...",
          },
          {
            imgSrc: "/images/about/hobbies.jpg",
            alt: "Hobbies",
            text: "Beyond work, I love music, gaming, and art.",
          },
        ].map(({ imgSrc, alt, text }, i) => (
          <div
            key={i}
            className="about-stage absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <div className="about-image-card">
              <img
                src={imgSrc}
                alt={alt}
                className="about-image w-140 mb-6 max-w-full h-auto"
              />
            </div>
            <div className="about-text text-xl text-black max-w-2xl">
              {activeSection === i && (
                <ReactTyped
                  key={`typed-${activeSection}`}
                  strings={[text]}
                  typeSpeed={25}
                  backSpeed={0}
                  showCursor={true}
                  cursorChar="|"
                  startDelay={50}
                  className="inline-block"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}