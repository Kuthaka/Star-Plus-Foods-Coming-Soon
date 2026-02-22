"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";
import { Send, Star, Volume2, VolumeX } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(videoRef.current, {
      opacity: 1,
      duration: 2.5,
    })
      .from(
        starRef.current,
        {
          opacity: 0,
          y: -30,
          rotation: -45,
          scale: 0.5,
          duration: 1.2,
        },
        "-=1.8"
      )
      .to(
        titleRef.current,
        {
          duration: 2,
          text: "Star Plus Foods",
          ease: "none",
        },
        "-=0.8"
      )
      .from(
        ".coming-soon",
        {
          letterSpacing: "1.5em",
          opacity: 0,
          duration: 1.5,
        },
        "-=1"
      )
      .from(
        ".subscribe-box",
        {
          y: 30,
          opacity: 0,
          duration: 1.2,
        },
        "-=0.8"
      )
      .from(
        ".footer-text, .volume-control",
        {
          opacity: 0,
          duration: 1,
          stagger: 0.2,
        },
        "-=0.5"
      );

    // Floating animation
    gsap.to(starRef.current, {
      y: 10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(videoRef.current, {
        scale: 1.08,
        x: xPos * 0.3,
        y: yPos * 0.3,
        duration: 2,
        ease: "power2.out",
      });

      gsap.to(starRef.current, {
        x: -xPos * 0.7,
        y: -yPos * 0.7,
        duration: 2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container });

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);

      if (!newMuted) {
        videoRef.current.play().catch(e => console.log("Play failed", e));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
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
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-0 transition-opacity duration-1000 scale-110 pointer-events-none"
        >
          <source src="/star-plus/Star-Plus-Portrait.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
        <div className="grain" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div ref={starRef} className="star-icon mb-6 text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]">
          <Star className="h-10 w-10 md:h-16 md:w-16 fill-current" strokeWidth={1} />
        </div>

        <h1
          ref={titleRef}
          className="mb-4 min-h-[1.2em] text-4xl font-bold tracking-tight md:text-8xl lg:text-[10rem] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
        >
        </h1>

        <p className="coming-soon mb-12 text-xs font-light uppercase tracking-[0.5em] text-rose-500 md:text-lg font-sans drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          Coming Soon
        </p>

        <div className="subscribe-box relative w-full max-w-md">
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="glass group flex w-full items-center rounded-full p-1 transition-all focus-within:ring-2 focus-within:ring-rose-500/50 shadow-2xl"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent px-6 py-4 text-sm outline-none placeholder:text-white/40 font-sans"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white transition-all active:scale-90 disabled:opacity-50 cursor-pointer hover:bg-rose-600 shadow-lg shadow-rose-500/20"
              >
                <Send className={`h-5 w-5 ${isSubmitting ? "animate-pulse" : ""}`} />
              </button>
            </form>
          ) : (
            <div className="success-msg text-white bg-rose-500/30 backdrop-blur-md border border-rose-500/50 px-8 py-4 rounded-full font-sans shadow-2xl">
              We'll notify you when we're ready.
            </div>
          )}
        </div>
      </div>

      {/* Volume Control */}
      <div className="volume-control absolute top-8 right-8 z-20">
        <button
          onClick={toggleMute}
          className="glass flex h-14 w-14 items-center justify-center rounded-full text-white transition-all hover:bg-white/10 active:scale-90 shadow-xl border border-white/10"
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>
      </div>

      <div className="footer-text absolute bottom-12 text-[10px] uppercase tracking-[0.3em] text-white/40 font-sans drop-shadow-md">
        &copy; {new Date().getFullYear()} Star Plus Foods. All rights reserved.
      </div>
    </main>
  );
}
