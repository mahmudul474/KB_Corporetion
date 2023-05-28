import React from "react";

const Animation = ({text}) => {
  const bounceAnimation = {
    "@keyframes bounce": {
      "0%, 100%": {
        transform: "translateY(0)"
      },
      "50%": {
        transform: "translateY(-20px)"
      }
    },
    animationName: "bounce",
    animationDuration: "1s",
    animationIterationCount: "infinite"
  };

  const partyPopperStyle = {
    fontSize: "6rem"
  };

  const comingSoonTextStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginTop: "1rem"
  };

  return (
    <div className="flex flex-col items-center">
      <div style={bounceAnimation}>
        <span role="img" aria-label="Party Popper" style={partyPopperStyle}>
          🎉
        </span>
      </div>
      <p style={comingSoonTextStyle}>{text} Coming Soon</p>
    </div>
  );
};

export default Animation;
