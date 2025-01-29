// import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import { LoginPage } from "./LoginPage";

// const ENCRYPTED_PASSWORD = btoa(import.meta.env.VITE_DEMO_PASS);  // Mock password encryption


// console.log(import.meta.env.DEMO_PASS)
// function Layout() {
//   const [localUser, setLocalUser] = useState(localStorage.getItem("auth"));

//   useEffect(() => {
//     const authStatus = localStorage.getItem("auth");
//     setLocalUser(authStatus === "true");
//   }, []);

//   const handleLogin = (password) => {
//     if (btoa(password) === ENCRYPTED_PASSWORD) {
//       localStorage.setItem("auth", "true"); // Save auth status
//       window.location.reload();
//       setLocalUser(true); // Update state to re-render the component
//     } else {
//       alert("Invalid password or Username"); // Simple feedback for demo
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("auth"); // Remove auth status
//     setLocalUser(false); // Update state to re-render the component
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar displayed only if the user is logged in */}
//       {localUser && (
//         <div className="overflow-hidden z-50 fixed">
//           <Sidebar onLogout={handleLogout} />
//         </div>
//       )}

//       {/* Login page displayed if the user is not logged in */}
//       {!localUser && <LoginPage onLogin={handleLogin} />}

//       {/* Main content area */}
//       {localUser && (
//         <div className="overflow-y-scroll w-full">
//           <Outlet />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Layout;




import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LoginPage } from "./LoginPage";

const ENCRYPTED_PASSWORD = btoa(import.meta.env.VITE_DEMO_PASS);

function Layout() {
  const [localUser, setLocalUser] = useState(localStorage.getItem("auth"));
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem("auth");
    setLocalUser(authStatus === "true");
  }, []);

  const handleLogin = (password) => {
    if (btoa(password) === ENCRYPTED_PASSWORD) {
      localStorage.setItem("auth", "true");
      window.location.reload();
      setLocalUser(true);
    } else {
      alert("Invalid password or Username");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setLocalUser(false);
  };

  const handleSidebarToggle = (expanded) => {
    setIsSidebarExpanded(expanded);
  };

  return (
    <div className="flex">
      {localUser && (
        <div className="overflow-hidden z-50 fixed">
          <Sidebar 
            onLogout={handleLogout} 
            onSidebarToggle={handleSidebarToggle}
            isExpanded={isSidebarExpanded}
          />
        </div>
      )}

      {!localUser && <LoginPage onLogin={handleLogin} />}

      {localUser && (
        <div 
          className="overflow-y-scroll w-full transition-all duration-300"
          style={{ 
            marginLeft: isSidebarExpanded ? "192px" : "80px" // 48px (w-48) -> 20px (w-20)
          }}
        >
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default Layout;