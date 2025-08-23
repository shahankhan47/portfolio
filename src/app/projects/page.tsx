"use client";
import { useEffect } from "react";
import gsap from "gsap";
import {ReactTyped} from "react-typed";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Senior Software Engineer",
    description: "Thinkbridge Software",
    top: 200,
    align: "left",
    typedStrings: [
      "Python | FastApi | OpenAI | React | Postgres",
      "March 2025 - Present",
    ],
  },
  {
    title: "FullStack Engineer",
    description: "Thinkbridge Software",
    top: 700,
    align: "right",
    typedStrings: [
      "React | MongoDB | Python",
      "January 2023 - March 2025",
    ],
  },
  {
    title: "Software Engineer",
    description: "Infogain",
    top: 1200,
    align: "left",
    typedStrings: [
      "React | AWS | SQL",
      "November 2021 - December 2022",
    ],
  },
  {
    title: "Associate Consultant",
    description: "Atos Syntel",
    top: 1800,
    align: "right",
    typedStrings: [
      "JavaScript | Azure DevOps | MongoDB",
      "October 2018 - November 2021",
    ],
  },
];

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
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
      footprint.innerHTML = ".";
      footprint.className = "absolute opacity-0";
      container.appendChild(footprint);

      const lengthAtPoint = i * step;
      const position = path.getPointAtLength(lengthAtPoint);

      gsap.set(footprint, {
        x: position.x,
        y: position.y,
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
      transformOrigin: "center center",
      duration: 1,
      ease: "power1.out",
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
      className="min-h-screen bg-white text-white relative p-10"
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

      {/* Background Heading */}
      <div id="backgroundHeading">
        <ReactTyped
          strings={["My Career Timeline"]}
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

      {/* Title Card */}
      <div className="text-center mb-100 relative z-10">
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
          d="M200 0
            L200 2000"
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
        const horizontalPosTyped = align === "left" ? { right: '20%' } : { left: '20%' };
        const horizontalPosCard = align === "left" ? { left: '20%' } : { right: '20%' };
        const cardStyles = {
          top: `${top}px`,
          ...horizontalPosCard,
        };

        const typedStyles = {
          top: `${top}px`,
          ...horizontalPosTyped,
        };

        // Card CSS classes
        const cardClassNames = `absolute bg-gray-800 p-6 rounded-lg w-64 z-10 project-card box-card ${align === "left" ? "left-card" : ""}`;

        // Typed text classes and styles
        const typedClassNames = `absolute w-64 z-10 text-white project-card ${align === "left" ? "left-card" : ""}`;

        return (
          <div key={i}>
            {/* Project Card */}
            <div className={cardClassNames} style={cardStyles}>
              <h3 className="text-2xl text-white font-bold">{title}</h3>
              <p className="text-sm text-gray-300">{description}</p>
            </div>

            {/* Typed Text */}
            <div className={typedClassNames} style={typedStyles}>
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