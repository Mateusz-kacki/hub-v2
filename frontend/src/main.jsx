import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
const [aisles, setAisles] = useState([]);

  const [lp1File, setLp1File] = useState(null);
  const [lp2File, setLp2File] = useState(null);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadLayout();
  }, []);

  async function loadLayout() {
    const response = await fetch("http://127.0.0.1:8000/layout");
    const data = await response.json();

setAisles(data.aisles || []);
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

function getTaskForRow(aisleId, rowIndex) {
  return tasks.find(
    (task) =>
      task.assigned_aisle_id === aisleId &&
      task.assigned_row === rowIndex
  );
}
  }
  function getDockCount(dockNumber) {
  return tasks.filter(
    (task) => task.assigned_dock === dockNumber
  ).length;
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
        <span>
  Sklepy: {tasks.length}
</span>

        <div style={styles.legend}>
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, background: "#4aa3ff" }} />
            Standard
          </div>

          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, background: "#111827" }} />
            Dolly / Black
          </div>

          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, background: "#facc15" }} />
            Wolne
          </div>
        </div>
      </div>
      <div style={styles.dockStats}>
  <div>DOK 16 → {getDockCount(16)}</div>
  <div>DOK 17 → {getDockCount(17)}</div>
  <div>DOK 18 → {getDockCount(18)}</div>
</div>

      <div style={styles.canvas}>
        {grids
  .filter((grid) =>
    tasks.some(
      (task) =>
        task.assigned_grid_id === grid.id
    )
  )
  .map((grid) => (
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
            <div style={styles.dockLabel}>
  DOK {grid.dock}
</div>
            {Array.from({
              length: grid.rows * grid.columns
            }).map((_, index) => {
              const rowIndex = Math.floor(index / grid.columns);
              const colIndex = index % grid.columns;

              const task = getTaskForRow(grid.id, rowIndex);

              const isTextColumn = colIndex === grid.columns - 1;

              let background = "#facc15";
            if (colIndex === 0) {
  background = "#d1d5db";
            }

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
                  <>
  {colIndex === 0 ? rowIndex + 1 : ""}

{task && isTextColumn
 ? (
  <div style={styles.storeInfo}>
    <div>{task.store_number}</div>

    <div style={styles.timeRow}>
      {task.arrival_time || "-"}
      {" → "}
      {task.departure_time || "-"}
    </div>
  </div>
)
  : ""}
</>
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

  legend: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginLeft: "20px"
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px"
  },

  legendColor: {
    width: "16px",
    height: "16px",
    border: "1px solid white"
  },
  dockStats: {
  display: "flex",
  gap: "12px",
  marginLeft: "20px",
  fontSize: "13px",
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
  dockLabel: {
  position: "absolute",
  top: "-22px",
  left: "0",
  fontSize: "13px",
  fontWeight: "bold",
  color: "#111827"
},
  storeInfo: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: "1.1"
},

timeRow: {
  fontSize: "9px",
  fontWeight: "normal"
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
