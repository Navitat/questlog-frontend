import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import heroImg from "../assets/gamification.png";
import sectionImg1 from "../assets/gamification.png";
import sectionImg2 from "../assets/gamification.png";
import sectionImg3 from "../assets/gamification.png";
import sectionImg4 from "../assets/gamification.png";
import ScrollIcon from "../components/ScrollIcon";

function Section({ img, title, text, reverse }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="bg-base-100 py-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className={`container mx-auto px-4 flex flex-col ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } items-center gap-8`}
      >
        <img src={img} alt={title} className="max-w-md rounded-lg shadow-lg" />
        <div>
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="mb-4">{text}</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </motion.div>
    </div>
  );
}

function HomePage() {
  // Parallax for hero image
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, -80]); // slower scroll

  return (
    <>
      {/* HERO */}
      <div className="hero bg-base-200 min-h-screen relative">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <motion.img
            src={heroImg}
            alt="Hero Illustration"
            className="max-w-sm rounded-lg"
            style={{ y: heroY }}
          />
          <div>
            <h1 className="text-5xl font-bold">Your Hero Title</h1>
            <p className="py-6">
              This is where your description goes. You can describe your
              product, service, or anything you want to highlight.
            </p>
            <div className="flex gap-4">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
      <ScrollIcon />

      {/* SECTIONS */}
      <Section
        img={sectionImg1}
        title="What Can This App Do?"
        text="Our app offers cutting-edge tools that combine speed, security, and flexibility. Access it globally, customize your experience, and collaborate in real-time with your team."
      />
      <Section
        img={sectionImg2}
        title="Seamless Collaboration"
        text="Work in real-time with colleagues from anywhere in the world, making teamwork faster and more productive."
        reverse
      />
      <Section
        img={sectionImg3}
        title="Advanced Analytics"
        text="Gain powerful insights into your usage patterns, helping you make informed decisions and optimize your workflow."
      />
      <Section
        img={sectionImg4}
        title="Customizable to Your Needs"
        text="Tailor the app to your exact needs with a wide range of settings and personalization options."
        reverse
      />
    </>
  );
}

export default HomePage;
