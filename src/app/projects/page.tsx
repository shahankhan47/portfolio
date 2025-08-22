"use client";
import { useEffect } from "react";
import gsap from "gsap";
import {ReactTyped} from "react-typed";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Project 1",
    description: "Earliest project details...",
    top: 200,
    align: "left", // match left-card or right side
    typedStrings: [
      "Typed text for Project 1.",
      "More info here about Project 1.",
    ],
  },
  {
    title: "Project 2",
    description: "Another cool project...",
    top: 700,
    align: "right",
    typedStrings: [
      "Typed text for Project 2.",
      "Details continuing here.",
    ],
  },
  {
    title: "Project 3",
    description: "Details of this one...",
    top: 1200,
    align: "left",
    typedStrings: [
      "Typed text for Project 3.",
      "Additional info here.",
    ],
  },
  {
    title: "Project 4",
    description: "Another cool project...",
    top: 1800,
    align: "right",
    typedStrings: [
      "Typed text for Project 4.",
      "More details about Project 4 typed out.",
    ],
  },
];

export default function ProjectsPage() {
  useEffect(() => {
    const path = document.querySelector("#footprintPath") as SVGPathElement;
    const container = document.querySelector(
      "#footprintsContainer"
    ) as HTMLElement;

    const pathLength = path.getTotalLength();
    const numFootprints = 25;
    const step = pathLength / numFootprints;

    const footprints: HTMLElement[] = [];

    for (let i = 0; i < numFootprints; i++) {
      const footprint = document.createElement("div");
      footprint.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4">
          <path d="M12 2C10 2 8 4 8 6s2 4 4 4 4-2 4-4-2-4-4-4zM6 9c-1.66 0-3 1.79-3 4s1.34 5 3 5 3-2.24 3-5-1.34-4-3-4zm12 0c-1.66 0-3 1.79-3 4s1.34 5 3 5 3-2.24 3-5-1.34-4-3-4zM12 12c-2 0-4 2.24-4 5s2 5 4 5 4-2.24 4-5-2-5-4-5z"/>
        </svg>
      `;
      footprint.className = "absolute opacity-0";
      container.appendChild(footprint);

      const lengthAtPoint = i * step;
      const position = path.getPointAtLength(lengthAtPoint);
      const delta = 0.1;
      const nextPoint = path.getPointAtLength(lengthAtPoint + delta);
      const angle =
        (Math.atan2(nextPoint.y - position.y, nextPoint.x - position.x) * 180) /
          Math.PI +
        180;

      const offset = i % 2 === 0 ? -10 : 10;

      gsap.set(footprint, {
        x: position.x - 12 + offset,
        y: position.y - 12,
        rotate: angle + 90,
      });

      footprints.push(footprint);
    }

    // Footprints reveal
    gsap.to(footprints, {
      opacity: 1,
      stagger: { each: 0.05 },
      scrollTrigger: {
        trigger: "#projectsSection",
        start: "top top",
        end: "bottom bottom",
        scrub: 3,
      },
    });

    // Project card animations
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
      const isLeft = card.classList.contains("left-card");

      gsap.set(card, { opacity: 0, x: isLeft ? -100 : 100 });

      const cardTop = card.offsetTop;
      const containerHeight = container.scrollHeight;
      const triggerProgress = cardTop / containerHeight;

      ScrollTrigger.create({
        trigger: "#projectsSection",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress >= triggerProgress) {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              overwrite: "auto",
            });
          } else {
            gsap.to(card, {
              opacity: 0,
              x: isLeft ? -100 : 100,
              duration: 0.6,
              ease: "power3.in",
              overwrite: "auto",
            });
          }
        },
      });
    });

    // Background text fade out
    gsap.to("#backgroundHeading", {
      opacity: 0,
      scale: 0,
      translate: 0,
      transformOrigin: "center center",
      duration: 1,
      ease: "sine.in",
      scrollTrigger: {
        trigger: "#projectsSection",    // or keep existing triggers if desired
        start: "top top",               // start at top of projects section
        endTrigger: ".project-card",    // end when project cards appear
        end: "top center",
        scrub: 3,
      },
    });
  }, []);

  useEffect(() => {
  const cards = gsap.utils.toArray<HTMLElement>(".project-card");

  ScrollTrigger.create({
    trigger: "#projectsSection",
    start: "top top",
    end: "bottom bottom",
    scrub: false, // no need for scrub, we care about edges
    onUpdate: (self) => {
      const cardsArr = cards as HTMLElement[];

      if (self.progress <= 0.01) {
        // Close enough to TOP → hide all cards
        gsap.to(cardsArr, {
          opacity: 0,
          x: (i, el) =>
            el.classList.contains("left-card") ? -100 : 100,
          duration: 0.4,
          overwrite: "auto",
        });
      } else if (self.progress >= 0.99) {
        // Close enough to BOTTOM → show all cards
        gsap.to(cardsArr, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          overwrite: "auto",
        });
      }
    },
  });
}, []);

  return (
    <section
      id="projectsSection"
      className="min-h-screen bg-white text-white relative p-10 -z-11"
    >
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-10"
        src="/videos/background.mp4" // replace with your actual video path
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Optional overlay for better text readability */}
      <div className="fixed inset-0 bg-black/50 -z-5"></div>

      {/* Background Heading */}
      <div
        id="backgroundHeading"
        className="absolute inset-0
             flex items-top top-30 justify-bottom 
             text-white text-[6rem] font-extrabold 
             z-0 pointer-events-none text-center"
        style={{ whiteSpace: "pre-line" }}
      >
        Here are the projects I&apos;ve worked on
      </div>

      {/* Title Card */}
      <div className="text-center mb-20 relative z-10">
      </div>

      {/* Path guide */}
      <div className="relative w-full h-[2000px] z-10">
        <svg
          className="absolute top-0 left-1/2 -translate-x-1/2"
          width="400"
          height="2000"
          viewBox="0 0 400 2000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="footprintPath"
            d="M200 0 C100 300, 300 600, 200 900 C100 1200, 300 1500, 200 2000"
            stroke="none"
            fill="none"
          />
        </svg>

        {/* Footprints */}
        <div
          id="footprintsContainer"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-full z-0"
        ></div>
        {/* Project Cards */}
        {projects.map(({ title, description, top, align, typedStrings }, i) => {
        // Determine horizontal positions
        const cardLeft = align === "left" ? "left-[20%]" : "right-[20%]";
        const typedLeft = align === "left" ? "right-[20%]" : "left-[20%]";

        // Card CSS classes
        const cardClassNames = `absolute top-[${top}px] ${cardLeft} bg-gray-800 p-6 rounded-lg w-64 z-10 project-card ${
          align === "left" ? "left-card" : ""
        }`;

        // Typed text classes and styles
        const typedClassNames = `absolute top-[${top}px] ${typedLeft} w-64 z-10 text-white project-card ${align === "left" ? "left-card" : ""}`;

        return (
          <div key={i}>
            {/* Project Card */}
            <div className={cardClassNames}>
              <h3 className="text-2xl text-white font-bold">{title}</h3>
              <p className="text-sm text-gray-300">{description}</p>
            </div>

            {/* Typed Text */}
            <div className={typedClassNames}>
              <ReactTyped
                strings={typedStrings}
                typeSpeed={40}
                backSpeed={30}
                loop
                showCursor={true}
                cursorChar="|"
                className="text-lg font-light"
              />
            </div>
          </div>
        );
      })}
      </div>
    </section>
  );
}