const express = require("express");
const router = express.Router();

// root directory: /api/users/

router.get("/", (req, res) => {
  return res.json({ success: true });
});

module.exports = router;
