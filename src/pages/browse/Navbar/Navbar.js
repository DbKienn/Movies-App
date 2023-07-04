import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

function ButtonSearch() {
  window.location.replace("./search");
}
function HomePage() {
  window.location.replace("./");
}
function Navbar() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setIsScrolling(true);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`navbar ${isScrolling ? "nav-scrolling" : "nav-container"}`}
    >
      <nav>
        <h1 className="nav-title" onClick={HomePage}>
          Movie App
        </h1>
        <button className="btn btn-search" onClick={ButtonSearch}>
          <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} />
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
