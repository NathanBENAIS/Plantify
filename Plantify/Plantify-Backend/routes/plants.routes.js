const express = require('express');
const router = express.Router();
const db = require('../config/config');

router.get('/plants', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM plants');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des plantes", error });
  }
});

router.get('/plants/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM plants WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Plante non trouvée" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la plante", error });
  }
});

module.exports = router;