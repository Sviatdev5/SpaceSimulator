const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin")
const serviceAccount = require("./serviceAcountKey.json")
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

app.listen(5001,()=>{
    console.log("Server is running on port 5001");
});

app.get("/api/message", (req, res) => {
    res.json({message: "Hello from the backend" });
})

app.get("/api/users", async(req, res) =>{
    const snapshot = await db.collection("users").get();
    const users = [];
    snapshot.forEach(doc => {
        users.push({id: doc.id, ...doc.data()})
        
    });
    res.json(users);
})