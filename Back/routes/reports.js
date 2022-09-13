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
    catchReport,
    myReportsCatched,
    myReportsFullfilled,
    myReportsRejected,
    getReportBySearch,
    deleteAllReports,
} = require("../controllers/reports");

//Ruta para buscar por SEARCH.
router.get("/search/:search", validateAuth, getReportBySearch)

//Ruta para traer TODOS los informes.
router.get("/allreports", validateAuth, getAllReports);

//Ruta para traer los reportes tomados por un admin logeado.
router.get("/catchedreports", validateAuth, myReportsCatched);

//Ruta para traer todos los reportes solucionados por admin logeado.
router.get('/myreportsfullfilled', validateAuth, myReportsFullfilled)

//Ruta para traer todos los reportes rechazados por admin logeado.
router.get('/myreportsrejected', validateAuth, myReportsRejected);

//Ruta para traer los informes de un usuario pasado por parámetro.(Funcion ADMIN)
router.get("/reportsbyuserid/:id", validateAuth, getReportByUserId);

//Ruta para traer los informes diarios.
router.get("/dailyreports", validateAuth, getDailyReports);

//Ruta para traer los informes prioritarios
router.get("/priorityreports/:id", validateAuth, getPriorityReports );

//Ruta para traer informes de un user logeado.
router.get("/myreports", validateAuth, getUserReports);

//Ruta para traer informes por ID pasado por parámetro.
router.get('/getreportbyid/:id', validateAuth, getReportById);

//Ruta para traer informes PENDIENTES.
router.get('/getpendingreports',  validateAuth, getAllPendingReports);

//Ruta para traer informes RECHAZADOS.
router.get('/getrejectedreports',  validateAuth, getAllRejectedReports);

//Ruta para traer informes RESUELTOS.
router.get('/getsolvedreports',  validateAuth, getAllSolvedReports);

//Ruta para crear un informe.
router.post("/addreport", validateAuth, createReport);

//Ruta para que un admin pueda tomar un reporte.
router.put('/catchreport/:id', validateAuth, catchReport)

//Ruta para que un usuario modifique su informe.
router.put('/modifyreport', validateAuth, modifyReport);

//Ruta para marcar un informe como resuelto pasado por parámetro.
router.put('/solvereport/:id', validateAuth, reportSolved);

//Ruta para marcar un informe como rechazado.
router.put('/rejectedreport/:id', validateAuth, rejectedReport);

//Ruta para borrar un informe pasado por parámetro.
router.delete('/removereport/:id', validateAuth, deleteReport);

//Ruta para borrar todos los informes.
router.delete('/deleteall', validateAuth, deleteAllReports)

module.exports = router;