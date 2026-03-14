function saveSensor(event){

event.preventDefault();

let id=document.getElementById("sensorId").value;
let type=document.getElementById("sensorType").value;
let level=document.getElementById("alertLevel").value;

let data={id,type,level};

let sensors=JSON.parse(localStorage.getItem("sensors"))||[];

sensors.push(data);

localStorage.setItem("sensors",JSON.stringify(sensors));

alert("Sensor alert saved");

}

function loadData(){

let sensors=JSON.parse(localStorage.getItem("sensors"))||[];

let table=document.getElementById("sensorTable");

sensors.forEach(s=>{

let color="";

if(s.level=="High") color="table-danger";
else if(s.level=="Medium") color="table-warning";
else color="table-success";

let row=`
<tr class="${color}">
<td>${s.id}</td>
<td>${s.type}</td>
<td>${s.level}</td>
</tr>
`;

table.innerHTML+=row;

});

}

function loadStats(){

let sensors=JSON.parse(localStorage.getItem("sensors"))||[];

let high=0,medium=0,low=0;

sensors.forEach(s=>{

if(s.level=="High") high++;
else if(s.level=="Medium") medium++;
else low++;

});

document.getElementById("highAlerts").innerText=high;
document.getElementById("mediumAlerts").innerText=medium;
document.getElementById("lowAlerts").innerText=low;
document.getElementById("totalSensors").innerText=sensors.length;

let ctx=document.getElementById("alertChart");

new Chart(ctx,{
type:'pie',
data:{
labels:['High','Medium','Low'],
datasets:[{
data:[high,medium,low]
}]
}
});

}

function saveCamera(event){

event.preventDefault();

let id=document.getElementById("cameraId").value;
let location=document.getElementById("cameraLocation").value;
let activity=document.getElementById("cameraActivity").value;

let data={id,location,activity};

let cameras=JSON.parse(localStorage.getItem("cameraLogs"))||[];

cameras.push(data);

localStorage.setItem("cameraLogs",JSON.stringify(cameras));

alert("Camera log saved");

}

function saveNetwork(event){

event.preventDefault();

let ip=document.getElementById("ipAddress").value;
let type=document.getElementById("eventType").value;
let level=document.getElementById("threatLevel").value;

let data={ip,type,level};

let logs=JSON.parse(localStorage.getItem("networkLogs"))||[];

logs.push(data);

localStorage.setItem("networkLogs",JSON.stringify(logs));

alert("Network event saved");

}

function loadDashboard(){

let sensors=JSON.parse(localStorage.getItem("sensors"))||[];
let cameras=JSON.parse(localStorage.getItem("cameraLogs"))||[];
let networks=JSON.parse(localStorage.getItem("networkLogs"))||[];

let sensorTable=document.getElementById("sensorTable");
let threatFeed=document.getElementById("threatFeed");
let cameraStatus=document.getElementById("cameraStatus");
let networkStatus=document.getElementById("networkStatus");

let critical=false;

sensors.forEach(s=>{

let color="";

if(s.level=="High"){
color="table-danger";
critical=true;
}
else if(s.level=="Medium") color="table-warning";
else color="table-success";

sensorTable.innerHTML+=`
<tr class="${color}">
<td>${s.id}</td>
<td>${s.type}</td>
<td>${s.level}</td>
</tr>
`;

threatFeed.innerHTML+=`
<li class="list-group-item">
Sensor ${s.id} reported ${s.level} alert
</li>
`;

});

cameras.forEach(c=>{

cameraStatus.innerHTML+=`
<li class="list-group-item">
Camera ${c.id} - ${c.activity}
</li>
`;

});

networks.forEach(n=>{

networkStatus.innerHTML+=`
<li class="list-group-item">
IP ${n.ip} - ${n.level}
</li>
`;

});

if(critical){

document.getElementById("alertBanner").innerText=
"CRITICAL SECURITY ALERT DETECTED";

}
}

setInterval(()=>{

let sensors=JSON.parse(localStorage.getItem("sensors"))||[];

if(sensors.length>0){

let random=sensors[Math.floor(Math.random()*sensors.length)];

console.log("Monitoring sensor:",random.id);

}

},5000);

