const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* MongoDB Connection */

mongoose.connect(
"mongodb+srv://24eg105j05:Karthik_x25@hscms.wxkuwvr.mongodb.net/hscms?retryWrites=true&w=majority"
)

.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


/* Schemas */

const sensorSchema = new mongoose.Schema({
sensor_id:String,
sensor_type:String,
alert_level:String
});

const cameraSchema = new mongoose.Schema({
camera_id:String,
location:String,
activity:String
});

const networkSchema = new mongoose.Schema({
ip_address:String,
event_type:String,
threat_level:String
});


/* Models */

const Sensor = mongoose.model("Sensor",sensorSchema);
const Camera = mongoose.model("Camera",cameraSchema);
const Network = mongoose.model("Network",networkSchema);


/* SENSOR */

app.post("/sensor", async (req,res)=>{

const {sensor_id,sensor_type,alert_level}=req.body;

const sensor = new Sensor({
sensor_id,
sensor_type,
alert_level
});

await sensor.save();

res.send("Sensor Stored");

});

app.get("/sensor-data", async (req,res)=>{

const data = await Sensor.find();

res.json(data);

});


/* CAMERA */

app.post("/camera", async (req,res)=>{

const {camera_id,location,activity}=req.body;

const camera = new Camera({
camera_id,
location,
activity
});

await camera.save();

res.send("Camera Stored");

});

app.get("/camera-data", async (req,res)=>{

const data = await Camera.find();

res.json(data);

});


/* NETWORK */

app.post("/network", async (req,res)=>{

const {ip_address,event_type,threat_level}=req.body;

const network = new Network({
ip_address,
event_type,
threat_level
});

await network.save();

res.send("Network Stored");

});

app.get("/network-data", async (req,res)=>{

const data = await Network.find();

res.json(data);

});


/* DASHBOARD */

app.get("/dashboard", async (req,res)=>{

const sensors = await Sensor.countDocuments();
const cameras = await Camera.countDocuments();
const networks = await Network.countDocuments();

res.json({
sensors,
cameras,
networks
});

});


/* SERVER */

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
console.log("Server running on port "+PORT);
});
