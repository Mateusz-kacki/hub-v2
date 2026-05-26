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
      {aisles
  .filter((aisle) =>
    tasks.some(
      (task) =>
        task.assigned_aisle_id === aisle.id
    )
  )
  .map((aisle) => (
        style={{
  ...styles.aisle,
  left: `${aisle.x}%`,
  top: `${aisle.y}%`,
  width: `${aisle.width}%`,
  height: `${aisle.height}%`
}}
          > 
            <div style={styles.dockLabel}>
  DOK {grid.dock}
</div>
{[0, 1].map((rowIndex) => {
  const task = getTaskForRow(
    aisle.id,
    rowIndex
  );

  const used =
    task?.total_quantity || 0;

  const black =
    task?.black_quantity || 0;

  const blue =
    Math.max(0, used - black);

  return (
    <div
      key={rowIndex}
      style={styles.aisleRow}
    >
      <div style={styles.aisleId}>
        {aisle.id}
      </div>

      <div style={styles.capacityBar}>
        {Array.from({
          length: 16
        }).map((_, i) => {
          let background = "#facc15";

          if (i < blue) {
            background = "#4aa3ff";
          }

          if (
            i >= blue &&
            i < blue + black
          ) {
            background = "#111827";
          }

          return (
            <div
              key={i}
              style={{
                ...styles.unitCell,
                background
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
            </div>

            <div style={styles.timeRow}>
              {task.arrival_time || "-"}
              {" → "}
              {task.departure_time || "-"}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
})}
