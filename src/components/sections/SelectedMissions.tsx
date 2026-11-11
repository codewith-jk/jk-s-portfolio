
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import "./SelectedMissions.css";

type Project = {
  id: string;
  name: string;
  logo: string;
  category: string;
  overview: string;
  contribution: string;
  technologies: string[];
  url: string | null;
  status: "live" | "progress";
};

const projects: Project[] = [
  {
    id: "origin-tiles",
    name: "Origin Tiles",
    logo: "/images/selected-missions/origin-tiles.png",
    category: "CORPORATE WEBSITE",
    overview:
      "A modern digital presence for a tiles brand, designed to showcase products, communicate the brand identity and create a smooth browsing experience.",
    contribution:
      "Worked on the website interface, responsive layouts and frontend implementation to present the brand and its product offerings.",
    technologies: ["React.js", "JavaScript", "CSS"],
    url: "https://cozy-begonia-d0ed86.netlify.app/",
    status: "live",
  },
  {
    id: "trees-plywood",
    name: "The Trees Plywood",
    logo: "/images/selected-missions/trees-plywood.png",
    category: "BUSINESS WEBSITE",
    overview:
      "A business website created to present plywood products, communicate brand information and provide visitors with a clear overview of the company.",
    contribution:
      "Worked on the website design and frontend development, focusing on responsive sections, visual presentation and user experience.",
    technologies: ["React.js", "JavaScript", "CSS"],
    url: "https://astonishing-biscotti-4c38fa.netlify.app/",
    status: "live",
  },
  {
    id: "aroha-beachfront",
    name: "Aroha Beachfront",
    logo: "/images/selected-missions/aroha-beachfront.png",
    category: "HOSPITALITY WEBSITE",
    overview:
      "A hospitality website concept designed to present beachfront accommodation, property highlights and an inviting digital experience for visitors.",
    contribution:
      "Website scope and individual development responsibilities will be updated according to the final implementation.",
    technologies: ["React.js", "JavaScript", "CSS"],
    url: null,
    status: "progress",
  },
  {
    id: "okto-retail",
    name: "OKTO Retail",
    logo: "/images/selected-missions/okto-retail.png",
    category: "E-COMMERCE PLATFORM",
    overview:
      "An e-commerce platform built to present products, support product discovery and provide customers with a structured online shopping experience.",
    contribution:
      "Developed backend REST APIs, MongoDB models, JWT authentication, role-based access control, product and category management, cart, address and order functionality. Also worked on frontend sections and search functionality.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Razorpay",
    ],
    url: "https://okto-retail.vercel.app/",
    status: "live",
  },
  {
    id: "nbce",
    name: "NBCE Computer Education",
    logo: "/images/selected-missions/nbce.jpg",
    category: "EDUCATION WEBSITE",
    overview:
      "An educational website designed to introduce computer education programs, share institutional information and help students explore available courses.",
    contribution:
      "Worked on the full-stack website using React, Node.js, Express and MongoDB, with a responsive interface and backend functionality.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    url: null,
    status: "progress",
  },
  {
    id: "maa-kali",
    name: "Maa Kali Temple, Chandbali",
    logo: "/images/selected-missions/maa-kali-temple.png",
    category: "TEMPLE & COMMUNITY WEBSITE",
    overview:
      "A digital platform concept for presenting temple information, religious activities, visitor details and community updates.",
    contribution:
      "Project scope and development responsibilities will be updated according to the final implementation.",
    technologies: ["React.js", "JavaScript", "CSS"],
    url: null,
    status: "progress",
  },
  {
    id: "samaleswari-trust",
    name: "Samaleswari Temple Trust Board",
    logo: "/images/selected-missions/samaleswari-trust.png",
    category: "INSTITUTIONAL WEBSITE",
    overview:
      "A digital platform concept for presenting temple trust information, important updates, visitor resources and institutional details.",
    contribution:
      "Project scope and development responsibilities will be updated according to the final implementation.",
    technologies: ["React.js", "JavaScript", "CSS"],
    url: null,
    status: "progress",
  },
  {
    id: "sea-project",
    name: "SEA Projects",
    logo: "/images/selected-missions/sea-project.jpg",
    category: "CORPORATE WEBSITE",
    overview:
      "A corporate website concept for presenting company services, project information and business capabilities through a clear digital interface.",
    contribution:
      "Project scope and development responsibilities will be updated according to the final implementation.",
    technologies: ["React.js", "JavaScript", "CSS"],
    url: null,
    status: "progress",
  },
  {
    id: "duno-studio",
    name: "DUNO Studio",
    logo: "/images/selected-missions/duno-studio.png",
    category: "CREATIVE STUDIO WEBSITE",
    overview:
      "A creative studio website concept focused on visual storytelling, brand presentation and a refined digital experience.",
    contribution:
      "Project scope and development responsibilities will be updated according to the final implementation.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: null,
    status: "progress",
  },
  {
    id: "yatra",
    name: "Yatra Elevators",
    logo: "/images/selected-missions/yatra.png",
    category: "CORPORATE WEBSITE",
    overview:
      "A responsive corporate website created to present elevator solutions, company information and service offerings.",
    contribution:
      "Worked on frontend implementation, responsive layouts and website sections. The completed frontend was deployed on Vercel.",
    technologies: ["React.js", "JavaScript", "CSS"],
    url: null,
    status: "progress",
  },
];

const columns = [
  projects.slice(0, 4),
  projects.slice(4, 7),
  projects.slice(7, 10),
];

function LogoCard({
  project,
  active,
  onHover,
  onClick,
}: {
  project: Project;
  active: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`mission-logo-button ${active ? "active" : ""}`}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onClick}
      aria-label={`Explore ${project.name}`}
      aria-pressed={active}
    >
      <Image
        src={project.logo}
        alt={`${project.name} logo`}
        fill
        sizes="(max-width: 700px) 28vw, 12vw"
        className="mission-logo-image"
      />

      <span className="mission-logo-overlay">
        EXPLORE
        <ArrowUpRight size={15} className="logo-arrow" />
      </span>
    </button>
  );
}

export default function SelectedMissions() {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project>(
    projects[1]
  );

  const openProject = (project: Project) => {
    if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(
      `/under-construction?project=${encodeURIComponent(project.name)}`
    );
  };

  return (
    <section className="selected-missions" id="selected-missions">
      {/* Background image */}

      <div className="missions-background">
        <Image
          src="/images/selected-missions/fighter-jet-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="missions-background-image"
        />
      </div>

      <div className="missions-dark-overlay" />
      <div className="missions-vignette" />

      <div className="missions-content">
        {/* Section heading */}

        <div className="missions-heading">
          <div className="missions-heading-title">
            <Image
              src="/images/selected-missions/Indian Air Force Tricolour Roundel.png"
              alt="Indian Air Force roundel"
              width={25}
              height={25}
              className="missions-roundel-image"
            />

            <h2>Selected Mission</h2>
          </div>

          <div className="missions-heading-line" />
        </div>

        {/* Main layout */}

        <div className="missions-layout">
          {/* Project logo columns */}

          <div className="missions-logo-area">
            <div className="missions-logo-grid">
              {columns.map((column, columnIndex) => (
                <div
                  className={`mission-logo-column mission-column-${columnIndex + 1}`}
                  key={`column-${columnIndex}`}
                >
                  <div className="mission-logo-track">
                    {/* First set */}

                    <div className="mission-logo-set">
                      {column.map((project) => (
                        <LogoCard
                          key={project.id}
                          project={project}
                          active={selectedProject.id === project.id}
                          onHover={() => setSelectedProject(project)}
                          onClick={() => openProject(project)}
                        />
                      ))}
                    </div>

                    {/* Duplicate set for continuous scrolling */}

                    <div className="mission-logo-set" aria-hidden="true">
                      {column.map((project) => (
                        <LogoCard
                          key={`${project.id}-duplicate`}
                          project={project}
                          active={false}
                          onHover={() => setSelectedProject(project)}
                          onClick={() => openProject(project)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected project details */}

          <div className="mission-details" key={selectedProject.id}>
            <div className="mission-detail-main">
              <div className="mission-category">
                <span className="category-indicator" />
                {selectedProject.category}
              </div>

              <h1>{selectedProject.name}</h1>

              <div className="mission-heading-accent" />

              {/* Overview */}

              <div className="mission-info-block">
                <div className="mission-info-label">
                  PROJECT OVERVIEW
                </div>

                <p>{selectedProject.overview}</p>
              </div>

              {/* Contribution */}

              <div className="mission-info-block">
                <div className="mission-info-label">
                  MY CONTRIBUTION
                </div>

                <p>{selectedProject.contribution}</p>
              </div>

              {/* Technologies */}

              <div className="mission-technologies">
                <div className="mission-info-label">
                  TECHNOLOGY STACK
                </div>

                <div className="mission-tech-list">
                  {selectedProject.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>

              {/* Project action */}

              <button
                type="button"
                className="mission-open-button"
                onClick={() => openProject(selectedProject)}
              >
                <span>
                  {selectedProject.status === "live"
                    ? "VIEW LIVE PROJECT"
                    : "PROJECT IN PROGRESS"}
                </span>

                <ArrowUpRight
                  size={18}
                  className="mission-open-arrow"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
