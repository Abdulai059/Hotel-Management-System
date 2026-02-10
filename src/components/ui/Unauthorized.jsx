import React from "react";

export default function Unauthorized() {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>⛔ Unauthorized</h1>
      <p>You don't have permission to access this page.</p>
      <a href="/" style={{ color: "#2196F3" }}>
        Go to Dashboard
      </a>
    </div>
  );
}
