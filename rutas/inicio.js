const { Router } =  require('express');
var jwt = require("jsonwebtoken");
const cifrar = require('crypto');
const router = Router();

const Solicitud = require('../modelos/solicitud');

registro = router.post("/crearsolicitud", (req,res)=>{
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const estado = 'Pendiente' 
  const newSolicitud = new Solicitud({titulo, descripcion,estado});
  newSolicitud.save();
  res.json({
      estado: "EXITOSO",
      mensaje:"Solicitud iniciada correctamente!"
  });  
});

getsolicitudes = router.get("/getsolicitudes", async (req, res) => {
    const solicitudes = await Solicitud.find().sort("-_id");
    res.json(solicitudes);
});

getsolicitud = router.post("/getsolicitud", async (req, res) => {
    var x = req.body._id;
    Solicitud.findById(x, function (err, solicitud) {
      if (err) {
        console.log(err);
      } else {
        console.log(solicitud);
        res.json(solicitud);
      }
    });
});

deletesolicitud =router.post("/deletesolicitud", async (req, res) => {
    var x = req.body._id;
    Solicitud.deleteOne({ _id: x }, function (err) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            estado: "EXITOSO",
            mensaje: "Solicitud eliminada correctamente!",
          });
        }
      });
});

rechazarsolicitud = router.post("/rechazarsolicitud", async (req, res) => {
    var x = req.body._id;
    var estado = "Rechazado"
    let doc = await Solicitud.findOneAndUpdate({ _id: x },{ estado: estado});
      res.json({
        estado: "EXITOSO",
        mensaje: "Solicitud rechazada correctamente!",
      });
});

aceptarsolicitud = router.post("/aceptarsolicitud", async (req, res) => {
    var x = req.body._id;
    var estado = "Aceptada"
    let doc = await Solicitud.findOneAndUpdate({ _id: x },{ estado: estado});
      res.json({
        estado: "EXITOSO",
        mensaje: "Solicitud aceptada correctamente!",
      });
});

module.exports = router;