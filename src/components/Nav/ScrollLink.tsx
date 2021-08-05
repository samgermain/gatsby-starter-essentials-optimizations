import React from "react";
import * as Scroll from "react-scroll";

const scrollOffset = -50;

const ScrollLink = (
  { to, children, className="", style={} }:
  { to: string, className?: string, style?: any, children: any}
) => {
  return (
    <Scroll.Link
      to={to}
      activeClass={to === "root" ? "" : "active"}
      spy={true}
      smooth={true}
      offset={scrollOffset}
      duration={500}
      style={style}
      className={className}
    >
      {children}
    </Scroll.Link>
  );
};

export default ScrollLink;
