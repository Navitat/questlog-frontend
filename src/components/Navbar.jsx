import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full relative">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <p className="btn btn-primary rounded-none text-lg">QuestLog</p>
            </Link>
          </div>
          <div className="hidden flex-none lg:block ml-auto">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              {isLoggedIn && (
                <>
                  <Link to="/profile">
                    <button className="btn btn-warning">Your Adventure</button>
                  </Link>
                  <button onClick={logOutUser} className="btn btn-neutral ml-2">
                    Logout
                  </button>
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
            </ul>
          </div>
        </div>
        {/* Page content here */}
        {/* Content */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {isLoggedIn && (
            <>
              <Link to="/profile">
                <button className="btn btn-warning mb-2">Your Adventure</button>
              </Link>
              <button className="btn btn-neutral">Logout</button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/signup">
                <button className="btn btn-secondary mb-2">Sign up</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-accent">Login</button>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
