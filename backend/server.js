const missionsRoutes = require("./routes/missions.js");
const express = require("express");
const cors = require("cors");
const { db, admin } = require("./firebase.js");
const app = express();
app.use(cors());
app.use(express.json());


const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

app.use("/api/missions", verifyToken, missionsRoutes);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend" });
});

app.get("/api/users", verifyToken, async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.json(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});