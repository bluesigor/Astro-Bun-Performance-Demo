import { Database } from "bun:sqlite";

// ---- SERVER START (cold start measurement)
const serverStart = performance.now();

// ---- DB SETUP
const db = new Database("db/data.sqlite");

// reset for demo
db.run(`DROP TABLE IF EXISTS parts`);

db.run(`
  CREATE TABLE parts (
    id INTEGER PRIMARY KEY,
    path TEXT NOT NULL,
    part_number TEXT,
    status TEXT,
    quantity INTEGER,
    cost REAL,
    supplier TEXT,
    created TEXT
  )
`);

const insert = db.prepare(`
  INSERT INTO parts
  (path, part_number, status, quantity, cost, supplier, created)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const plants = ["Plant-A", "Plant-B", "Plant-C"];
const areas = ["Manufacturing", "Assembly"];
const lines = Array.from({ length: 6 }, (_, i) => `Line-${i + 1}`);
const stations = Array.from({ length: 6 }, (_, i) => `Station-${i + 1}`);
const assemblies = Array.from({ length: 6 }, (_, i) => `Assembly-${i + 1}`);
const parts = Array.from({ length: 6 }, (_, i) => `Part-${i + 1}`);

let count = 0;

for (const plant of plants) {
  for (const area of areas) {
    for (const line of lines) {
      for (const station of stations) {
        for (const assembly of assemblies) {
          for (const part of parts) {
            const path = [plant, area, line, station, assembly, part];

            insert.run(
              JSON.stringify(path),
              `${assembly}-${part}`,
              Math.random() > 0.2 ? "ACTIVE" : "INACTIVE",
              Math.ceil(Math.random() * 20),
              +(Math.random() * 500).toFixed(2),
              `Supplier-${Math.ceil(Math.random() * 20)}`,
              "2024-01-01"
            );

            count++;
          }
        }
      }
    }
  }
}

console.log(`Seeded ${count} rows`);

// ---- SERVER
Bun.serve({
  port: 3001,
  fetch() {
    // query timing (PER REQUEST)
    const start = performance.now();

    const rows = db
      .query(
        `
        SELECT
          id,
          path,
          part_number,
          status,
          quantity,
          cost,
          supplier,
          created
        FROM parts
      `
      )
      .all();

    const queryTime = performance.now() - start;

    const result = rows.map((r) => ({
      ...r,
      path: JSON.parse(r.path),
    }));

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Expose-Headers":
          "X-Query-Time, X-Cold-Start, X-Runtime",
        "X-Query-Time": queryTime.toFixed(2),
        "X-Cold-Start": (performance.now() - serverStart).toFixed(2),
        "X-Runtime": "bun",
      },
    });
  },
});

console.log("Bun API running on http://localhost:3001");
