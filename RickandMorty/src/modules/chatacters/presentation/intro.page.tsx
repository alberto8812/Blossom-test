import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function BlossomHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLElement>("[data-c]");
      if (!chars.length) return;

      /* Start: scattered and invisible */
      chars.forEach((c) => {
        gsap.set(c, {
          x: gsap.utils.random(-400, 400),
          y: gsap.utils.random(-250, 250),
          rotation: gsap.utils.random(-120, 120),
          scale: gsap.utils.random(0.2, 2),
          opacity: 0,
        });
      });

      const tl = gsap.timeline({ delay: 0.3 });

      /* Phase 1: letters fade in, still scattered */
      tl.to(chars, {
        opacity: 1,
        duration: 0.3,
        stagger: { each: 0.05, from: "random" },
        ease: "power1.in",
      });

      /* Phase 2: shuffle to new random positions */
      tl.to(
        chars,
        {
          x: () => gsap.utils.random(-150, 150),
          y: () => gsap.utils.random(-100, 100),
          rotation: () => gsap.utils.random(-30, 30),
          scale: () => gsap.utils.random(0.8, 1.3),
          duration: 0.5,
          stagger: { each: 0.03, from: "edges" },
          ease: "power3.inOut",
        },
        "+=0.05",
      );

      /* Phase 3: settle into final position */
      tl.to(
        chars,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          stagger: { each: 0.04, from: "center" },
          ease: "elastic.out(1, 0.5)",
        },
        "+=0.1",
      );

      /* Phase 4: gentle idle float */
      chars.forEach((c, i) => {
        gsap.to(c, {
          y: gsap.utils.random(-3, 3),
          rotation: gsap.utils.random(-1.5, 1.5),
          duration: gsap.utils.random(2, 3.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: tl.duration() + i * 0.1,
        });
      });
    },
    { scope: rootRef },
  );

  const charStyle: CSSProperties = {
    display: "inline-block",
    fontSize: "clamp(2.5rem, 8vw, 6rem)",
    fontWeight: 800,
    color: "#0f1b2d",
    lineHeight: 1,
    fontFamily: "'DM Serif Display', Georgia, 'Times New Roman', serif",
    letterSpacing: "-0.02em",
    willChange: "transform, opacity",
  };

  const word = "blossom";

  return (
    <div
      ref={rootRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #f5f0e8 0%, #e8e0d0 40%, #ddd5c5 100%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline" }}>
        {word.split("").map((ch, i) => (
          <span key={i} data-c style={charStyle}>
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}
