let hospitals =
JSON.parse(localStorage.getItem("hospitals")) || [];

let appointments =
JSON.parse(localStorage.getItem("appointments")) || [];

function saveHospitals(){
localStorage.setItem("hospitals",
JSON.stringify(hospitals));
}

function saveAppointments(){
localStorage.setItem("appointments",
JSON.stringify(appointments));
}

/* LOGIN */

function loginUser(){

let user =
document.getElementById("username").value;

let role =
document.getElementById("role").value;

localStorage.setItem("loggedUser", user);

localStorage.setItem("userRole", role);

document.getElementById("loginMsg").innerHTML =
"Welcome " + user + " (" + role + ")";
}

/* ADMIN ACCESS */

function checkAdminAccess(){

let role =
localStorage.getItem("userRole");

let addSection =
document.getElementById("adminAddSection");

if(addSection){

if(role === "Admin"){
addSection.style.display = "block";
}
else{
addSection.style.display = "none";
}
}
}

/* ADD HOSPITAL */

function addHospital(){

let role =
localStorage.getItem("userRole");

if(role !== "Admin"){
alert("Only Admin can add hospitals");
return;
}

let name =
document.getElementById("hospitalName").value;

let icu =
parseInt(document.getElementById("icu").value) || 0;

let general =
parseInt(document.getElementById("general").value) || 0;

let emergency =
parseInt(document.getElementById("emergency").value) || 0;

hospitals.push({
name,
icu,
general,
emergency
});

saveHospitals();

displayHospitals();

loadDashboard();
}

/* DISPLAY HOSPITALS */

function displayHospitals(){

let container =
document.getElementById("hospitalList");

if(!container) return;

container.innerHTML = "";

let role =
localStorage.getItem("userRole");

hospitals.forEach((h,index)=>{

let deleteBtn = "";

if(role === "Admin"){
deleteBtn =
`<button onclick="deleteHospital(${index})">
Delete
</button>`;
}

container.innerHTML += `
<div class="card">

<h3>${h.name}</h3>

<p>ICU Beds: ${h.icu}</p>

<p>General Beds: ${h.general}</p>

<p>Emergency Beds: ${h.emergency}</p>

${deleteBtn}

</div>
`;
});
}

/* DELETE HOSPITAL */

function deleteHospital(index){

let role =
localStorage.getItem("userRole");

if(role !== "Admin"){
alert("Only Admin can delete hospitals");
return;
}

hospitals.splice(index,1);

saveHospitals();

displayHospitals();

loadDashboard();
}

/* SYMPTOMS */

function checkDisease(){

let selected = [];

document
.querySelectorAll('input[type="checkbox"]:checked')
.forEach(i=>{
selected.push(i.value);
});

let result =
"No matching disease found.";

if(
selected.includes("fever") &&
selected.includes("cough")
){
result = "Possible Disease: Flu";
}

else if(
selected.includes("chestpain")
){
result = "Possible Disease: Heart Issue";
}

else if(
selected.includes("headache") &&
selected.includes("nausea")
){
result = "Possible Disease: Migraine";
}

document.getElementById("resultBox").innerHTML =
result;
}

/* DOCTORS */

function recommendDoctor(){

let disease =
document.getElementById("diseaseSelect").value;

let result = "No doctor found.";

if(disease === "Flu"){
result =
"Dr. Rahul Sharma<br>General Physician";
}

else if(disease === "Heart Issue"){
result =
"Dr. Priya Menon<br>Cardiologist";
}

else if(disease === "Migraine"){
result =
"Dr. Arjun Patel<br>Neurologist";
}

else if(disease === "Skin Problem"){
result =
"Dr. Kavya Reddy<br>Dermatologist";
}

document.getElementById("doctorResult").innerHTML =
result;
}

/* APPOINTMENT */

function bookAppointment(){

let name =
document.getElementById("patientName").value;

let doctor =
document.getElementById("doctorName").value;

let date =
document.getElementById("date").value;

let time =
document.getElementById("time").value;

appointments.push({
name,
doctor,
date,
time
});

saveAppointments();

document.getElementById("appointMsg").innerHTML =
"Appointment Booked for " + name;
}

/* BILLING */

function generateBill(){

let c =
parseInt(document.getElementById("consult").value)
|| 0;

let b =
parseInt(document.getElementById("bed").value)
|| 0;

let m =
parseInt(document.getElementById("medicine").value)
|| 0;

let total = c + b + m;

document.getElementById("billMsg").innerHTML =
"Total Bill: ₹" + total;
}

/* DASHBOARD */

function loadDashboard(){

let beds = 0;

hospitals.forEach(h=>{
beds += h.icu + h.general + h.emergency;
});

if(document.getElementById("totalHospitals")){

document.getElementById("totalHospitals").innerHTML =
hospitals.length;

document.getElementById("totalBeds").innerHTML =
beds;

document.getElementById("totalAppointments").innerHTML =
appointments.length;
}
}

/* LOAD */

displayHospitals();

checkAdminAccess();

loadDashboard();
