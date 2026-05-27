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
  useEffect(() => {
    const interval = setInterval(() => {
      if (lp1File && lp2File) {
        uploadDay();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [lp1File, lp2File]);

  async function loadLayout() {
    const response = await fetch("/layout");
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
      const response = await fetch("/upload/day", {
        method: "POST",
        body: formData,
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
        task.assigned_aisle_id === aisleId && task.assigned_row === rowIndex,
    );
  }

  function getDockCount(dockNumber) {
    return tasks.filter((task) => task.assigned_dock === dockNumber).length;
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

        <button onClick={uploadDay}>Przelicz plan</button>

        <span>Sklepy: {tasks.length}</span>

        <div style={styles.legend}>
          <div style={styles.legendItem}>
            <div
              style={{
                ...styles.legendColor,
                background: "#4aa3ff",
              }}
            />
            Standard
          </div>

          <div style={styles.legendItem}>
            <div
              style={{
                ...styles.legendColor,
                background: "#111827",
              }}
            />
            Dolly / Black
          </div>

          <div style={styles.legendItem}>
            <div
              style={{
                ...styles.legendColor,
                background: "#facc15",
              }}
            />
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
        <div style={styles.layoutStage}>
          <img
            src="/warehouse-layout.PNG"
            style={styles.layoutImage}
            alt="Warehouse layout"
          />

          {aisles.map((aisle) => (
            <div
              key={aisle.id}
              style={{
                ...styles.aisle,
                left: `${aisle.x}%`,
                top: `${aisle.y}%`,
                width: `${aisle.width}%`,
                height: `${aisle.height}%`,
              }}
            >
              {[0, 1].map((rowIndex) => {
                const task = getTaskForRow(aisle.id, rowIndex);

                const used = task?.total_quantity || 0;

                const black = task?.black_quantity || 0;

                const blue = Math.max(0, used - black);

                return (
                  <div key={rowIndex} style={styles.aisleRow}>
                    <div style={styles.aisleId}>{aisle.id}</div>

                    <div style={styles.capacityBar}>
                      {Array.from({
                        length: 16,
                      }).map((_, i) => {
                        let background = "#facc15";

                        if (i < blue) {
                          background = "#4aa3ff";
                        }

                        if (i >= blue && i < blue + black) {
                          background = "#111827";
                        }

                        return (
                          <div
                            key={i}
                            style={{
                              ...styles.unitCell,
                              background,
                            }}
                          />
                        );
                      })}
                    </div>

                    <div style={styles.storeBox}>
                      {task ? (
                        <>
                          <div>
                            {task.store_number}
                            {task.overflow_units > 0
                              ? ` +${task.overflow_units}`
                              : ""}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
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
    fontFamily: "Arial",
  },

  header: {
    height: "60px",
    background: "#1f2937",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 16px",
    fontSize: "16px",
  },

  legend: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginLeft: "20px",
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
  },

  legendColor: {
    width: "16px",
    height: "16px",
    border: "1px solid white",
  },

  dockStats: {
    display: "flex",
    gap: "12px",
    padding: "6px 16px",
    fontSize: "13px",
    fontWeight: "bold",
    background: "#f3f4f6",
  },

  canvas: {
    position: "relative",
    width: "100%",
    height: "calc(100vh - 92px)",
    overflow: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  layoutStage: {
    position: "relative",
    width: "1400px",
    height: "900px",
    margin: "0 auto",
  },

  layoutImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    zIndex: 1,
  },

  aisle: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    background: "#facc15",
    border: "2px solid #111827",
    boxSizing: "border-box",
    padding: "2px",
    zIndex: 2,
  },

  aisleRow: {
    display: "grid",
    gridTemplateColumns: "33px 1fr 42px",
    height: "50%",
    gap: "2px",
  },

  aisleId: {
    background: "#d1d5db",
    border: "1px solid #9ca3af",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "9px",
    fontWeight: "bold",
  },

  capacityBar: {
    display: "grid",
    gridTemplateColumns: "repeat(16, 1fr)",
    gap: "1px",
  },

  unitCell: {
    border: "1px solid #9ca3af",
    boxSizing: "border-box",
  },

  storeBox: {
    background: "#ffffff",
    border: "1px solid #9ca3af",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "8px",
    fontWeight: "bold",
    overflow: "hidden",
  },

  timeRow: {
    fontSize: "9px",
    fontWeight: "normal",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
