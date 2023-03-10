import React from "react";

const useIntersection = () => {
  const [intersection, setInter] = React.useState(false);
  const topRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const top_observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (!intersection) {
          setInter(true);
        }
      }
    });
    const bottom_observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (!intersection) {
          setInter(true);
        }
      }
    });
    if (topRef.current) {
      top_observer.observe(topRef.current);
    }
    if (bottomRef.current) {
      bottom_observer.observe(bottomRef.current);
    }
  }, []);

  return { bottomRef, topRef, intersection };
};

export default useIntersection;
