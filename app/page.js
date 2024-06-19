// pages/index.js
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

export default function Home() {
  const textRef = useRef(null);
  const numberRef = useRef(null);
  const subTextRef = useRef(null);
  const rocketRef = useRef(null);

  useEffect(() => {
    const handleConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    const tl = gsap.timeline({
      onComplete: handleConfetti
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'bounce.out' }
    )
    .fromTo(
      numberRef.current,
      { opacity: 0, scale: 0, rotation: -180 },
      { opacity: 1, scale: 1.5, rotation: 360, duration: 1.5, ease: 'back.out(1.7)' },
      "-=1"
    )
    .to(numberRef.current, { scale: 1.2, duration: 0.5, ease: 'bounce.out' })
    .fromTo(
      subTextRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      "-=0.5"
    )
    .to(
      rocketRef.current,
      { x: 1000, y: -1000, duration: 2, ease: 'power3.out', delay: 1 }
    );

    numberRef.current.addEventListener('mouseenter', handleConfetti);

    // Cleanup event listener on unmount
    return () => {
      numberRef.current.removeEventListener('mouseenter', handleConfetti);
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 ref={textRef} style={styles.text}>
          You had <span ref={numberRef} style={styles.number}>420k</span> in sales.
        </h1>
        <h2 ref={subTextRef} style={styles.subText}>
          That's a <span style={styles.increase}>69%</span> increase from last month <span ref={rocketRef} style={styles.rocket}>🚀</span>
        </h2>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #000000, #4b0082)', // Black to purple gradient
    position: 'relative',
    overflow: 'hidden'
  },
  wrapper: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  text: {
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  number: {
    color: '#ffeb3b', // Bright yellow for contrast
    fontSize: '5rem', // Larger size for the number
    fontWeight: 'bold',
    display: 'inline-block',
    cursor: 'pointer',
    margin: '1rem', // Add margin to create space around the number
  },
  subText: {
    fontSize: '1.5rem', // Smaller size for the subtext
    color: '#fff', // White color for subtext
  },
  increase: {
    color: '#ffeb3b', // Yellow for the increase percentage
    fontSize: '2rem', // Slightly larger for emphasis
    fontWeight: 'bold',
    display: 'inline-block',
  },
  rocket: {
    display: 'inline-block',
  },
};
