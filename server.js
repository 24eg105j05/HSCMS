const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* IN-MEMORY DATA STORAGE */

let sensors = [];
let cameras = [];
let networks = [];

/* SENSOR ALERT */

app.post("/sensor", (req, res) => {

  const { sensor_id, sensor_type, alert_level } = req.body;

  sensors.push({
    id: sensors.length + 1,
    sensor_id,
    sensor_type,
    alert_level
  });

  res.send("Sensor Stored");

});

/* CAMERA LOG */

app.post("/camera", (req, res) => {

  const { camera_id, location, activity } = req.body;

  cameras.push({
    id: cameras.length + 1,
    camera_id,
    location,
    activity
  });

  res.send("Camera Stored");

});

/* NETWORK EVENT */

app.post("/network", (req, res) => {

  const { ip_address, event_type, threat_level } = req.body;

  networks.push({
    id: networks.length + 1,
    ip_address,
    event_type,
    threat_level
  });

  res.send("Network Stored");

});

/* DASHBOARD DATA */

app.get("/dashboard", (req, res) => {

  res.json({
    sensors: sensors.length,
    cameras: cameras.length,
    networks: networks.length
  });

});

/* SENSOR DATA */

app.get("/sensor-data", (req, res) => {
  res.json(sensors);
});

/* CAMERA DATA */

app.get("/camera-data", (req, res) => {
  res.json(cameras);
});

/* NETWORK DATA */

app.get("/network-data", (req, res) => {
  res.json(networks);
});

/* SERVER */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
