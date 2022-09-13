//CREAR LISTAR MODIFICAR ELIMINAR NUESTROS REPORTES
const express = require("express");
const router = express.Router();
const { validateAuth } = require("../middleware/auth");
const {
  createReport,
  modifyReport,
  deleteReport,
  getAllReports,
  getReportByUserId,
  getPriorityReports,
  getDailyReports,
  reportSolved,
  getUserReports,
  rejectedReport,
  getAllPendingReports,
  getAllRejectedReports,
  getAllSolvedReports,
  getReportById,
} = require("../controllers/reports");

//Ruta para crear un informe.
router.post("/addreport", validateAuth, createReport);

//Ruta para traer TODOS los informes.
router.get("/allreports", validateAuth, getAllReports);

//Ruta para traer los informes de un usuario pasado por parámetro.(Funcion ADMIN)
router.get("/reportsbyuserid/:id", validateAuth, getReportByUserId);

//Ruta para traer los informes diarios.
router.get("/dailyreports", validateAuth, getDailyReports);

//Ruta para traer los informes prioritarios
router.get("/priorityreports/:id", validateAuth, getPriorityReports);

//Ruta para traer informes de un user logeado.
router.get("/myreports", validateAuth, getUserReports);

//Ruta para traer informes por ID pasado por parámetro.
router.get("/getreportbyid/:id", getReportById);

//Ruta para traer informes PENDIENTES.
router.get("/getpendingreports", validateAuth, getAllPendingReports);

//Ruta para traer informes RECHAZADOS.
router.get("/getrejectedreports", validateAuth, getAllRejectedReports);

//Ruta para traer informes RESUELTOS.
router.get("/getsolvedreports", validateAuth, getAllSolvedReports);

//Ruta para que un usuario modifique su informe.
router.put("/modifyreport", validateAuth, modifyReport);

//Ruta para marcar un informe como resuelto pasado por parámetro.
router.put("/solvereport/:id", validateAuth, reportSolved);

//Ruta para marcar un informe como rechazado.
router.put("/rejectedreport/:id", validateAuth, rejectedReport);

//Ruta para borrar un informe pasado por parámetro.
router.delete("/removereport/:id", validateAuth, deleteReport);

module.exports = router;
