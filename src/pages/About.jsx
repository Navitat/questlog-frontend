// About.jsx
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full card shadow-xl bg-base-100">
        <div className="card-body">
          <h1 className="card-title text-4xl font-bold mb-4">About Me</h1>
          <p className="text-lg leading-relaxed text-base-content">
            Welcome to QuestLog! This was an app created for the final project
            on the Web Development Bootcamp at Ironhack. My reason to built it
            was simple, I wanted an app like this to organize my life in a
            better an exciting way, and in my opinion it is reaching that goal.
            But, there is still room for improvement.
          </p>
          <p className="text-lg leading-relaxed text-base-content mt-4">
            This project is built using{" "}
            <span className="font-semibold">React </span>
            and styled with <span className="font-semibold">daisyUI</span> +
            Tailwind CSS, ensuring a sleek and consistent look across all
            devices. I believe in clean design, focused on{" "}
            <span className="font-semibold">mobile-first</span>.
          </p>

          {/* Developer Section */}
          <div className="divider mt-8">Developer</div>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold">
              Andres Felipe Londoño Martinez
            </h2>
            <p className="text-base-content mt-2">Junior Web Developer</p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/Navitat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle text-xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/andres-felipe-londoño-martinez-a14515203/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle text-xl text-primary"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
