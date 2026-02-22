"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { Send, Star } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(glowRef.current, {
      opacity: 0,
      duration: 2,
      scale: 0.8,
    })
      .from(
        starRef.current,
        {
          opacity: 0,
          y: -20,
          rotation: -45,
          duration: 1,
        },
        "-=1.5"
      )
      .to(
        titleRef.current,
        {
          duration: 2,
          text: "Star Plus Foods",
          ease: "none",
        },
        "-=0.5"
      )
      .from(
        ".coming-soon",
        {
          letterSpacing: "1em",
          opacity: 0,
          duration: 1.5,
        },
        "-=0.8"
      )
      .from(
        ".subscribe-box",
        {
          y: 20,
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      )
      .from(
        ".footer-text",
        {
          opacity: 0,
          duration: 1,
        },
        "-=0.5"
      );

    // Floating animation
    gsap.to(starRef.current, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(glowRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(starRef.current, {
        x: -xPos * 0.5,
        y: -yPos * 0.5,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");

    gsap.fromTo(".success-msg",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  };

  return (
    <main
      ref={container}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-white"
    >
      {/* Background Effects */}
      <div className="grain" />
      <div
        ref={glowRef}
        className="bg-glow absolute left-1/2 top-1/2 -ml-[250px] -mt-[250px] h-[500px] w-[500px] rounded-full bg-rose-500/20 blur-[120px] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div ref={starRef} className="star-icon mb-8 text-rose-500">
          <Star className="h-12 w-12 fill-current" strokeWidth={1} />
        </div>

        <h1
          ref={titleRef}
          className="mb-4 min-h-[1.2rem] text-5xl font-bold tracking-tight md:text-8xl lg:text-9xl bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
        >
          {/* Text animated by GSAP */}
        </h1>

        <p className="coming-soon mb-12 text-sm font-light uppercase tracking-[0.4em] text-rose-500/80 md:text-base font-sans">
          Coming Soon
        </p>

        <div className="subscribe-box relative w-full max-w-md">
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="glass group flex w-full items-center rounded-full p-1 transition-all focus-within:ring-2 focus-within:ring-rose-500/50"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent px-6 py-3 text-sm outline-none placeholder:text-white/30 font-sans"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Send className={`h-4 w-4 ${isSubmitting ? "animate-pulse" : ""}`} />
              </button>
            </form>
          ) : (
            <div className="success-msg text-rose-500 font-medium font-sans">
              We'll notify you when we're ready.
            </div>
          )}
        </div>
      </div>

      <div className="footer-text absolute bottom-12 text-[10px] uppercase tracking-[0.2em] text-white/30 font-sans">
        &copy; 2024 Star Plus Foods. All rights reserved.
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </main>
  );
}
