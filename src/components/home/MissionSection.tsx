
import Image from "next/image";
import "./MissionSection.css";

export default function MissionSection() {
  return (
    <section className="mission-section" id="mission">

      {/* BACKGROUND IMAGE */}
      <div className="mission-background">
        <Image
          src="/images/mission-f1.png"
          alt="Formula racing car on a cinematic racing circuit at sunset"
          fill
          sizes="100vw"
          quality={85}
          className="mission-image"
        />
      </div>

      {/* CINEMATIC OVERLAY */}
      <div className="mission-overlay" />

      {/* MAIN CONTENT */}
      <div className="mission-content">

        {/* SECTION LABEL */}
        <div className="mission-label">
          <span className="mission-slashes">//</span>
          <span className="mission-label-text">THE MISSION</span>
          <span className="mission-line" />
        </div>

        {/* MISSION HEADING */}
        <div className="mission-copy">

          <h2 className="mission-title">
            <span className="mission-title-light">
              Turning Ideas into
            </span>

            <span className="mission-title-bold">
              REALITY<span className="mission-period">.</span>
            </span>
          </h2>

          {/* RED ACCENT */}
          <div className="mission-accent-line" />

          {/* MISSION STATEMENT */}
          <blockquote className="mission-quote">
            <p>
              Build meaningful digital experiences
              <br className="desktop-break" />
              that solve real problems, create lasting value,
              <br className="desktop-break" />
              and move ideas forward.
            </p>
          </blockquote>

        </div>
      </div>

    </section>
  );
}
