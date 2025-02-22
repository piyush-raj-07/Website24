const Visit = require("../models/Visit");
const UniqueVisit = require("../models/Unique_Visit");

exports.trackVisit = async (req, res) => {

  try {
    const { userId } = req.body;
    await Visit.create({ userId, timestamp: new Date() });

    res.status(200).json({ message: "Visit logged" });
  } catch (error) {
    res.status(500).json({ error: "Error logging visit" });
  }
};

exports.trackUniqueUser = async (req, res) => {
  
  try {
    const { userId } = req.body;
    const existingUser = await UniqueVisit.findOne({ userId });

    if (!existingUser) {
      await UniqueVisit.create({ userId, firstVisit: new Date() });
      return res.status(200).json({ message: "New user logged", userId });
    }

    res.status(200).json({ message: "Returning user, no new entry" });
  } catch (error) {
    res.status(500).json({ error: "Error logging unique user" });
  }
};
