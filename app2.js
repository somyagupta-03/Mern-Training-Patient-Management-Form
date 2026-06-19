const express = require("express");
const fs = require("fs");
const path = require("path");

const app2 = express();
app2.use(express.urlencoded({extended: true}));
app2.use(express.static(__dirname));

app2.get("/", (req,res)=>{
 res.sendFile(path.join(__dirname,"index.html"));
 app2.get("/patients",(req,res)=> {

 });
});

app2.post("/register", (req,res) => {
 const patientData = `Name:${req.body.name}, Date: ${req.body.date}, Disease:${req.body.disease}\n`;
 console.log(patientData);
 fs.appendFileSync("patient_registry.txt",patientData);
 res.send(`<h3>${req.body.name} has been saved. Go back to main page`);
});

app2.get("/patients", (req,res) => {
  let patients = "";
  if (fs.existsSync("patient_registry.txt")){
   patients = fs.readFileSync("patient_registry.txt","utf8");
  const formattedPatients = patients
  .split("\n")
  .filter(line => line.trim() !== "")
  .map(line => `<tr><td>${line}</td></tr>`)
  .join("");

res.send(`
<!DOCTYPE html>
<html>
<head>
<style>
body{
    font-family: Arial, sans-serif;
    background:#f4f6f9;
    padding:20px;
}
h2{
    text-align:center;
    color:#2c3e50;
}
table{
    width:80%;
    margin:auto;
    border-collapse:collapse;
    background:white;
    box-shadow:0 0 10px rgba(0,0,0,0.1);
}
td{
    border:1px solid #ddd;
    padding:12px;
}
tr:nth-child(even){
    background:#f2f2f2;
}
</style>
</head>
<body>

<h2>Registered Patients</h2>

<table>
${formattedPatients}
</table>
<br>
<a href="/"> <- Back to Registration Page</a>
</body>
</html>
`);
  }
})
app2.listen(3001, ()=>{
 console.log("Server is running on 3001");
})