import http from "node:http";
import Database from "better-sqlite3";

const db = new Database("db/data.sqlite");
const serverStart = performance.now();

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    res.writeHead(404);
    return res.end();
  }

  const start = performance.now();

  const rows = db
    .prepare(
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
    .all()
    .map((r) => ({ ...r, path: JSON.parse(r.path) }));

  const duration = performance.now() - start;

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": "X-Query-Time, X-Cold-Start, X-Runtime",
    "X-Query-Time": duration.toFixed(2),
    "X-Cold-Start": (performance.now() - serverStart).toFixed(2),
    "X-Runtime": "node",
  });

  res.end(JSON.stringify(rows));
});

server.listen(3002, () => {
  console.log("Node API running on http://localhost:3002");
});
