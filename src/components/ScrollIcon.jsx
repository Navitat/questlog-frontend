import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // npm install lucide-react

export default function ScrollIcon() {
  return (
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      onClick={() => {
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
      }}
    >
      <p className="text-primary font-semibold"> Explore Features</p>
      <ChevronDown size={32} className="text-primary" />
    </motion.div>
  );
}
