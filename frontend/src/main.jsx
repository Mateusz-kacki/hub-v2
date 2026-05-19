import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={styles.app}>
      <div style={styles.header}>
        Warehouse Planner
      </div>

      <div style={styles.canvas}>
        PLAN MAGAZYNU
      </div>
    </div>
  );
}

const styles = {
  app: {
    width: "100vw",
    height: "100vh",
    background: "#e5e5e5",
    overflow: "hidden",
    fontFamily: "Arial"
  },

  header: {
    height: "60px",
    background: "#1f2937",
    color: "white",
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
    fontSize: "22px",
    fontWeight: "bold"
  },

  canvas: {
    position: "relative",
    width: "100%",
    height: "calc(100vh - 60px)",
    background: "#ffffff",
    overflow: "hidden"
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
