const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const SECRET = "real-data-api-secret";

const PORT = 4000;
const app = express();
app.set("json spaces", 2);
app.use(express.json());

function getDb() {
  return JSON.parse(fs.readFileSync("db.json", "utf-8"));
}

function saveDb(db) {
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
}

// GET /
app.get("/", (req, res) => {
  const db = getDb();

  const endpointRows = Object.entries(db)
    .map(([name, items]) => {
      const fields = Object.keys(items[0]).filter((k) => k !== "id").join(", ");
      return `
        <tr>
          <td><a href="/${name}">/${name}</a></td>
          <td>${items.length}</td>
          <td>${fields}</td>
        </tr>`;
    })
    .join("");

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Real Data API</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e0e0e0; padding: 40px; }
    h1 { font-size: 2rem; margin-bottom: 8px; color: #fff; }
    h1 span { color: #3b82f6; }
    .subtitle { color: #888; margin-bottom: 32px; }
    h2 { font-size: 1.1rem; color: #fff; margin: 24px 0 12px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #1e1e1e; }
    th { color: #888; font-weight: 500; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }
    td { font-size: 0.9rem; }
    td:last-child { color: #888; font-size: 0.8rem; }
    a { color: #3b82f6; text-decoration: none; font-family: monospace; font-weight: 600; }
    a:hover { text-decoration: underline; }
    .badge { display: inline-block; background: #3b82f620; color: #3b82f6; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-left: 8px; }
  </style>
</head>
<body>
  <h1><span>Real</span> Data API</h1>
  <p class="subtitle">Curated real-world data sets served as a REST API</p>

  <h2>Endpoints <span class="badge">${Object.keys(db).length} collections</span></h2>
  <table>
    <thead>
      <tr>
        <th>Endpoint</th>
        <th>Items</th>
        <th>Fields</th>
      </tr>
    </thead>
    <tbody>
      ${endpointRows}
    </tbody>
  </table>
</body>
</html>`);
});

// POST /auth/register
app.post("/auth/register", (req, res) => {
  const { firstName, lastName, email, password, avatar } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const db = getDb();
  if (db.users.find((u) => u.email === email)) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const maxId = db.users.reduce((max, u) => Math.max(max, u.id), 0);
  const newUser = {
    id: maxId + 1,
    firstName: firstName || "",
    lastName: lastName || "",
    email,
    password,
    avatar: avatar || `https://i.pravatar.cc/150?u=${email}`,
  };

  db.users.push(newUser);
  saveDb(db);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET);
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ token, user: userWithoutPassword });
});

// POST /auth/login
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const db = getDb();
  const user = db.users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET);
  const { password: _, ...userWithoutPassword } = user;
  res.json({ token, user: userWithoutPassword });
});

// GET /auth/me
app.get("/auth/me", (req, res) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(auth.split(" ")[1], SECRET);
    const db = getDb();
    const user = db.users.find((u) => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
});

// GET /:collection
app.get("/:collection", (req, res) => {
  const db = getDb();
  const data = db[req.params.collection];

  if (!data) {
    return res.status(404).json({ error: "Collection not found" });
  }

  res.json(data);
});

// GET /:collection/:id
app.get("/:collection/:id", (req, res) => {
  const db = getDb();
  const data = db[req.params.collection];

  if (!data) {
    return res.status(404).json({ error: "Collection not found" });
  }

  const item = data.find((i) => String(i.id) === req.params.id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  res.json(item);
});

// POST /:collection
app.post("/:collection", (req, res) => {
  const db = getDb();
  const data = db[req.params.collection];

  if (!data) {
    return res.status(404).json({ error: "Collection not found" });
  }

  const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
  const newItem = { id: maxId + 1, ...req.body };

  data.push(newItem);
  saveDb(db);

  res.status(201).json(newItem);
});

// PUT /:collection/:id
app.put("/:collection/:id", (req, res) => {
  const db = getDb();
  const data = db[req.params.collection];

  if (!data) {
    return res.status(404).json({ error: "Collection not found" });
  }

  const index = data.findIndex((i) => String(i.id) === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  data[index] = { id: data[index].id, ...req.body };
  saveDb(db);

  res.json(data[index]);
});

// PATCH /:collection/:id
app.patch("/:collection/:id", (req, res) => {
  const db = getDb();
  const data = db[req.params.collection];

  if (!data) {
    return res.status(404).json({ error: "Collection not found" });
  }

  const index = data.findIndex((i) => String(i.id) === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  data[index] = { ...data[index], ...req.body };
  saveDb(db);

  res.json(data[index]);
});

// DELETE /:collection/:id
app.delete("/:collection/:id", (req, res) => {
  const db = getDb();
  const data = db[req.params.collection];

  if (!data) {
    return res.status(404).json({ error: "Collection not found" });
  }

  const index = data.findIndex((i) => String(i.id) === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  const deleted = data.splice(index, 1)[0];
  saveDb(db);

  res.json(deleted);
});

app.listen(PORT, () => {
  const db = getDb();
  console.log(`\n  Real Data API running at http://localhost:${PORT}\n`);
  console.log("  Endpoints:");
  Object.entries(db).forEach(([name, items]) =>
    console.log(`    GET /${name} (${items.length} items)`)
  );
  console.log();
});
