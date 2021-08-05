import React from "react";

const Span = ({style={}}:{style?:any}) => (
  <span 
    className="bg-dark"
    style={{ 
      width: "2rem",
      height: "0.25rem",
      borderRadius: 10,
      transition: "all 0.3s linear",
      position: "relative",
      transformOrigin: 1,
      ...style
    }} 
  />
)

export default (
  { open, setOpen, style={}, className=""}:
  { open: boolean, setOpen: (setTo: boolean ) => void, style?: any, className?: string }
) => {
  const styles = {
    button: {
      height: "2rem",
      right: "2rem",
      top: "5%",
      width: "2rem",
    },
    span1: {
      transform: `${open ? "rotate(45deg)" : "rotate(0)"}`,
    },
    span2: {
      opacity: `${open ? "0" : "1"}`,
      transform: `${open ? "translateX(20px)" : "translateX(0)"}`,
    },
    span3: {
      transform: `${open ? "rotate(-45deg)" : "rotate(0)"}`,
    }
  };

  return (
    <button
      style={{...styles.button, ...style}}
      className={`
        d-flex
        flex-column
        justify-content-around
        border-none
        cursor-pointer
        p-0
        z-index-5
        ${className}
      `}
      aria-label="Toggle menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
    >
      <Span style={styles.span1} />
      <Span style={styles.span2} />
      <Span style={styles.span3} />
    </button>
  );
};
