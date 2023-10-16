import './App.css';
import { useEffect, useRef, useState } from "react";
import Three from './Three'
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function App() {
  const [loading, setLoading] = useState(true);
  let scrollPercent: number = 0;
  let scrollHidden: boolean = true;
  let scrolling = useRef<HTMLDivElement>(null);
  let totalHeight: number;
  let scrollY: number;
  let sections: any[];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    sections = gsap.utils.toArray("#three section");
    totalHeight = sections.length * window.innerHeight;
  }, []);

  const loaded = () => {
    console.log('FINAL MOUNT')
    setLoading(false);
    textReveal();

    if (scrolling.current) {
      scrolling.current.onscroll = () => {
        if (!scrolling.current) return;

        scrollPercent =
          (scrolling.current.scrollTop /
            (scrolling.current.scrollHeight - scrolling.current.clientHeight)) *
          100;

        scrollY = scrolling.current?.scrollTop;
        if (scrollPercent > 1) toggleScroll(true);
        else toggleScroll(false);
      };
    };
  }

  const toggleScroll = (hide: boolean) => {
    if (hide == scrollHidden) return;

    scrollHidden = hide;
    gsap.fromTo(
      ".scroll-dots",
      {
        opacity: hide ? 1 : 0,
        duration: 0.2,
        ease: "power1.out",
      },
      {
        opacity: hide ? 0 : 1,
        duration: 0.2,
        ease: "power1.out",
      }
    );
  };

  const textReveal = () => {
    const tl = gsap.timeline();

    tl.from(".hero-text", 1.8, {
      y: 100,
      ease: "power4.out",
      delay: 1,
      skewY: 7,
      stagger: {
        amount: 0.3,
      },
    });
  };

  return (
    <main>
      <Three scrollPercent={scrollPercent} onMount={loaded} />
      <div ref={scrolling} id="scrolling" className={loading ? "hide" : ""}>
        <div id="three">
          <section className="hero">
            <div className="block">
              <div className="line">
                <h1 className="name hero-text">Hi, I'm Nestor</h1>
              </div>
              <div className="line">
                <h2 className="position hero-text">I live in Amsterdam 🧡</h2>
              </div>
            </div>

            <div className="block scroll-dots">
              <span className="dot dot3" />
              <span className="dot dot2" />
              <span className="dot dot1" />
              <span>Scroll down</span>
            </div>
          </section>
          <section className="section2">
            <h2 className="web-development">
              I am passionate about web development
            </h2>
          </section>
          <section>
            <h2>Changing Objects Position</h2>
            <p>The cubes position is now changing</p>
          </section>

          <section>
            <h2>Changing Objects Rotation</h2>
            <p>The cubes rotation is now changing</p>
          </section>

          <section>
            <h2>Changing Camera Position</h2>
            <p>The camera position is now changing</p>
          </section>

          <section>
            <h2>You are at the bottom</h2>
            <p>The cube will now be auto rotating</p>
            <p>Now you can scroll back to the top to reverse the animation</p>
          </section>
        </div>
      </div>
    </main>
  );
}
