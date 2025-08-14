import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useContext, useRef } from "react";
import heroImg from "../assets/gamification.png";
import sectionImg1 from "../assets/experience-section.png";
import sectionImg2 from "../assets/disciplines-section.png";
import sectionImg3 from "../assets/quests.png";
import ScrollIcon from "../components/ScrollIcon";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
        </div>
      </motion.div>
    </div>
  );
}

function HomePage() {
  // Parallax for hero image
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, -80]); // slower scroll
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
      {/* HERO */}
      <div className="hero bg-base-200 min-h-[90vh] relative">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <motion.img
            src={heroImg}
            alt="Hero Illustration"
            className="max-w-sm rounded-lg"
            style={{ y: heroY }}
          />
          <div>
            <h1 className="text-5xl font-bold">QuestLog</h1>
            <p className="py-6">
              A place to organize your tasks, and be rewarded for it.
            </p>
            <div className="flex gap-4">
              {isLoggedIn && (
                <>
                  <Link to="/profile">
                    <button className="btn btn-warning">Your Adventure</button>
                  </Link>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <Link to="/signup">
                    <button className="btn btn-secondary">Sign up</button>
                  </Link>
                  <Link to="/login">
                    <button className="btn btn-accent ml-2">Login</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ScrollIcon />

      {/* SECTIONS */}
      <Section
        img={sectionImg3}
        title="Create Quests"
        text="Organize your important goals in Quests. Subdivide them in tasks and add resources to the in the form of 'inventory items'."
      />
      <Section
        img={sectionImg2}
        title="Disciplines and Side Quests"
        text="For those tasks you dont't want to forget, and the daily routines that will improve your self."
        reverse
      />
      <Section
        img={sectionImg1}
        title="Gain Experience"
        text="Every time you complete a Quest, Sidequest or journey, gain experience and watch how your stats keep improving."
      />
    </>
  );
}

export default HomePage;
