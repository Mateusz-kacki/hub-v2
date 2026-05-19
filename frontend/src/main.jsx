import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [grids, setGrids] = useState([]);

  useEffect(() => {
    loadLayout();
  }, []);

  async function loadLayout() {
    try {
      const response = await fetch("http://127.0.0.1:8000/layout");
      const data = await response.json();
      setGrids(data.grids || []);
    } catch (error) {
      console.error("Błąd pobierania layoutu:", error);
    }
  }

  return (
    <div style={styles.app}>
      <div style={styles.header}>Warehouse Planner</div>

      <div style={styles.canvas}>
        {grids.map((grid) => (
          <div
            key={grid.id}
            style={{
              ...styles.grid,
              left: `${grid.x}%`,
              top: `${grid.y}%`,
              width: `${grid.width}%`,
              height: `${grid.height}%`,
              gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
              gridTemplateColumns: `repeat(${grid.columns}, 1fr)`
            }}
          >
            {Array.from({ length: grid.rows * grid.columns }).map((_, index) => (
              <div key={index} style={styles.cell}></div>
            ))}
          </div>
        ))}
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
  },

  grid: {
    position: "absolute",
    display: "grid",
    background: "#facc15",
    border: "2px solid #111827",
    boxSizing: "border-box"
  },

  cell: {
    border: "1px solid #9ca3af",
    boxSizing: "border-box"
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
