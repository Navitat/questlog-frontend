import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-300 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link to="/about" className="link link-hover">
          About us
        </Link>
      </nav>
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
}

export default Footer;
