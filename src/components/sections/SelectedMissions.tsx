
"use client";

import { useState } from "react";
import Image from "next/image";
import "./SelectedMissions.css";

type Project = {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  contribution: string;
  technologies: string[];
  url?: string;
};

const projects: Project[] = [
  {
    id: "origin-tiles",
    name: "Origin Tiles",
    category: "BRAND & BUSINESS WEBSITE",
    logo: "/images/selected-missions/origin-tiles.png",
    description:
      "A digital presence created for a tiles brand to showcase its identity, products and collections through a modern website experience.",
    contribution:
      "Worked on the website frontend and visual presentation, creating structured sections to introduce the brand and showcase its products.",
    technologies: ["React.js", "JavaScript", "CSS", "Netlify"],
    url: "https://cozy-begonia-d0ed86.netlify.app/",
  },
  {
    id: "trees-plywood",
    name: "The Trees Plywood",
    category: "CORPORATE & PRODUCT WEBSITE",
    logo: "/images/selected-missions/trees-plywood.png",
    description:
      "A business website created to present the plywood brand, its product range and business information through a clear digital experience.",
    contribution:
      "Worked on website design and frontend development, focusing on the layout, content presentation and product-focused sections.",
    technologies: ["React.js", "JavaScript", "CSS", "Netlify"],
    url: "https://astonishing-biscotti-4c38fa.netlify.app/",
  },
  {
    id: "aroha-beachfront",
    name: "Aroha Beachfront",
    category: "HOSPITALITY & REAL ESTATE",
    logo: "/images/selected-missions/aroha-beachfront.png",
    description:
      "A digital experience for a beachfront destination, designed to present its identity, atmosphere and key information to visitors.",
    contribution:
      "Project overview and individual development responsibilities can be updated with the final project scope.",
    technologies: ["React.js", "JavaScript", "CSS"],
  },
  {
    id: "okto-retail",
    name: "OKTO Retail",
    category: "FULL-STACK E-COMMERCE PLATFORM",
    logo: "/images/selected-missions/okto-retail.png",
    description:
      "A full-stack retail e-commerce platform with product discovery, category browsing, user accounts, shopping cart and order-related functionality.",
    contribution:
      "Developed REST APIs using Node.js and Express.js, designed MongoDB models, implemented JWT authentication, bcrypt password hashing and role-based access control. Built product, category, cart and address APIs, integrated Cloudinary image uploads and Razorpay order creation. Also worked on frontend sections and responsive improvements.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Cloudinary",
      "Razorpay",
    ],
    url: "https://okto-retail.vercel.app/",
  },
  {
    id: "nbce",
    name: "NBCE Computer Education",
    category: "EDUCATION WEBSITE",
    logo: "/images/selected-missions/nbce.jpg",
    description:
      "An educational website created to present institute information, courses and learning-related services in a structured digital format.",
    contribution:
      "Worked on the full-stack website implementation, including frontend development and backend functionality.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
  },
  {
    id: "maa-kali-temple",
    name: "Maa Kali Temple, Chandbali",
    category: "TEMPLE & COMMUNITY WEBSITE",
    logo: "/images/selected-missions/maa-kali-temple.png",
    description:
      "A digital platform concept for presenting temple information, religious activities, visitor details and community updates.",
    contribution:
      "Project scope and development responsibilities will be updated according to the final implementation.",
    technologies: ["React.js", "JavaScript", "CSS"],
  },
  {
    id: "samaleswari-trust",
    name: "Samaleswari Temple Trust Board",
    category: "INSTITUTIONAL WEBSITE",
    logo: "/images/selected-missions/samaleswari-trust.png",
    description:
      "A digital platform for presenting temple trust information, important updates, visitor resources and institutional details.",
    contribution:
      "Project scope and individual development responsibilities will be updated as the implementation progresses.",
    technologies: ["React.js", "JavaScript", "CSS"],
  },
  {
    id: "sea-project",
    name: "SEA Projects",
    category: "BUSINESS WEBSITE",
    logo: "/images/selected-missions/sea-project.jpg",
    description:
      "A digital project focused on presenting the business identity, services and relevant information through a modern web experience.",
    contribution:
      "The project overview and development responsibilities will be updated as the project progresses.",
    technologies: ["React.js", "JavaScript", "CSS"],
  },
  {
    id: "duno-studio",
    name: "DUNO Studio",
    category: "CREATIVE BRAND WEBSITE",
    logo: "/images/selected-missions/duno-studio.png",
    description:
      "A creative brand website with an editorial-inspired visual direction, thoughtful typography and a distinctive digital identity.",
    contribution:
      "Worked on the visual direction and website structure, with attention to typography, layout and brand presentation.",
    technologies: ["React.js", "Tailwind CSS", "JavaScript"],
  },
  {
    id: "yatra",
    name: "Yatra Elevators",
    category: "CORPORATE WEBSITE",
    logo: "/images/selected-missions/yatra.png",
    description:
      "A corporate website developed to present elevator products and services through a responsive and professional digital experience.",
    contribution:
      "Worked on frontend implementation and responsive layouts across desktop, tablet and mobile screens. The website frontend was completed and deployed.",
    technologies: ["React.js", "JavaScript", "CSS", "Vercel"],
  },
];

const projectColumns = [
  projects.filter((_, index) => index % 3 === 0),
  projects.filter((_, index) => index % 3 === 1),
  projects.filter((_, index) => index % 3 === 2),
];

export default function SelectedMissions() {
  const [activeProject, setActiveProject] = useState<Project>(
    projects.find((project) => project.id === "trees-plywood") ?? projects[0]
  );

  const openProject = (project: Project) => {
    if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `/under-construction/${project.id}`;
    }
  };

  return (
    <section className="selected-missions" id="selected-missions">
      {/* BACKGROUND */}

      <div className="missions-background">
        <Image
          src="/images/selected-missions/fighter-jet-bg-v2.png"
          alt="Fighter jet in flight"
          fill
          priority
          sizes="100vw"
          className="missions-background-image"
        />
      </div>

      <div className="missions-dark-overlay" />
      <div className="missions-vignette" />

      <div className="missions-content">
        {/* SMALL TECHNICAL HEADING */}

        <header className="missions-heading">
          <div className="missions-heading-title">
            <span className="missions-roundel">
              <Image
                src="/images/selected-missions/Indian Air Force Tricolour Roundel.png"
                alt="Indian Air Force roundel"
                width={28}
                height={28}
                className="missions-roundel-image"
              />
            </span>

            <h2>SELECTED MISSION</h2>
          </div>

          <div className="missions-heading-line" />
        </header>

        {/* MAIN LAYOUT */}

        <div className="missions-layout">
          {/* THREE INDEPENDENT LOGO COLUMNS */}

          <div className="missions-logo-area">
            <div className="missions-logo-grid">
              {projectColumns.map((column, columnIndex) => (
                <div
                  className={`mission-logo-column mission-column-${columnIndex + 1}`}
                  key={columnIndex}
                >
                  <div className="mission-logo-track">
                    {[0, 1].map((copy) => (
                      <div
                        className="mission-logo-set"
                        key={copy}
                        aria-hidden={copy === 1}
                      >
                        {column.map((project) => {
                          const isActive = activeProject.id === project.id;

                          return (
                            <button
                              key={`${copy}-${project.id}`}
                              type="button"
                              className={`mission-logo-button ${
                                isActive ? "active" : ""
                              }`}
                              onMouseEnter={() => setActiveProject(project)}
                              onFocus={() => setActiveProject(project)}
                              onClick={() => openProject(project)}
                              aria-label={`Open ${project.name}`}
                              tabIndex={copy === 0 ? 0 : -1}
                            >
                              <Image
                                src={project.logo}
                                alt={`${project.name} logo`}
                                fill
                                sizes="(max-width: 700px) 28vw, 120px"
                                className="mission-logo-image"
                              />

                              <span className="mission-logo-overlay">
                                <span>EXPLORE</span>
                                <span className="logo-arrow">↗</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECT INFORMATION */}

          <div className="mission-details" key={activeProject.id}>
            <div className="mission-detail-main">
              <div className="mission-category">
                <span className="category-indicator" />
                {activeProject.category}
              </div>

              <h1>{activeProject.name}</h1>

              <div className="mission-heading-accent" />

              <div className="mission-info-block">
                <span className="mission-info-label">
                  <span>01</span>
                  PROJECT OVERVIEW
                </span>

                <p>{activeProject.description}</p>
              </div>

              <div className="mission-info-block">
                <span className="mission-info-label">
                  <span>02</span>
                  MY CONTRIBUTION
                </span>

                <p>{activeProject.contribution}</p>
              </div>

              <div className="mission-technologies">
                <span className="mission-info-label">
                  <span>03</span>
                  TECHNOLOGY STACK
                </span>

                <div className="mission-tech-list">
                  {activeProject.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="mission-open-button"
                onClick={() => openProject(activeProject)}
              >
                <span>
                  {activeProject.url ? "EXPLORE PROJECT" : "PROJECT IN PROGRESS"}
                </span>

                <span className="mission-open-arrow">↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
