let itpYearData = require("./itpdata.json");

var allProjects; // flat datastructure

// expose hierarchical data structure
function getAllData() {
  return itpYearData;
}

// create a flat array of projects based on the hierarchical structure of the original data
// store that flat structure for future get requests.
function getAllProjects() {
  if (!allProjects) {
    allProjects = [].concat(
      ...itpYearData.map(elm => {
        let prj = elm.projects;
        return prj.map(y => {
          // embed year, grade, judges in all flat projects
          y.year = elm.year;
          y.grade = elm.grade;
          y.judges = elm.judges;
          // generate short member array
          y.members = [];
          for (let m of y.membersNames) {
            y.members.push(m.vorname[0] + m.nachname[0]);
          }
          return y;
        });
      })
    );
  }
  return allProjects;
}

function deleteProj(prjId) {
  let pr = getAllProjects().find(p => p.projId == prjId);
  if (pr) {
    allProjects.splice(allProjects.indexOf(pr), 1);
    return "OK";
  }
  return "NOK";
}

function getCriteriaFor(year, grade) {
  return itpYearData.find(yData => yData.year == year && yData.grade == grade)
    .criteria;
}

let uniqueCrit = null;

function getCriteria() {
  if (!uniqueCrit) {
    let critCollection = [].concat(...itpYearData.map(yData => yData.criteria));
    uniqueCrit = [];
    for (const crit of critCollection) {
      if (!uniqueCrit.find(elm => elm.id == crit.id)) {
        uniqueCrit.push(crit);
      }
    }
    uniqueCrit.sort((a, b) => (a.id < b.id ? -1 : 1));
  }
  return uniqueCrit;
}

function getCriteriaById(id) {
  console.log("find " + id);
  return getCriteria().find(crit => crit.id == id);
}

function updateProject(projIn) {
  let projUpd = getAllProjects().find(p => p.id == projIn.id);
  if (projUpd) {
    projUpd.title = projIn.title;
    projUpd.description = projIn.description;
    projUpd.year = projIn.year;
    projUpd.grade = projIn.grade;

    return "OK";
  }
  return "NOK";
}

module.exports = {
  getAllData,
  getAllProjects,
  getCriteriaFor,
  getCriteria,
  getCriteriaById,
  updateProject,
  deleteProj
};
