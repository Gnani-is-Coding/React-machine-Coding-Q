import "./InfiniteScroll.css";
import React, { useEffect, useState } from "react";

function InfiniteScroll() {
  const [count, setCount] = useState(10);

  const handleScroll = (e) => {
    {
      /* window.innerHeight gives the visible(viewport) height, similllary window.innerWidth 
      window.scrollY gives no..of pixels, currently being scrolled in y-axis. 
      document.body.scrollHeight  gives the height of entire doc including the portion not visible in viewport. 
      */
    }

    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      console.log("BOTTOM REACHED");
      setCount((prevCount) => prevCount + 10);
    }
  };

  window.addEventListener("scroll", handleScroll);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const elements = [];

  for (let i = 0; i < count; i++) {
    elements.push(
      <li className="card" key={i}>
        {i + 1}
      </li>
    );
  }

  return (
    <div className="container">
      <h1 className="heading">Instagram's Infinite Scrolling Technique</h1>

      <ul id="block" className="elements-container">
        {elements}
      </ul>
    </div>
  );
}

export default InfiniteScroll;
