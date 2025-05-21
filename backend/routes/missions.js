const express = require("express");
const { db } = require("../firebase.js");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    console.log("Отриманий userId:", userId);
    if (!userId || typeof userId !== "string" || userId.includes("/")) {
      return res.status(400).send({ error: "Невалідний ID користувача" });
    }
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("missions")
      .get();

    if (snapshot.empty) {
      console.log("Місій не знайдено для цього користувача");
      return res.status(404).send({ error: "Місій не знайдено для цього користувача" });
    }

    const missionsFromFirestore = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(missionsFromFirestore);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});





router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const missionData = req.body;


  try {
    if (!userId || typeof userId !== "string" || userId.includes("/")) {
      return res.status(400).send({ error: "Невалідний ID користувача" });
    }

    if (!missionData || typeof missionData !== "object") {
      return res.status(400).send({ error: "Невалідні дані місії" });
    }

    const newMissionRef = await db
      .collection("users")
      .doc(userId)
      .collection("missions")
      .add(missionData);

    return res.status(201).send({ message: "Місію додано", id: newMissionRef.id });
  } catch (error) {
    console.error("❌ Помилка при записі місії:", error);
    return res.status(500).send({ error: error.message });
  }
});




router.delete("/:userId/:missiontimestamp", async(req, res) => {
  const {userId, missiontimestamp} = req.params
  const timestampNumber = Number(missiontimestamp);
  try{
   const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("missions")
      .where("timestamp","==",timestampNumber)
      .get();

      for (const doc of snapshot.docs) {
        await doc.ref.delete();
      }
      

      res.status(200).send({ message: "Місію успішно видалено" });

  }catch(error){
    res.status(500).send({error:error.message});
  }
})

router.delete("/:userId", async(req, res) => {
  const {userId} = req.params;
  try {
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("missions")
      .get(); 

    if (snapshot.empty) {
      return res.status(200).send({ message: "Немає місій для видалення" });
    }

    snapshot.docs.map((doc) => doc.ref.delete());

    res.status(200).send({ message: "Усі місії успішно видалено" });

  } catch (error) {
    console.error("Помилка при видаленні місій:", error);
    res.status(500).send({ error: error.message });
  }
})

module.exports = router;
