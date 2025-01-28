import React, { useState, useRef, useEffect } from "react";

export const LoginPage = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password); // Pass the entered password to the parent
  };

  const CardScroller = () => {
    const scrollContainerRef = useRef(null);
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -container.offsetWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: container.offsetWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollIndex = 0;
    let direction = "forward"; // Start with forward direction
  
    const slideCards = () => {
      if (!isPaused && scrollContainer) {
        const totalCards = scrollContainer.children.length;
        const cardWidth = scrollContainer.children[0].offsetWidth + 24; // Card width + gap
  
        // Determine the next scroll position
        if (direction === "forward") {
          scrollIndex++;
          if (scrollIndex >= totalCards - 1) {
            direction = "reverse"; // Switch to reverse when reaching the last card
          }
        } else {
          scrollIndex--;
          if (scrollIndex <= 0) {
            direction = "forward"; // Switch to forward when reaching the first card
          }
        }
  
        const scrollLeft = scrollIndex * cardWidth;
  
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    };
  
    const intervalId = setInterval(slideCards, 3500); // Change card every 3.5 seconds
  
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [isPaused]);
  


  return (
    <div className="flex w-full h-screen">
      {/* Left Section - Header and Horizontal Scroll Cards */}
      <div className="flex flex-col w-3/5 bg-black text-white">
        {/* Header */}
        <div className="flex justify-center items-center py-4">
          <h1
            className="text-[46px] font-bold text-center py-6 pt-36"
            style={{
              color: "#FFFFFF",
              lineHeight: "40px",
            }}
          >
            AI Legal Workbench
          </h1>
        </div>
        {/* Horizontal Scrollable Cards */}

        <div className="relative flex justify-center items-center h-[500px]">
          {/* Left Icon */}
          <button
            className="absolute left-0 z-10 text-white rounded-full pl-36 shadow-lg"
            onClick={scrollLeft}
            aria-label="Scroll Left"
          >
            &lt;
          </button>

          {/* Card Container */}
          <div
      ref={scrollContainerRef}
      className="flex overflow-x-scroll snap-x snap-mandatory gap-6 px-4 w-[60%] h-[400px]"
      style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
      // className="flex overflow-x-scroll snap-x snap-mandatory gap-6 px-4 w-[60%] h-[400px]"
      // style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on mouse leave
    >
      {/* Card 1 */}
      <div
        className="w-[34vw] h-[380px] bg-black text-center flex flex-col justify-center p-6 rounded-lg shadow-lg snap-center"
        style={{ flex: "0 0 auto", border: "solid 1px #C7C7C7" }}
      >
        <h3 className="text-2xl font-bold">Auto Review</h3>
        <ul className="list-disc list-inside mt-4 text-left">
          <li className="text-md leading-5 text-white px-3 py-1 rounded shadow">
            Automated contract and document review for errors
          </li>
          <li className="text-sm leading-5 text-white px-3 py-1 rounded shadow">
            Identify critical clauses, obligations, and risks instantly
          </li>
          <li className="text-md leading-5 text-white px-3 py-1 rounded shadow">
            Generate comprehensive review summaries in seconds
          </li>
        </ul>
      </div>
      {/* Card 2 */}
      <div
        className="w-[34vw] h-[380px] bg-black text-center flex flex-col justify-center p-6 rounded-lg shadow-lg snap-center"
        style={{ flex: "0 0 auto", border: "solid 1px #C7C7C7" }}
      >
        <h3 className="text-2xl font-bold">Case Research</h3>
        <ul className="list-disc list-inside mt-4 text-left">
          <li className="text-md leading-5 text-white px-3 py-1 mb-2 rounded shadow">
            Search for relevant case laws and precedents effortlessly
          </li>
          <li className="text-md leading-5 text-white px-3 py-1 mb-2 rounded shadow">
            Analyze judgments with contextual insights
          </li>
          <li className="text-md leading-5 text-white px-3 py-1 mb-2 rounded shadow">
            Summarize legal findings for quick decision-making
          </li>
        </ul>
      </div>
      {/* Card 3 */}
      <div
        className="w-[34vw] h-[380px] bg-black text-center flex flex-col justify-center p-6 rounded-lg shadow-lg snap-center"
        style={{ flex: "0 0 auto", border: "solid 1px #C7C7C7" }}
      >
        <h3 className="text-2xl font-bold">Case Draft</h3>
        <ul className="list-disc list-inside mt-4 text-left">
          <li className="text-md leading-5 text-white px-3 py-1 mb-2 rounded shadow">
            Draft legal documents, petitions, and briefs with precision
          </li>
          <li className="text-md leading-5 text-white px-3 py-1 mb-2 rounded shadow">
            Customize templates based on jurisdiction and case type
          </li>
          <li className="text-md leading-5 text-white px-3 py-1 mb-2 rounded shadow">
            Reduce manual effort with AI-assisted legal writing
          </li>
        </ul>
      </div>
    </div>

          {/* Right Icon */}
          <button
            className="absolute right-0 z-10 text-white rounded-full pr-36 shadow-lg"
            onClick={scrollRight}
            aria-label="Scroll Right"
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="w-2/5 bg-white flex flex-1 gap-10 flex-col justify-center items-center">
        <div className="flex justify-center mb-6">
          <img
            src="assets/logo_name.png"
            alt="Logo"
            className="h-16 z-20 bg-white"
          />
        </div>

        <div
          className="p-8 rounded-lg shadow-lg w-3/4 max-w-md"
          style={{ backgroundColor: "#FAF5EB" }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              autoFocus
              className="h-[40px] p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="h-[40px] p-2 border border-gray-300 rounded"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
