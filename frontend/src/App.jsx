import React from "react";

const App = () => {
  return (
    <>
      <button
        onClick={() =>
          (window.location.href = "http://localhost:5000/auth/google")
        }
      >
        Google
      </button>
      <button
        onClick={() =>
          (window.location.href = "http://localhost:5000/auth/facebook")
        }
      >
        Facebook
      </button>
    </>
  );
};

export default App;
