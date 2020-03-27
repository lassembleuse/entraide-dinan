
const fs = require("fs");
const csv = require("csv-parser");

const source = "src/_data/entraide_dinan_coronavirus.csv";
const destination = "src/_data/commerces.json";

let arrayResults = []

const getData = new Promise((resolve, reject) => {
  fs.createReadStream(source)
  .pipe(
    csv({
      separator: ';'
    })
    )
    .on("data", row => {
      arrayResults.push(formatData(row));
    })
    .on("end", () => {
      console.log(arrayResults);
      resolve(arrayResults);
    });
  });

const formatData = function(row) {
  return {
    type: row["Type"],
    typeIcon: getTypeIcon(row["Type"]),
    nom: row["Nom du commerce"],
    codePostal: row["Code postal"],
    ville: row["Ville"],
    description:
    row["Qu'est-ce que ce commerce propose ? Comment aider ce commerce ?"],
    siteWeb: row["Site web"],
    facebook: row["facebook"]
  };
};

const getTypeIcon = function (type) {
  if (type == "Restaurant"){
    return "fork-and-knife";
  } else if(type == "Producteur"){
    return "food-basket";
  } else {
  return "";
  }
}

getData.then(() => {
  const commerces = JSON.stringify(arrayResults, null, 2);
  fs.writeFileSync(destination, commerces);
});