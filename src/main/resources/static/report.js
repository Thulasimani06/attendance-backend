////const apiBase = "http://localhost:8080/api";
////
////const studentSelect = document.getElementById("studentSelect");
////const monthSelect = document.getElementById("monthSelect");
////const yearInput = document.getElementById("yearInput");
////const reportBtn = document.getElementById("reportBtn");
////const attendancePercentageEl = document.getElementById("attendancePercentage");
////
////const reportHeader = document.getElementById("reportHeader");
////const reportBody = document.getElementById("reportBody");
////
////let periods = [];
////
////// =====================
////// Fetch Periods
////// =====================
////async function fetchPeriods() {
////    const res = await fetch(`${apiBase}/periods`);
////    periods = await res.json();
////}
////
////// =====================
////// Generate Monthly Report
////// =====================
////async function generateReport() {
////    const studentId = parseInt(studentSelect.value);
////    const month = parseInt(monthSelect.value);
////    const year = parseInt(yearInput.value);
////
////    const res = await fetch(`${apiBase}/attendance/student/${studentId}`);
////    const attendance = await res.json();
////
////    // Normalize dates
////    const filtered = attendance
////        .map(a => {
////            const d = new Date(a.date);
////            a.simpleDate = d.toISOString().split("T")[0];
////            return a;
////        })
////        .filter(a => {
////            const d = new Date(a.date);
////            return d.getMonth() + 1 === month && d.getFullYear() === year;
////        });
////
////    const days = [...new Set(filtered.map(a => a.simpleDate))].sort();
////
////    reportHeader.innerHTML = "";
////    reportBody.innerHTML = "";
////
////    // Header row
////    let headerRow = "<tr><th>Date</th>";
////    periods.forEach(p => {
////        headerRow += `<th>Period ${p.periodNo}</th>`;
////    });
////    headerRow += "</tr>";
////    reportHeader.innerHTML = headerRow;
////
////    let presentCount = 0;
////    let totalCount = 0;
////
////    days.forEach(day => {
////        let row = `<tr><td>${day}</td>`;
////
////        periods.forEach(period => {
////            const record = filtered.find(
////                a => a.simpleDate === day && a.period.id === period.id
////            );
////
////            if (record) {
////                row += `<td>${record.present ? "✔️" : "❌"}</td>`;
////                totalCount++;
////                if (record.present) presentCount++;
////            } else {
////                row += "<td>-</td>";
////            }
////        });
////
////        row += "</tr>";
////        reportBody.innerHTML += row;
////    });
////
////    const percentage = totalCount === 0 ? 0 : (presentCount / totalCount) * 100;
////    attendancePercentageEl.innerText =
////        `Attendance Percentage: ${percentage.toFixed(2)}%`;
////}
////
////// =====================
////// Button Event
////// =====================
////reportBtn.addEventListener("click", generateReport);
////
////fetchPeriods();





const apiBase = "http://localhost:8080/api";

const studentSelect = document.getElementById("studentSelect");
const monthSelect = document.getElementById("monthSelect");
const yearInput = document.getElementById("yearInput");
const reportBtn = document.getElementById("reportBtn");
const attendancePercentageEl = document.getElementById("attendancePercentage");

const reportHeader = document.getElementById("reportHeader");
const reportBody = document.getElementById("reportBody");

let periods = [];

// =======================
// LOAD STUDENTS & PERIODS
// =======================
async function loadReportData() {
    try {
        // Load students
        const resStudents = await fetch(`${apiBase}/students`);
        const students = await resStudents.json();

        studentSelect.innerHTML = "<option value=''>--Select Student--</option>";
        students.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s.id;
            opt.textContent = s.name;
            studentSelect.appendChild(opt);
        });

        // Load periods
        const resPeriods = await fetch(`${apiBase}/periods`);
        periods = await resPeriods.json();

    } catch (err) {
        console.error("Error loading report data", err);
    }
}

// =======================
// GENERATE MONTHLY REPORT
// =======================
async function renderMonthlyReport() {
    const studentId = studentSelect.value;
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearInput.value);

    if (!studentId) {
        alert("Please select a student");
        return;
    }

    const res = await fetch(`${apiBase}/attendance/student/${studentId}`);
    const data = await res.json();

    const monthData = data.map(a => {
        const d = new Date(a.date);
        return {
            ...a,
            simpleDate: d.toISOString().split("T")[0],
            year: d.getFullYear(),
            month: d.getMonth() + 1
        };
    }).filter(a => a.year === year && a.month === month);

    const days = [...new Set(monthData.map(a => a.simpleDate))].sort();

    reportHeader.innerHTML = "";
    reportBody.innerHTML = "";

    // Header
    let tr = document.createElement("tr");
    tr.innerHTML = "<th>Date</th>";
    periods.forEach(p => {
        tr.innerHTML += `<th>P${p.periodNo}</th>`;
    });
    reportHeader.appendChild(tr);

    let present = 0, total = 0;

    days.forEach(day => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${day}</td>`;

        periods.forEach(p => {
            const rec = monthData.find(a =>
                a.simpleDate === day && a.period.id === p.id
            );

            if (rec) {

                let symbol = "❌";

                if (rec.status === "Present") symbol = "✔️";
                if (rec.status === "Late") symbol = "⏰";
                if (rec.status === "Excused") symbol = "📝";

                tr.innerHTML += `<td>${symbol}</td>`;

                total++;

                if (rec.status === "Present") present++;

            } else {
                tr.innerHTML += `<td>-</td>`;
            }
        });


        reportBody.appendChild(tr);
    });

    const percent = total === 0 ? 0 : (present / total) * 100;
    attendancePercentageEl.innerText = `Attendance Percentage: ${percent.toFixed(2)}%`;
}

// =======================
reportBtn.addEventListener("click", renderMonthlyReport);
loadReportData();


//document.addEventListener("DOMContentLoaded", () => {
//
//const apiBase = "http://localhost:8080/api";
//
//const studentSelect = document.getElementById("studentSelect");
//const monthSelect = document.getElementById("monthSelect");
//const yearInput = document.getElementById("yearInput");
//const reportBtn = document.getElementById("reportBtn");
//const attendancePercentageEl = document.getElementById("attendancePercentage");
//
//const reportHeader = document.getElementById("reportHeader");
//const reportBody = document.getElementById("reportBody");
//
//let periods = [];
//
///* ===============================
//   LOAD STUDENTS + PERIODS
//================================ */
//async function initReport() {
//    console.log("Report JS loaded ✅");
//
//    const studentsRes = await fetch(`${apiBase}/students`);
//    const students = await studentsRes.json();
//
//    studentSelect.innerHTML = "<option value=''>-- Select Student --</option>";
//    students.forEach(s => {
//        const opt = document.createElement("option");
//        opt.value = s.id;
//        opt.textContent = s.name;
//        studentSelect.appendChild(opt);
//    });
//
//    const periodRes = await fetch(`${apiBase}/periods`);
//    periods = await periodRes.json();
//}
//
///* ===============================
//   GENERATE REPORT
//================================ */
//async function generateReport() {
//    const studentId = studentSelect.value;
//    const month = Number(monthSelect.value);
//    const year = Number(yearInput.value);
//
//    if (!studentId) {
//        alert("Please select a student");
//        return;
//    }
//
//    const res = await fetch(`${apiBase}/attendance/student/${studentId}`);
//    const data = await res.json();
//
//    const monthData = data.map(a => {
//        const d = new Date(a.date);
//        return {
//            ...a,
//            simpleDate: d.toISOString().split("T")[0],
//            m: d.getMonth() + 1,
//            y: d.getFullYear()
//        };
//    }).filter(a => a.m === month && a.y === year);
//
//    const days = [...new Set(monthData.map(a => a.simpleDate))].sort();
//
//    reportHeader.innerHTML = "";
//    reportBody.innerHTML = "";
//
//    let headRow = "<tr><th>Date</th>";
//    periods.forEach(p => headRow += `<th>P${p.periodNo}</th>`);
//    headRow += "</tr>";
//    reportHeader.innerHTML = headRow;
//
//    let present = 0, total = 0;
//
//    days.forEach(day => {
//        let row = `<tr><td>${day}</td>`;
//
//        periods.forEach(p => {
//            const rec = monthData.find(a => a.simpleDate === day && a.period.id === p.id);
//            if (rec) {
//                row += `<td>${rec.present ? "✔️" : "❌"}</td>`;
//                total++;
//                if (rec.present) present++;
//            } else {
//                row += "<td>-</td>";
//            }
//        });
//
//        row += "</tr>";
//        reportBody.innerHTML += row;
//    });
//
//    const percent = total === 0 ? 0 : (present / total) * 100;
//    attendancePercentageEl.innerText = `Attendance Percentage: ${percent.toFixed(2)}%`;
//}
//
///* ===============================
//   EVENTS
//================================ */
//reportBtn.addEventListener("click", generateReport);
//initReport();
//
//});
