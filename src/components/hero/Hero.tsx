import React from "react";
import heroImage from "./hero.jpg"; // Import the image

const Hero: React.FC = () => {
  return (
    <section style={{ ...heroStyle, backgroundImage: `url(${heroImage})` }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={svgStyle}
      >
        <path
          fill="#f9fafb"
          fill-opacity="1"
          d="M0,160L48,154.7C96,149,192,139,288,144C384,149,480,171,576,186.7C672,203,768,213,864,208C960,203,1056,181,1152,192C1248,203,1344,245,1392,266.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};

// Styles as JavaScript objects
const heroStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "550px",
  opacity: 0.7,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const svgStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "-1%",
};

export default Hero;
