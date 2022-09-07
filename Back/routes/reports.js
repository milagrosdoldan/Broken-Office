//CREAR LISTAR MODIFICAR ELIMINAR NUESTROS REPORTES
const express = require("express");
const router = express.Router();

router.post("/addReport");

router.get("/reportLists");
router.get("/reportsById");

router.put('/modifyReport');

router.delete('/removeReport');

module.exports = router;

