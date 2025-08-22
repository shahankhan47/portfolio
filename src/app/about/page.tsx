"use client";
import { useEffect, useState } from "react";
import {ReactTyped} from "react-typed";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutData = [
  {
    imgSrc: "/images/about/school.jpg",
    alt: "Schooling",
    text: `I completed my schooling from The Frank Anthony Public School, Kolkata. 
    The year was 2014 and I scored 85% on my boards examinations`,
  },
  {
    imgSrc: "/images/about/bachelors.jpg",
    alt: "Bachelors",
    text: `Completed my Bachelors in Computer Science and Engineering from Maulana Abul Kalam Azad University of Technology (formerly
    known as West Bengal University of Technology) getting a CGPA score of 7.1`,
  },
  {
    imgSrc: "/images/about/masters.jpg",
    alt: "Masters",
    text: `After graduation, I completed a few industrial trainings on Android Development as well as learnt the German language 
    (A1 level) on my part time before I got a full time job. I also temporarily started learning 3d animation but had to leave that.`,
  },
  {
    imgSrc: "/images/about/hobbies.jpg",
    alt: "Hobbies",
    text: "Beyond work, I love music, gaming, game development and singing. I also love spending time with friends and family.",
  },
]

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
            setActiveSection(index)
          },
          onReverseComplete: () => {
            setActiveSection(index - 1)
          },
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

    // Background text fade out
    gsap.to("#backgroundHeading", {
      opacity: 0,
      transformOrigin: "center center",
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: "#aboutSection",    // or keep existing triggers if desired
        start: "top top",               // start at top of projects section
        endTrigger: ".about-stage",    // end when project cards appear
        end: "top center",
        scrub: 3,
      },
    });

    // Cleanup GSAP effects on unmount to prevent scroll locking
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      className="relative bg-white text-white min-h-screen overflow-hidden"
    >
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover"
        src="/videos/background.mp4" // replace with your actual video path
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Optional overlay for better text readability */}
      <div className="fixed inset-0 bg-black/50"></div>
      {/* Sticky heading */}
      <div id="backgroundHeading">
        <ReactTyped
          strings={["Here are some details about my life and journey"]}
          typeSpeed={25}
          backSpeed={0}
          showCursor={false}
          loop
          cursorChar="|"
          startDelay={50}
          className="absolute inset-0 pl-50 pr-50
             flex items-top top-30 justify-bottom 
             text-white text-[6rem] font-bold 
             z-0 pointer-events-none text-center"
        />
      </div>

      {/* Pinned scroll container */}
      <div id="aboutSection" className="about-container relative z-10 h-screen w-full flex items-center justify-center">
        {aboutData.map(({ imgSrc, alt, text }, i) => (
          <div
            key={i}
            className={`about-stage absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${activeSection === i ? "active" : ""}`}
          >
            <div className="about-image-card">
              <img
                src={imgSrc}
                alt={alt}
                className="about-image w-140 mb-6 max-w-full h-auto"
              />
            </div>
            <div className="about-text text-xl text-white max-w-2xl">
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