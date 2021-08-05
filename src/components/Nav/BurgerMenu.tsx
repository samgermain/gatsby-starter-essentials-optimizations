import React from "react";

const BurgerMenu = (
  {open, dropdown, navHeight = 60, className = "", children}:
  {open: boolean, dropdown: boolean, navHeight?: number, className?: string, children: any}
) => {
  
  const axis = dropdown ? "Y(-" : "X(";

  let style = {
    height: !dropdown && "100vh",
    marginTop: dropdown && navHeight,
    transform: open ? `translate${axis}0)` : `translate${axis}100%)`,
    transition: "height 0.3s ease-in-out, transform 0.3s ease-in-out",
  };

  return (
    <nav
      id="burgerMenu"
      style={style}
      aria-hidden={!open}
      hidden={!open}
      className={`
        shadow-2 
        t-0
        r-0
        p-4
        z-index-4
        text-left 
        flex-center-md-row 
        position-absolute 
        ${className} 
      `}
    >
      {children}
    </nav>
  );
};

export default BurgerMenu;
