
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

import EarthScene from "../src/components/hero/EarthScene";
import MissionSection from "../src/components/home/MissionSection";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // =====================================
  // SMART AUTO-HIDE NAVBAR
  // =====================================

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const previousScrollY = lastScrollY.current;

        const difference = currentScrollY - previousScrollY;

        // Always show navbar at page top
        if (currentScrollY <= 80) {
          setIsHeaderVisible(true);
        }

        // Hide when scrolling down
        else if (difference > 6) {
          setIsHeaderVisible(false);
          setMenuOpen(false);
        }

        // Show when scrolling up
        else if (difference < -6) {
          setIsHeaderVisible(true);
        }

        if (Math.abs(difference) > 6) {
          lastScrollY.current = currentScrollY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =====================================
  // CLOSE MOBILE MENU ON ESCAPE
  // =====================================

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // =====================================
  // PAGE UI
  // =====================================

  return (
    <main className="portfolio">

      {/* =================================
          HEADER / NAVBAR
      ================================= */}

      <header
        className={`site-header ${
          isHeaderVisible ? "" : "site-header--hidden"
        }`}
      >

        {/* JK LOGO */}

        <Link
          href="/"
          className="brand"
          aria-label="JK Home"
        >
          <Image
            src="/images/jk-logo-white.png"
            alt="JK Logo"
            width={100}
            height={70}
            priority
            className="brand-logo"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav
          className="desktop-nav"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CONTACT BUTTON */}

        <Link
          href="/contact"
          className="header-contact"
        >
          Contact
          <ArrowRight size={15} />
        </Link>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

      </header>

      {/* =================================
          MOBILE NAVIGATION
      ================================= */}

      {menuOpen && (
        <nav
          className="mobile-nav"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {navigation.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <ArrowRight size={17} />
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Contact
            <ArrowRight size={17} />
          </Link>
        </nav>
      )}

      {/* =================================
          HERO SECTION
      ================================= */}

      <section
        className="hero-section"
        id="home"
      >

        {/* HERO CONTENT */}

        <div className="hero-content">

          <p className="hero-eyebrow">
            <span>FULL STACK DEVELOPER</span>
            <span className="location-divider">/</span>

            <span className="india-text">
              <span className="india-saffron">IN</span>
              <span className="india-white">D</span>
              <span className="india-green">IA</span>
            </span>
          </p>

          <h1 className="hero-title">
            <span>BUILDING</span>
            <span>BEYOND</span>
            <span>THE ORDINARY</span>
          </h1>

          <p className="hero-description">
            I&apos;m JK, a Full Stack Developer driven by innovation.
            I design, engineer, and build digital experiences that
            push boundaries and turn ambitious ideas into reality.
          </p>

          <Link
            href="/projects"
            className="explore-button"
          >
            EXPLORE MY WORK
            <ArrowRight size={19} />
          </Link>

        </div>

        {/* =================================
            ROTATING EARTH
        ================================= */}

        <div
          className="earth-container"
          aria-label="Rotating planet Earth"
        >
          <div className="earth-light" />

          <EarthScene />

        </div>

      </section>

      {/* =================================
          SECTION 02 — THE MISSION
      ================================= */}

      <MissionSection />

      {/* Future homepage sections will go here */}

    </main>
  );
}
