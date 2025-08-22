"use client";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
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
      scrollTrigger: {
        // trigger: "#footprintsContainer",
        // start: "center top",     // start fading when footprints begin
        endTrigger: ".project-card", 
        // end: "top center",       // fully gone by the time first card enters
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
      className="min-h-screen bg-gray-950 text-white relative p-10"
    >
      {/* Background Heading */}
      <div
        id="backgroundHeading"
        className="fixed
             flex items-center top-50 justify-bottom 
             text-white text-[6rem] font-extrabold 
             z-0 pointer-events-none text-center"
        style={{ whiteSpace: "pre-line" }}
      >
        Here are the projects I&apos;ve worked on
      </div>

      {/* Title Card */}
      <div className="text-center mb-20 relative z-10">
        <h2 className="text-6xl font-bold">My Projects</h2>
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
        <div className="absolute top-[200px] left-[20%] bg-gray-800 p-6 rounded-lg w-64 z-10 project-card left-card">
          <h3 className="text-2xl font-bold">Project 1</h3>
          <p className="text-sm text-gray-300">Earliest project details...</p>
        </div>

        <div className="absolute top-[700px] right-[20%] bg-gray-800 p-6 rounded-lg w-64 z-10 project-card">
          <h3 className="text-2xl font-bold">Project 2</h3>
          <p className="text-sm text-gray-300">Another cool project...</p>
        </div>

        <div className="absolute top-[1200px] left-[25%] bg-gray-800 p-6 rounded-lg w-64 z-10 project-card left-card">
          <h3 className="text-2xl font-bold">Project 3</h3>
          <p className="text-sm text-gray-300">Details of this one...</p>
        </div>

        <div className="absolute top-[1800px] right-[20%] bg-gray-800 p-6 rounded-lg w-64 z-10 project-card">
          <h3 className="text-2xl font-bold">Project 4</h3>
          <p className="text-sm text-gray-300">Another cool project...</p>
        </div>
      </div>
    </section>
  );
}
