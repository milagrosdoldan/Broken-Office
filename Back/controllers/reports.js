//Controllers reports

const Reports = require("../models/Reports");

const Rep = {
  //El usuario crea un parámetro. Toma los datos del body.
  createReport: async function createReport(req, res) {
    try {
      const newReport = await new Reports({
        userId: req.user.id,
        admin: req.body.admin,
        location: req.body.location,
        image: req.body.image,
        country: req.body.country,
        description: req.body.description,
        priority: req.body.priority,
        coord: req.body.coord,
        name: req.body.name,
        email: req.body.email,
        lastname: req.body.lastname,
      });
      console.log(newReport);
      newReport.save();
      res.status(201).send(newReport);
    } catch (error) {
      res.send(error).status(500);
    }
  },

  //El usuario PUEDE modificar su informe.
  modifyReport: async function modifyReport(req, res) {
    const report = await Reports.update(
      { _id: req.params.id },
      {
        description: req.body.description,
        priority: req.body.priority,
      }
    );
    res.send(report);
  },

  //El usuario PUEDE eliminar su informe.
  deleteReport: async function deleteReport(req, res) {
    const report = await Reports.deleteOne({ _id: req.params.id });
    res.send(report);
  },

  //Función para mostrar TODOS los informes.
  getAllReports: async function getAllReports(req, res) {
    const report = await Reports.find();
    res.send(report);
  },

  //Función para mostrar informes de UN usuario
  getReportByUserId: async function getReportByUserId(req, res) {
    const report = await Reports.find({ userId: req.params.id });
    res.send(report);
  },

  //Función para mostrar informes por ID.
  getReportById: async function getReportById(req, res) {
    const report = await Reports.find({ _id: req.params.id });
    res.send(report);
  },

  //Función para mostrar informes de UN usuario logeado
  getUserReports: async function getUserReports(req, res) {
    const report = await Reports.find({ userId: req.user.id });
    res.send(report);
  },

  //Función para mostrar informes del día.
  getDailyReports: async function getDailyReports(req, res) {
    const date = new Date();
    const report = await Reports.find({ date: date });
    res.send(report);
  },

  //Función para mostrar informes PRIORITARIOS (Prioridad nivel 3).
  getPriorityReports: async function getPriorityReports(req, res) {
    const report = await Reports.find({ priority: req.params.id });
    res.send(report);
  },

  //Función para cerrar un informe solucionado.
  reportSolved: async function reportSolved(req, res) {
    const report = await Reports.update(
      { _id: req.params.id },
      { state: "solved" }
    );
    res.send("Report solved");
  },

  //Función para cerrar un informe como rechazado.
  rejectedReport: async function rejectedReport(req, res) {
    const report = await Reports.update(
      { _id: req.params.id },
      { state: "rejected" }
    );
    res.send("Report rejected");
  },

  //Función para mostrar TODOS los informes pendientes.
  getAllPendingReports: async function getAllPendingReports(req, res) {
    const report = await Reports.find({ state: "pending" });
    res.send(report);
  },

  //Función para mostrar TODOS los informes rechazados.
  getAllRejectedReports: async function getAllRejectedReports(req, res) {
    const report = await Reports.find({ state: "rejected" });
    res.send(report);
  },

  //Función para mostrar TODOS los informes pendientes.
  getAllSolvedReports: async function getAllSolvedReports(req, res) {
    const report = await Reports.find({ state: "solved" });
    res.send(report);
  },

  //Función para que un admin logeado pueda tomar un reporte.
  catchReport: async function catchReport(req,res){
    const report = await Reports.update({_id: req.params.id},{admin: req.user.name + " " + req.user.lastname})
    res.send(report);
  },

  //Función para mostrar todos los reportes pendientes de un admin logeado.
  myReportsCatched: async function myReportsCatched(req,res){
    const report = await Reports.find({
      admin: req.user.name + " " + req.user.lastname,
      state: "pending"
    })
    res.send(report)
  },

  //Función para mostrar todos los reportes resueltos de un admin logeado.
  myReportsFullfilled: async function myReportsFullfilled(req,res){
    const report = await Reports.find({
      admin: req.user.name + " " + req.user.lastname,
      state: "fullfilled"
    })
    res.send(report)
  },

  //Función para mostrar todos los reportes rechazados de un admin logeado.
  myReportsRejected: async function myReportsRejected(req,res){
    const report = await Reports.find({
      admin: req.user.name + " " + req.user.lastname,
      state: "rejected"
    })
    res.send(report)
  },
};

module.exports = Rep;