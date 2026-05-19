import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [grids, setGrids] = useState([]);

  const [lp1File, setLp1File] = useState(null);
  const [lp2File, setLp2File] = useState(null);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadLayout();
  }, []);

  async function loadLayout() {
    const response = await fetch("http://127.0.0.1:8000/layout");
    const data = await response.json();

    setGrids(data.grids || []);
  }

  async function uploadDay() {
    if (!lp1File || !lp2File) {
      alert("Wybierz LP1 i LP2");
      return;
    }

    const formData = new FormData();

    formData.append("lp1", lp1File);
    formData.append("lp2", lp2File);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/day", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      setTasks(data.tasks || []);

      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Błąd uploadu");
    }
  }

  function getTaskForRow(gridId, rowIndex) {
    return tasks.find(
      (task) =>
        task.assigned_grid_id === gridId &&
        task.assigned_row === rowIndex
    );
  }

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <strong>Warehouse Planner</strong>

        <label>
          LP1:
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setLp1File(e.target.files[0])}
          />
        </label>

        <label>
          LP2:
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => setLp2File(e.target.files[0])}
          />
        </label>

        <button onClick={uploadDay}>
          Przelicz plan
        </button>
      </div>

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
            {Array.from({
              length: grid.rows * grid.columns
            }).map((_, index) => {
              const rowIndex = Math.floor(index / grid.columns);
              const colIndex = index % grid.columns;

              const task = getTaskForRow(grid.id, rowIndex);

              const isTextColumn = colIndex === grid.columns - 1;

              let background = "#facc15";

              if (task && !isTextColumn) {
                if (colIndex >= grid.columns - 1 - task.black_quantity) {
                  background = "#111827";
                } else if (colIndex >= grid.columns - 1 - task.total_quantity) {
                  background = "#4aa3ff";
                }
              }

              return (
                <div
                  key={index}
                  style={{
                    ...styles.cell,
                    background
                  }}
                >
                  {task && isTextColumn ? task.store_number : ""}
                </div>
              );
            })}
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
    gap: "12px",
    padding: "0 16px",
    fontSize: "16px"
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
  boxSizing: "border-box",

  fontSize: "11px",
  fontWeight: "bold",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  overflow: "hidden"
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
