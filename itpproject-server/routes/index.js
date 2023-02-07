var express = require("express");
var router = express.Router();
let data = require("../model/itpdata");

router.get("/itpData", function(req, res, next) {
  res.send(data.getAllData());
});

router.get("/itpProjects", function(req, res, next) {
  res.send(data.getAllProjects());
});

router.delete("/itpProjects/:id", function(req, res, next) {
  if (data.deleteProj(req.params.id) == "OK") {
    res.status(200);
  } else {
    res.status(210);
  }
  res.send(data.getAllProjects());
});

router.put("/itpProjects", function(req, res, next) {
  if (data.updateProject(req.body) == "OK") {
    res.status(200);
  } else {
    res.status(210);
  }
  res.send(data.getAllProjects());
});

router.get("/criteria/:id", function(req, res, next) {
  res.send(data.getCriteriaById(req.params.id));
});

router.get("/criteria", function(req, res, next) {
  if (req.query) {
    res.send(data.getCriteria());
  } else {
    res.send(data.getCriteriaFor(req.query.year, req.query.grade));
  }
});

module.exports = router;
