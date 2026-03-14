const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
host:"localhost",
user:"root",
password:"Karthik_x25",
database:"hscms"
});

db.connect(err=>{
if(err) throw err;
console.log("MySQL Connected");
});


/* SENSOR ALERT */

app.post("/sensor",(req,res)=>{

const {sensor_id,sensor_type,alert_level}=req.body;

db.query(
"INSERT INTO sensors (sensor_id,sensor_type,alert_level) VALUES (?,?,?)",
[sensor_id,sensor_type,alert_level],
(err)=>{
if(err) throw err;
res.send("Sensor Stored");
});

});


/* CAMERA LOG */

app.post("/camera",(req,res)=>{

const {camera_id,location,activity}=req.body;

db.query(
"INSERT INTO cameras (camera_id,location,activity) VALUES (?,?,?)",
[camera_id,location,activity],
(err)=>{
if(err) throw err;
res.send("Camera Stored");
});

});


/* NETWORK EVENT */

app.post("/network",(req,res)=>{

const {ip_address,event_type,threat_level}=req.body;

db.query(
"INSERT INTO network_events (ip_address,event_type,threat_level) VALUES (?,?,?)",
[ip_address,event_type,threat_level],
(err)=>{
if(err) throw err;
res.send("Network Stored");
});

});


/* DASHBOARD DATA */

app.get("/dashboard",(req,res)=>{

db.query(`
SELECT
(SELECT COUNT(*) FROM sensors) AS sensors,
(SELECT COUNT(*) FROM cameras) AS cameras,
(SELECT COUNT(*) FROM network_events) AS networks
`,(err,result)=>{

res.json(result[0]);

});

});


/* SENSOR DATA */

app.get("/sensor-data",(req,res)=>{

db.query("SELECT * FROM sensors",(err,result)=>{
res.json(result);
});

});


/* CAMERA DATA */

app.get("/camera-data",(req,res)=>{

db.query("SELECT * FROM cameras",(err,result)=>{
res.json(result);
});

});


/* NETWORK DATA */

app.get("/network-data",(req,res)=>{

db.query("SELECT * FROM network_events",(err,result)=>{
res.json(result);
});

});


app.listen(3000,()=>{
console.log("Server running on port 3000");
});