////const API = "http://localhost:8080/api";
////
////const dateEl = document.getElementById("date");
////const tableBody = document.getElementById("tableBody");
////const periodHeader = document.getElementById("periodHeader");
////const saveBtn = document.getElementById("saveBtn");
////
////let currentPeriodId = null;
////let students = [];
////let periods = [];
////
////async function loadData() {
////    try {
////        const sRes = await fetch(`${API}/students`);
////        students = await sRes.json();
////
////        const pRes = await fetch(`${API}/periods`);
////        periods = await pRes.json();
////
////        if (periods.length === 0) {
////            alert("⚠️ No periods found in database");
////            return;
////        }
////
////        render();
////    } catch (e) {
////        console.error(e);
////        alert("Backend not reachable");
////    }
////}
////
////function render() {
////    dateEl.innerText = "Date: " + new Date().toLocaleDateString();
////
////    // clear old
////    periodHeader.innerHTML = "<th>Student Name</th>";
////    tableBody.innerHTML = "";
////
////    // create period headers
////    periods.forEach(p => {
////        const th = document.createElement("th");
////        th.innerText = "P" + p.periodNo;
////        periodHeader.appendChild(th);
////    });
////
////    // create rows
////    students.forEach(stu => {
////        const tr = document.createElement("tr");
////
////        const nameTd = document.createElement("td");
////        nameTd.innerText = stu.name;
////        tr.appendChild(nameTd);
////
////        periods.forEach(p => {
////            const td = document.createElement("td");
////            const cb = document.createElement("input");
////            cb.type = "checkbox";
////            cb.dataset.studentId = stu.id;
////            cb.dataset.periodId = p.id;
////            td.appendChild(cb);
////            tr.appendChild(td);
////        });
////
////        tableBody.appendChild(tr);
////    });
////}
////const reportBtn = document.getElementById("reportBtn");
////reportBtn.addEventListener("click", () => {
////    const studentId = 1; // get from dropdown
////    getStudentAttendance(studentId, 12, 2025);
////});
////
////// save attendance
////saveBtn.onclick = async () => {
////    const boxes = document.querySelectorAll("input[type=checkbox]");
////
////    for (let box of boxes) {
////        await fetch(`${API}/attendance/mark?studentId=${box.dataset.studentId}&periodId=${box.dataset.periodId}&present=${box.checked}`, {
////            method: "POST"
////        });
////    }
////    alert("Attendance saved successfully");
////};
////
////async function fetchCurrentPeriod() {
////    const res = await fetch(`${apiBase}/attendance/current-period`);
////    if (res.ok) {
////        const period = await res.json();
////        currentPeriodId = period ? period.id : null;
////        showCurrentPeriodMessage(period);
////    }
////}
////function showCurrentPeriodMessage(period) {
////    if (period) {
////        dateEl.innerHTML = `
////            📅 ${new Date().toLocaleDateString()} <br>
////            ⏰ <b>Current Period:</b> Period ${period.periodNo}
////            (${period.startTime} - ${period.endTime})
////        `;
////    } else {
////        dateEl.innerHTML = `
////            📅 ${new Date().toLocaleDateString()} <br>
////            ❌ No active period right now
////        `;
////    }
////}
////async function fetchData() {
////    await fetchCurrentPeriod();
////
////    const resStudents = await fetch(`${apiBase}/students`);
////    students = await resStudents.json();
////
////    const resPeriods = await fetch(`${apiBase}/periods`);
////    periods = await resPeriods.json();
////
////    renderTable();
////}
////async function getStudentAttendance(studentId, month, year) {
////    // 1️⃣ Fetch attendance for this student
////    const res = await fetch(`${apiBase}/attendance/student/${studentId}`);
////    const allAttendance = await res.json(); // all attendance records
////
////    // 2️⃣ Filter by month/year
////    const studentAttendance = allAttendance.filter(a => {
////        const d = new Date(a.date);
////        return d.getFullYear() === year && d.getMonth() === (month - 1); // JS month is 0-based
////    });
////
////    // 3️⃣ Calculate percentage
////    const totalPeriods = studentAttendance.length;
////    const presentCount = studentAttendance.filter(a => a.present).length;
////    const percentage = totalPeriods === 0 ? 0 : (presentCount / totalPeriods) * 100;
////
////    console.log(`Attendance Percentage: ${percentage.toFixed(2)}%`);
////}
////
//////setInterval(() => {
//////    location.reload();
//////}, 60000); // refresh every 1 minute
////
////loadData();
////getStudentAttendance(1, 12, 2025); // Student ID 1, December 2025
//
//
//
//
//
//
//
//
//
//// =====================
//// 1️⃣ Constants & DOM Elements
//// =====================
////const apiBase = "http://localhost:8080/api";
////const dateEl = document.getElementById("date");
////const tableBody = document.getElementById("tableBody");
////const periodHeader = document.getElementById("periodHeader");
////const saveBtn = document.getElementById("saveBtn");
////const reportBtn = document.getElementById("reportBtn"); // button to generate report
////
////// =====================
////// 2️⃣ Global Variables
////// =====================
////let currentPeriodId = null;
////let students = [];
////let periods = [];
////
////// =====================
////// 3️⃣ Fetch Data from Backend
////// =====================
//////async function fetchData() {
////   //    try {
////   //        const resStudents = await fetch(`${apiBase}/students`);
////   //        students = await resStudents.json();
////   //
////   //        const resPeriods = await fetch(`${apiBase}/periods`);
////   //        periods = await resPeriods.json();
////   //
////   //        renderTable(); // Render table after fetching students & periods
////   //    } catch (error) {
////   //        console.error("Error fetching data:", error);
////   //    }
////   //}
////async function fetchData() {
////    try {
////        // Fetch students
////        const resStudents = await fetch(`${apiBase}/students`);
////        students = await resStudents.json();
////
////        // Populate student dropdown
////        studentSelect.innerHTML = ""; // clear previous options
////        students.forEach(student => {
////            const option = document.createElement("option");
////            option.value = student.id;
////            option.innerText = student.name;
////            studentSelect.appendChild(option);
////        });
////
////        // Fetch periods
////        const resPeriods = await fetch(`${apiBase}/periods`);
////        periods = await resPeriods.json();
////
////        renderTable(); // Render table after fetching
////    } catch (error) {
////        console.error("Error fetching data:", error);
////    }
////}
////
////
////// =====================
////// 4️⃣ Render Attendance Table
////// =====================
////function renderTable() {
////    // Show today's date
////    dateEl.innerText = "Date: " + new Date().toLocaleDateString();
////
////    // Clear previous table content (if any)
////    periodHeader.innerHTML = "<th>Student Name</th>";
////    tableBody.innerHTML = "";
////
////    // Table Header
////    periods.forEach(period => {
////        const th = document.createElement("th");
////        th.innerText = `Period ${period.periodNo}`;
////        periodHeader.appendChild(th);
////    });
////
////    // Table Body
////    students.forEach(student => {
////        const tr = document.createElement("tr");
////
////        // Student Name
////        const tdName = document.createElement("td");
////        tdName.innerText = student.name;
////        tr.appendChild(tdName);
////
////        // Period Checkboxes
////        periods.forEach(period => {
////            const td = document.createElement("td");
////            const checkbox = document.createElement("input");
////            checkbox.type = "checkbox";
////            checkbox.dataset.studentId = student.id;
////            checkbox.dataset.periodId = period.id;
////
////            // Disable checkbox if not current period (optional: if you implement currentPeriod feature)
////            if (currentPeriodId && currentPeriodId !== period.id) {
////                checkbox.disabled = true;
////            }
////
////            td.appendChild(checkbox);
////            tr.appendChild(td);
////        });
////
////        tableBody.appendChild(tr);
////    });
////}
////
////// =====================
////// 5️⃣ Save Attendance to Backend
////// =====================
////saveBtn.addEventListener("click", async () => {
////    try {
////        const checkboxes = document.querySelectorAll("input[type=checkbox]");
////        for (let cb of checkboxes) {
////            await fetch(`${apiBase}/attendance/mark?studentId=${cb.dataset.studentId}&periodId=${cb.dataset.periodId}&present=${cb.checked}`, {
////                method: "POST"
////            });
////        }
////        alert("Attendance saved!");
////    } catch (error) {
////        console.error("Error saving attendance:", error);
////        alert("Failed to save attendance!");
////    }
////});
////
////// =====================
////// 6️⃣ Get Student Monthly Attendance & Calculate %
//// // Call on button click or dropdown selection
////// =====================
////async function getStudentAttendance(studentId, month, year) {
////    try {
////        // 1️⃣ Fetch attendance for this student
////        const res = await fetch(`${apiBase}/attendance/student/${studentId}`);
////        const allAttendance = await res.json();
////
////        // 2️⃣ Filter by month/year
////        const studentAttendance = allAttendance.filter(a => {
////            const d = new Date(a.date);
////            return d.getFullYear() === year && d.getMonth() === (month - 1);
////        });
////
////        // 3️⃣ Calculate percentage
////        const totalPeriods = studentAttendance.length;
////        const presentCount = studentAttendance.filter(a => a.present).length;
////        const percentage = totalPeriods === 0 ? 0 : (presentCount / totalPeriods) * 100;
////
////        console.log(`Attendance Percentage: ${percentage.toFixed(2)}%`);
////        alert(`Attendance Percentage: ${percentage.toFixed(2)}%`);
////    } catch (error) {
////        console.error("Error fetching student attendance:", error);
////    }
////}
////
////// =====================
////// 7️⃣ Report Button Event
////// =====================
//////reportBtn.addEventListener("click", () => {
//////    const studentId = 1; // Replace with dynamic dropdown value
//////    getStudentAttendance(studentId, 12, 2025); // December 2025
//////});
////
////reportBtn.addEventListener("click", () => {
////    const studentId = studentSelect.value;
////    const month = parseInt(monthSelect.value);
////    const year = parseInt(yearInput.value);
////
////    getStudentAttendance(studentId, month, year);
////});
////
////
////// =====================
////// 8️⃣ Initialize
////// =====================
////fetchData();
//
//
//
//
//
//
//
//// =====================
//// 1️⃣ Constants & DOM Elements
//// =====================
////const apiBase = "http://localhost:8080/api";
////const dateEl = document.getElementById("date");
////const tableBody = document.getElementById("tableBody");
////const periodHeader = document.getElementById("periodHeader");
////const saveBtn = document.getElementById("saveBtn");
////const reportBtn = document.getElementById("reportBtn");
////const studentSelect = document.getElementById("studentSelect");
////const monthSelect = document.getElementById("monthSelect");
////const yearInput = document.getElementById("yearInput");
////const attendancePercentageEl = document.getElementById("attendancePercentage");
////const reportHeader = document.getElementById("reportHeader");
////const reportBody = document.getElementById("reportBody");
////
////// =====================
////// 2️⃣ Global Variables
////// =====================
////let currentPeriodId = null;
////let students = [];
////let periods = [];
////
////// =====================
////// 3️⃣ Fetch Data from Backend
////// =====================
////async function fetchData() {
////    try {
////        // Fetch students
////        const resStudents = await fetch(`${apiBase}/students`);
////        students = await resStudents.json();
////
////        // Populate student dropdown
////        studentSelect.innerHTML = "";
////        students.forEach(student => {
////            const option = document.createElement("option");
////            option.value = student.id;
////            option.innerText = student.name;
////            studentSelect.appendChild(option);
////        });
////
////        // Fetch periods
////        const resPeriods = await fetch(`${apiBase}/periods`);
////        periods = await resPeriods.json();
////
////        renderTable();
////    } catch (error) {
////        console.error("Error fetching data:", error);
////    }
////}
////
////// =====================
////// 4️⃣ Render Attendance Table
////// =====================
////function renderTable() {
////    dateEl.innerText = "Date: " + new Date().toLocaleDateString();
////
////    periodHeader.innerHTML = "<th>Student Name</th>";
////    tableBody.innerHTML = "";
////
////    // Table Header
////    periods.forEach(period => {
////        const th = document.createElement("th");
////        th.innerText = `Period ${period.periodNo}`;
////        periodHeader.appendChild(th);
////    });
////
////    // Table Body
////   students.forEach(student => {
//////        const tr = document.createElement("tr");
//////
//////        // Student Name
//////        const tdName = document.createElement("td");
//////        tdName.innerText = student.name;
//////        tr.appendChild(tdName);
////        // Student Name + Photo
////        const tdName = document.createElement("td");
////        tdName.classList.add("student-cell");
////
////        const img = document.createElement("img");
////        img.src = student.photo_path ? student.photo_path : "/photos/default.png";
////        img.classList.add("profile-pic");
////
////        const span = document.createElement("span");
////        span.innerText = student.name;
////
////        tdName.appendChild(img);
////        tdName.appendChild(span);
////        tr.appendChild(tdName);
////
////
////        // Period Checkboxes
////        periods.forEach(period => {
////            const td = document.createElement("td");
////            const checkbox = document.createElement("input");
////            checkbox.type = "checkbox";
////            checkbox.dataset.studentId = student.id;
////            checkbox.dataset.periodId = period.id;
////            td.appendChild(checkbox);
////            tr.appendChild(td);
////        });
////
////        tableBody.appendChild(tr);
////    });
////}
////
////// =====================
////// 5️⃣ Save Attendance to Backend
////// =====================
////saveBtn.addEventListener("click", async () => {
////    try {
////        const checkboxes = document.querySelectorAll("input[type=checkbox]");
////        for (let cb of checkboxes) {
////            await fetch(`${apiBase}/attendance/mark?studentId=${cb.dataset.studentId}&periodId=${cb.dataset.periodId}&present=${cb.checked}`, {
////                method: "POST"
////            });
////        }
////        alert("Attendance saved!");
////    } catch (error) {
////        console.error("Error saving attendance:", error);
////        alert("Failed to save attendance!");
////    }
////});
////
////// =====================
////// 6️⃣ Render Monthly Attendance Report
////// =====================
////async function renderMonthlyReport(studentId, month, year) {
////    try {
////        const res = await fetch(`${apiBase}/attendance/student/${studentId}`);
////        const allAttendance = await res.json();
////
////        // Filter by month/year & normalize date
////        const monthAttendance = allAttendance
////            .map(a => {
////                const d = new Date(a.date);
////                a.simpleDate = d.toISOString().split('T')[0];
////                return a;
////            })
////            .filter(a => {
////                const d = new Date(a.date);
////                return d.getFullYear() === year && d.getMonth() === (month - 1);
////            });
////
////        // Get unique days
////        const daysSet = new Set(monthAttendance.map(a => a.simpleDate));
////        const days = Array.from(daysSet).sort();
////
////        // Clear previous table
////        reportHeader.innerHTML = "";
////        reportBody.innerHTML = "";
////
////        // Header Row
////        const trHead = document.createElement("tr");
////        const thDate = document.createElement("th");
////        thDate.innerText = "Date";
////        trHead.appendChild(thDate);
////
////        periods.forEach(period => {
////            const th = document.createElement("th");
////            th.innerText = `Period ${period.periodNo}`;
////            trHead.appendChild(th);
////        });
////        reportHeader.appendChild(trHead);
////
////        // Table Body
////        let presentCount = 0;
////        let totalCount = 0;
////
////        days.forEach(day => {
////            const tr = document.createElement("tr");
////            const tdDate = document.createElement("td");
////            tdDate.innerText = day;
////            tr.appendChild(tdDate);
////
////            periods.forEach(period => {
////                const td = document.createElement("td");
////                const record = monthAttendance.find(a => a.simpleDate === day && a.period.id === period.id);
////                if (record) {
////                    td.innerText = record.present ? "✔️" : "❌";
////                    if (record.present) presentCount++;
////                    totalCount++;
////                } else {
////                    td.innerText = "-";
////                }
////                tr.appendChild(td);
////            });
////
////            reportBody.appendChild(tr);
////        });
////
////        // Attendance percentage
////        const percentage = totalCount === 0 ? 0 : (presentCount / totalCount) * 100;
////        attendancePercentageEl.innerText = `Attendance Percentage: ${percentage.toFixed(2)}%`;
////
////    } catch (error) {
////        console.error("Error generating monthly report:", error);
////    }
////}
////
////// =====================
////// 7️⃣ Report Button Event
////// =====================
////reportBtn.addEventListener("click", () => {
////    const studentId = parseInt(studentSelect.value);
////    const month = parseInt(monthSelect.value);
////    const year = parseInt(yearInput.value);
////
////    renderMonthlyReport(studentId, month, year);
////});
////
////function loadDailySummary() {
////  const date = document.getElementById("summaryDate").value;
////
////  fetch(`/attendance/summary?date=${date}`)
////    .then(res => res.json())
////    .then(data => {
////      const present = document.getElementById("presentList");
////      const absent = document.getElementById("absentList");
////
////      present.innerHTML = "";
////      absent.innerHTML = "";
////
////      data.forEach(s => {
////        const li = document.createElement("li");
////        li.textContent = s.name;
////
////        if (s.present) present.appendChild(li);
////        else absent.appendChild(li);
////      });
////    });
////}
//
//
//// =====================
//// 8️⃣ Initialize
//// =====================
//fetchData();
//
//
//
//
////const apiBase = "http://localhost:8080/api";
////
////const dateEl = document.getElementById("date");
////const tableBody = document.getElementById("tableBody");
////const periodHeader = document.getElementById("periodHeader");
////const saveBtn = document.getElementById("saveBtn");
////const reportBtn = document.getElementById("reportBtn");
////
////const studentSelect = document.getElementById("studentSelect");
////const monthSelect = document.getElementById("monthSelect");
////const yearInput = document.getElementById("yearInput");
////
////const reportHeader = document.getElementById("reportHeader");
////const reportBody = document.getElementById("reportBody");
////const attendancePercentage = document.getElementById("attendancePercentage");
////
////let students = [];
////let periods = [];
////
////// =====================
////// FETCH DATA
////// =====================
////async function fetchData() {
////    students = await fetch(`${apiBase}/students`).then(r => r.json());
////    periods = await fetch(`${apiBase}/periods`).then(r => r.json());
////
////    renderAttendanceTable();
////    populateStudentDropdown();
////}
////
////fetchData();
////
////// =====================
////// RENDER ATTENDANCE TABLE
////// =====================
////function renderAttendanceTable() {
////    dateEl.innerText = "Date: " + new Date().toLocaleDateString();
////
////    periodHeader.innerHTML = "<th>Student Name</th>";
////    tableBody.innerHTML = "";
////
////    periods.forEach(p => {
////        const th = document.createElement("th");
////        th.innerText = "P" + p.periodNo;
////        periodHeader.appendChild(th);
////    });
////
////    students.forEach(student => {
////        const tr = document.createElement("tr");
////
////        const nameTd = document.createElement("td");
////        nameTd.innerText = student.name;
////        tr.appendChild(nameTd);
////
////        periods.forEach(period => {
////            const td = document.createElement("td");
////            const cb = document.createElement("input");
////
////            cb.type = "checkbox";
////            cb.dataset.studentId = student.id;
////            cb.dataset.periodId = period.id;
////
////            td.appendChild(cb);
////            tr.appendChild(td);
////        });
////
////        tableBody.appendChild(tr);
////
////        // 🔸 BREAK after Period 2
////        if (student === students[0]) {
////            insertBreakRow(2, "☕ Break – 10 Minutes");
////        }
////
////        // 🔸 LUNCH after Period 4
////        if (student === students[0]) {
////            insertLunchRow(4, "🍽 Lunch – 1 Hour");
////        }
////    });
////}
////
////// =====================
////// BREAK & LUNCH ROWS
////// =====================
////function insertBreakRow(afterPeriod, label) {
////    const tr = document.createElement("tr");
////    tr.className = "break-row";
////
////    const td = document.createElement("td");
////    td.colSpan = periods.length + 1;
////    td.innerText = label;
////
////    tr.appendChild(td);
////    tableBody.appendChild(tr);
////}
////
////function insertLunchRow(afterPeriod, label) {
////    const tr = document.createElement("tr");
////    tr.className = "lunch-row";
////
////    const td = document.createElement("td");
////    td.colSpan = periods.length + 1;
////    td.innerText = label;
////
////    tr.appendChild(td);
////    tableBody.appendChild(tr);
////}
////
////// =====================
////// SAVE ATTENDANCE
////// =====================
////saveBtn.addEventListener("click", async () => {
////    const checkboxes = document.querySelectorAll("input[type=checkbox]");
////
////    for (let cb of checkboxes) {
////        await fetch(`${apiBase}/attendance/mark`, {
////            method: "POST",
////            headers: { "Content-Type": "application/json" },
////            body: JSON.stringify({
////                studentId: cb.dataset.studentId,
////                periodId: cb.dataset.periodId,
////                present: cb.checked
////            })
////        });
////    }
////
////    alert("Attendance Saved Successfully ✅");
////});
////
////// =====================
////// STUDENT DROPDOWN
////// =====================
////function populateStudentDropdown() {
////    studentSelect.innerHTML = "";
////    students.forEach(s => {
////        const option = document.createElement("option");
////        option.value = s.id;
////        option.innerText = s.name;
////        studentSelect.appendChild(option);
////    });
////}
////
////// =====================
////// GENERATE MONTHLY REPORT
////// =====================
////reportBtn.addEventListener("click", async () => {
////    const studentId = studentSelect.value;
////    const month = monthSelect.value;
////    const year = yearInput.value;
////
////    const data = await fetch(
////        `${apiBase}/attendance/report?studentId=${studentId}&month=${month}&year=${year}`
////    ).then(r => r.json());
////
////    renderReport(data);
////});
////
////// =====================
////// RENDER REPORT
////// =====================
////function renderReport(data) {
////    reportHeader.innerHTML = "";
////    reportBody.innerHTML = "";
////
////    let headerRow = "<tr><th>Date</th>";
////    periods.forEach(p => headerRow += `<th>P${p.periodNo}</th>`);
////    headerRow += "</tr>";
////    reportHeader.innerHTML = headerRow;
////
////    let total = 0;
////    let present = 0;
////
////    data.forEach(day => {
////        let row = `<tr><td>${day.date}</td>`;
////
////        periods.forEach(p => {
////            const status = day.records.find(r => r.periodId === p.id);
////            if (status && status.present) {
////                row += "<td>✔</td>";
////                present++;
////            } else {
////                row += "<td>✖</td>";
////            }
////            total++;
////        });
////
////        row += "</tr>";
////        reportBody.innerHTML += row;
////    });
////
////    const percentage = total === 0 ? 0 : ((present / total) * 100).toFixed(2);
////    attendancePercentage.innerText = `Attendance Percentage: ${percentage}%`;
////}
//
//
//
//
//
//
//
//
//
//
//
//
//
//// =====================
//// 1️⃣ Constants & DOM Elements
//// =====================
////const apiBase = "http://localhost:8080/api";
////const today = new Date().toISOString().split("T")[0];
////
////const dateEl = document.getElementById("date");
////const tableBody = document.getElementById("tableBody");
////const periodHeader = document.getElementById("periodHeader");
////const saveBtn = document.getElementById("saveBtn");
////const reportBtn = document.getElementById("reportBtn");
////
////const studentSelect = document.getElementById("studentSelect");
////const monthSelect = document.getElementById("monthSelect");
////const yearInput = document.getElementById("yearInput");
////
////const attendancePercentageEl = document.getElementById("attendancePercentage");
////const reportHeader = document.getElementById("reportHeader");
////const reportBody = document.getElementById("reportBody");
////
////// =====================
////// 2️⃣ Global Variables
////// =====================
////let students = [];
////let periods = [];
////
////// =====================
////// 3️⃣ Fetch Data
////// =====================
////async function fetchData() {
////    try {
////        const resStudents = await fetch(`${apiBase}/students`);
////        students = await resStudents.json();
////
////        const resPeriods = await fetch(`${apiBase}/periods`);
////        periods = await resPeriods.json();
////
////        populateStudentDropdown();
////        renderTable();
////
////    } catch (err) {
////        console.error("Fetch failed:", err);
////    }
////}
////
////function populateStudentDropdown() {
////    studentSelect.innerHTML = "";
////    students.forEach(s => {
////        const opt = document.createElement("option");
////        opt.value = s.id;
////        opt.textContent = s.name;
////        studentSelect.appendChild(opt);
////    });
////}
////
////// =====================
////// 4️⃣ Render Attendance Table
////// =====================
////function renderTable() {
////    dateEl.textContent = "Date: " + new Date().toLocaleDateString();
////
////    periodHeader.innerHTML = "<th>Student Name</th>";
////    tableBody.innerHTML = "";
////
////    // Header
////    periods.forEach(p => {
////        const th = document.createElement("th");
////        th.textContent = `Period ${p.periodNo}`;
////        periodHeader.appendChild(th);
////    });
////
////    // Body
////    students.forEach(student => {
////        const tr = document.createElement("tr");
////
////        // Name + Photo
////        const tdName = document.createElement("td");
////        tdName.className = "student-cell";
////
////        const img = document.createElement("img");
////        img.src = student.photoPath || "/photos/default.png";
////        img.className = "profile-pic";
////
////        const span = document.createElement("span");
////        span.textContent = student.name;
////
////        tdName.appendChild(img);
////        tdName.appendChild(span);
////        tr.appendChild(tdName);
////
////        // Period checkboxes
////        periods.forEach(period => {
////            const td = document.createElement("td");
////            const cb = document.createElement("input");
////
////            cb.type = "checkbox";
////            cb.dataset.studentId = student.id;
////            cb.dataset.periodId = period.id;
////
////            td.appendChild(cb);
////            tr.appendChild(td);
////        });
////
////        tableBody.appendChild(tr);
////    });
////}
////
////document.addEventListener("DOMContentLoaded", () => {
////    loadStudentsAndPeriods();
////});
////// =====================
////// 5️⃣ Save Attendance
////// =====================
////saveBtn.addEventListener("click", async () => {
////    try {
////        const checkboxes = document.querySelectorAll("input[type=checkbox]");
////
////        for (const cb of checkboxes) {
////            await fetch(
////              `${apiBase}/attendance/mark?studentId=${cb.dataset.studentId}&periodId=${cb.dataset.periodId}&date=${today}&present=${cb.checked}`,
////              { method: "POST" }
////            );
////
////        }
////
////        alert("Attendance saved successfully ✔");
////
////    } catch (err) {
////        console.error(err);
////        alert("Attendance save failed ❌");
////    }
////});
////
////// =====================
////// 6️⃣ Monthly Report
////// =====================
////async function renderMonthlyReport(studentId, month, year) {
////    try {
////        const res = await fetch(`${apiBase}/attendance/student/${studentId}`);
////        const data = await res.json();
////
////        const filtered = data.filter(a => {
////            const d = new Date(a.date);
////            return d.getFullYear() === year && d.getMonth() === month - 1;
////        });
////
////        const days = [...new Set(filtered.map(a => a.date))].sort();
////
////        reportHeader.innerHTML = "";
////        reportBody.innerHTML = "";
////
////        const headRow = document.createElement("tr");
////        headRow.innerHTML = "<th>Date</th>";
////        periods.forEach(p => {
////            headRow.innerHTML += `<th>P${p.periodNo}</th>`;
////        });
////        reportHeader.appendChild(headRow);
////
////        let present = 0, total = 0;
////
////        days.forEach(day => {
////            const tr = document.createElement("tr");
////            tr.innerHTML = `<td>${day}</td>`;
////
////            periods.forEach(p => {
//////                const rec = filtered.find(a => a.date === day && a.period.id === p.id);
////                const rec = filtered.find(
////                  a => a.date === day && a.period.periodNo === p.periodNo
////                );
////                const td = document.createElement("td");
////
////                if (rec) {
////                    td.textContent = rec.status === "present" ? "✔️" : "❌";
////                    if (rec.status === "Present") present++;
////                    total++;
////                } else {
////                    td.textContent = "-";
////                }
////                tr.appendChild(td);
////            });
////
////            reportBody.appendChild(tr);
////        });
////
////        const percent = total === 0 ? 0 : (present / total) * 100;
////        attendancePercentageEl.textContent = `Attendance Percentage: ${percent.toFixed(2)}%`;
////
////    } catch (err) {
////        console.error("Report error:", err);
////    }
////}
////
////// =====================
////// 7️⃣ Report Button
////// =====================
////reportBtn.addEventListener("click", () => {
////    renderMonthlyReport(
////        Number(studentSelect.value),
////        Number(monthSelect.value),
////        Number(yearInput.value)
////    );
////});
////
////// =====================
////// 8️⃣ Daily Summary
////// =====================
////function loadDailySummary() {
////    const date = document.getElementById("summaryDate").value;
////
////    fetch(`${apiBase}/attendance/summary?date=${date}`)
////        .then(r => r.json())
////        .then(data => {
////            const present = document.getElementById("presentList");
////            const absent = document.getElementById("absentList");
////
////            present.innerHTML = "";
////            absent.innerHTML = "";
////
////            data.forEach(s => {
////                const li = document.createElement("li");
////                li.textContent = s.name;
////                (s.present ? present : absent).appendChild(li);
////            });
////        });
////}
////
////// =====================
////// 9️⃣ Init
////// =====================
////fetchData();
//
//
//
//
//
//
//
//
//
//
//// =====================
//// 1️⃣ Constants
//// =====================
//const apiBase = "http://localhost:8080/api";
//const today = new Date().toISOString().split("T")[0];
//
//// =====================
//// 2️⃣ DOM Elements
//// =====================
//const dateEl = document.getElementById("date");
//const tableBody = document.getElementById("tableBody");
//const periodHeader = document.getElementById("periodHeader");
//const saveBtn = document.getElementById("saveBtn");
//
//const studentSelect = document.getElementById("studentSelect");
//const monthSelect = document.getElementById("monthSelect");
//const yearInput = document.getElementById("yearInput");
//const reportBtn = document.getElementById("reportBtn");
//
//const attendancePercentageEl = document.getElementById("attendancePercentage");
//const reportHeader = document.getElementById("reportHeader");
//const reportBody = document.getElementById("reportBody");
//
//// =====================
//// 3️⃣ Global Data
//// =====================
//let students = [];
//let periods = [];
//
//// =====================
//// 4️⃣ INIT
//// =====================
//document.addEventListener("DOMContentLoaded", init);
//
//async function init() {
//    await fetchData();
//}
//
//// =====================
//// 5️⃣ Fetch Students & Periods
//// =====================
//async function fetchData() {
//    try {
//        const resStudents = await fetch(`${apiBase}/students`);
//        students = await resStudents.json();
//
//        const resPeriods = await fetch(`${apiBase}/periods`);
//        periods = await resPeriods.json();
//
//        populateStudentDropdown();
//        renderAttendanceTable();
//
//    } catch (err) {
//        console.error("Fetch failed:", err);
//    }
//}
////<!-- Today's Date -->
//<p id="date"></p>
//// =====================
//// 6️⃣ Student Dropdown
//// =====================
//function populateStudentDropdown() {
//    studentSelect.innerHTML = "<option value=''>--Select Student--</option>";
//
//    students.forEach(s => {
//        const opt = document.createElement("option");
//        opt.value = s.id;
//        opt.textContent = s.name;
//        studentSelect.appendChild(opt);
//    });
//}
//
//// =====================
//// 7️⃣ Render Attendance Table
//// =====================
//function renderAttendanceTable() {
//    dateEl.textContent = "Date: " + new Date().toLocaleDateString();
//
//    periodHeader.innerHTML = "<th>Student Name</th>";
//    tableBody.innerHTML = "";
//
//    periods.forEach(p => {
//        const th = document.createElement("th");
//        th.textContent = `P${p.periodNo}`;
//        periodHeader.appendChild(th);
//    });
//
//    students.forEach(student => {
//        console.log(student.photoPath);
//
//        const tr = document.createElement("tr");
//
//        const tdName = document.createElement("td");
//        const img = document.createElement("img");
//                img.src = student.photoPath
//                    ? `/photos/${student.photoPath}`
//                    : "/photos/default.png";
//
//                img.width = 40;
//                img.height = 40;
//                img.style.borderRadius = "50%";
//                img.style.objectFit = "cover";
//                img.style.marginRight = "8px";
//
//                tdName.appendChild(img);
//        tdName.appendChild(document.createTextNode(""+student.name));
//        tdName.textContent = student.name;
//        tr.appendChild(tdName);
//
//        periods.forEach(period => {
//            const td = document.createElement("td");
//            const cb = document.createElement("input");
//
//            cb.type = "checkbox";
//            cb.dataset.studentId = student.id;
//            cb.dataset.periodId = period.id;
//
//            td.appendChild(cb);
//            tr.appendChild(td);
//        });
//
//        tableBody.appendChild(tr);
//    });
//}
//
//// =====================
//// 8️⃣ Save Attendance
//// =====================
//saveBtn.addEventListener("click", async () => {
//    try {
//        const checkboxes = document.querySelectorAll("input[type=checkbox]");
//
//        for (const cb of checkboxes) {
//
//            const status = cb.checked ? "Present" : "Absent";
//
//            await fetch(
//                `${apiBase}/attendance/mark?studentId=${cb.dataset.studentId}&periodId=${cb.dataset.periodId}&date=${today}&status=${status}`,
//                { method: "POST" }
//            );
//        }
//
//        alert("Attendance saved ✔");
//
//    } catch (err) {
//        console.error(err);
//        alert("Attendance save failed ❌");
//    }
//});
//
//// =====================
//// 9️⃣ Monthly Report
//// =====================
//async function renderMonthlyReport() {
//
//    const studentId = studentSelect.value;
//    const month = parseInt(monthSelect.value);
//    const year = parseInt(yearInput.value);
//
//    if (!studentId) {
//        alert("Please select a student");
//        return;
//    }
//
//    try {
//        const res = await fetch(`${apiBase}/attendance/student/${studentId}`);
//        const data = await res.json();
//
//        const monthData = data.map(a => {
//            const d = new Date(a.date);
//            return {
//                ...a,
//                simpleDate: d.toISOString().split("T")[0],
//                year: d.getFullYear(),
//                month: d.getMonth() + 1
//            };
//        }).filter(a => a.year === year && a.month === month);
//
//        const days = [...new Set(monthData.map(a => a.simpleDate))].sort();
//
//        reportHeader.innerHTML = "";
//        reportBody.innerHTML = "";
//
//        let headRow = document.createElement("tr");
//        headRow.innerHTML = "<th>Date</th>";
//        periods.forEach(p => {
//            headRow.innerHTML += `<th>P${p.periodNo}</th>`;
//        });
//        reportHeader.appendChild(headRow);
//
//        let present = 0;
//        let total = 0;
//
//        days.forEach(day => {
//            let tr = document.createElement("tr");
//            tr.innerHTML = `<td>${day}</td>`;
//
//            periods.forEach(p => {
//                const rec = monthData.find(a =>
//                    a.simpleDate === day && a.period.id === p.id
//                );
//
//                if (rec) {
//
//                    let symbol = "❌";
//
//                    if (rec.status === "Present") symbol = "✔️";
//                    if (rec.status === "Late") symbol = "⏰";
//                    if (rec.status === "Excused") symbol = "📝";
//
//                    tr.innerHTML += `<td>${symbol}</td>`;
//
//                    total++;
//
//                    if (rec.status === "Present") present++;
//
//                } else {
//                    tr.innerHTML += `<td>-</td>`;
//                }
//            });
//
//            reportBody.appendChild(tr);
//        });
//
//        const percent = total === 0 ? 0 : (present / total) * 100;
//        attendancePercentageEl.innerText =
//            `Attendance Percentage: ${percent.toFixed(2)}%`;
//
//    } catch (err) {
//        console.error("Report error:", err);
//    }
//}
//
//// =====================
//// 🔟 Report Button
//// =====================
//reportBtn.addEventListener("click", renderMonthlyReport);
//
//
//
//


//// ======================
//// CONFIG
//// ======================
//const apiBase = "http://localhost:8080/api";
//const today = new Date().toISOString().split("T")[0];
//
//// DOM
//const dateEl = document.getElementById("date");
//const tableBody = document.getElementById("tableBody");
//const periodHeader = document.getElementById("periodHeader");
//const saveBtn = document.getElementById("saveBtn");
//
//const studentSelect = document.getElementById("studentSelect");
//const monthSelect = document.getElementById("monthSelect");
//const yearInput = document.getElementById("yearInput");
//
//const reportHeader = document.getElementById("reportHeader");
//const reportBody = document.getElementById("reportBody");
//const attendancePercentageEl = document.getElementById("attendancePercentage");
//const reportBtn = document.getElementById("reportBtn");
//
//// DATA
//let students = [];
//let periods = [];
//
//
//// ======================
//// FETCH DATA
//// ======================
//async function fetchData() {
//
//    try {
//
//        const studentRes = await fetch(`${apiBase}/students`);
//        students = await studentRes.json();
//
//        const periodRes = await fetch(`${apiBase}/periods`);
//        periods = await periodRes.json();
//
//        populateStudentDropdown();
//        renderTable();
//
//    } catch(err){
//
//        console.error(err);
//        alert("Backend not reachable");
//
//    }
//}
//
//
//// ======================
//// STUDENT DROPDOWN
//// ======================
//function populateStudentDropdown(){
//
//    studentSelect.innerHTML = "";
//
//    students.forEach(student=>{
//
//        const opt = document.createElement("option");
//
//        opt.value = student.id;
//        opt.textContent = student.name;
//
//        studentSelect.appendChild(opt);
//
//    });
//
//}
//
//function loadAttendanceTable(students, periods) {
//
//    const tableBody = document.getElementById("attendanceTableBody");
//    tableBody.innerHTML = "";
//
//    students.forEach(student => {
//
//        const row = document.createElement("tr");
//
//        // Student name column
//        const nameCell = document.createElement("td");
//        nameCell.textContent = student.name;
//        row.appendChild(nameCell);
//
//        // Period checkboxes
//        periods.forEach(period => {
//
//            const cell = document.createElement("td");
//
//            const checkbox = document.createElement("input");
//            checkbox.type = "checkbox";
//
//            // ⭐ ADD YOUR CODE HERE
//            checkbox.addEventListener("change", function () {
//
//                const studentId = student.id;
//                const periodId = period.id;
//
//                const status = this.checked ? "PRESENT" : "ABSENT";
//
//                fetch(`/api/attendance/mark?studentId=${studentId}&periodId=${periodId}&status=${status}`, {
//                    method: "POST"
//                })
//                .then(res => res.json())
//                .then(data => console.log("Saved:", data))
//                .catch(err => console.error("Error:", err));
//
//            });
//
//            cell.appendChild(checkbox);
//            row.appendChild(cell);
//
//        });
//
//        tableBody.appendChild(row);
//
//    });
//
//}
//// ======================
//// RENDER TABLE
//// ======================
//function renderTable(){
//
//    dateEl.textContent =
//    "Date: " + new Date().toLocaleDateString();
//
//    periodHeader.innerHTML = "<th>Student</th>";
//    tableBody.innerHTML = "";
//
//    periods.forEach(p=>{
//
//        const th = document.createElement("th");
//
//        th.textContent = "P" + p.periodNo;
//
//        periodHeader.appendChild(th);
//
//    });
//
//
//    students.forEach(student=>{
//
//        const tr = document.createElement("tr");
//
//        // NAME + PHOTO
//        const tdName = document.createElement("td");
//
//        const img = document.createElement("img");
//
//        img.src =
//        student.photoPath || "/photos/default.png";
//
//        img.style.width="35px";
//        img.style.height="35px";
//        img.style.borderRadius="50%";
//        img.style.marginRight="8px";
//
//        const span =
//        document.createElement("span");
//
//        span.textContent = student.name;
//
//        tdName.appendChild(img);
//        tdName.appendChild(span);
//
//        tr.appendChild(tdName);
//
//
//        // PERIOD CHECKBOXES
//        periods.forEach(period=>{
//
//            const td = document.createElement("td");
//
//            const cb =
//            document.createElement("input");
//
//            cb.type="checkbox";
//
//            cb.dataset.studentId=student.id;
//            cb.dataset.periodId=period.periodNo;
//
//            td.appendChild(cb);
//
//            tr.appendChild(td);
//
//        });
//
//        tableBody.appendChild(tr);
//
//    });
//
//}
//
//
//// ======================
//// SAVE ATTENDANCE
//// ======================
//saveBtn.addEventListener("click", async () => {
//
//    try {
//
//        const checkboxes =
//        document.querySelectorAll("input[type=checkbox]");
//
//        for (const cb of checkboxes) {
//
//            const studentId = cb.dataset.studentId;
//            const periodId = cb.dataset.periodId;
//
//            const status =
//            cb.checked ? "Present" : "Absent";
//
//            await fetch(
//                `${apiBase}/attendance/mark?studentId=${studentId}&periodId=${periodId}&date=${today}&status=${status}`,
//                { method: "POST" }
//            );
//        }
//
//        alert("Attendance Saved Successfully");
//
//    }
//    catch(err) {
//
//        console.error(err);
//        alert("Save failed");
//
//    }
//
//});
//
//
//// =====================
//// Monthly Report Function
//// =====================
//async function renderMonthlyReport() {
//
//    const studentId = studentSelect.value;
//    const month = parseInt(monthSelect.value);
//    const year = parseInt(yearInput.value);
//
//    if (!studentId) {
//        alert("Please select student");
//        return;
//    }
//
//    try {
//
//        const res = await fetch(`${apiBase}/attendance/student/${studentId}`);
//        const data = await res.json();
//
//
//        // Filter month/year
//        const monthData = data.map(a => {
//
//            const d = new Date(a.date);
//
//            return {
//                ...a,
//                simpleDate: d.toISOString().split("T")[0],
//                year: d.getFullYear(),
//                month: d.getMonth() + 1
//            };
//
//        }).filter(a =>
//            a.year === year && a.month === month
//        );
//
//
//        const days = [...new Set(monthData.map(a => a.simpleDate))];
//
//
//        // Clear previous
//        reportHeader.innerHTML = "";
//        reportBody.innerHTML = "";
//
//
//        // Header row
//        const headRow = document.createElement("tr");
//
//        headRow.innerHTML = "<th>Date</th>";
//
//        periods.forEach(p => {
//
//            const th = document.createElement("th");
//            th.innerText = "P" + p.periodNo;
//            headRow.appendChild(th);
//
//        });
//
//        reportHeader.appendChild(headRow);
//
//
//        let present = 0;
//        let total = 0;
//
//
//        // Body rows
//        days.forEach(day => {
//
//            const tr = document.createElement("tr");
//
//            const dateTd = document.createElement("td");
//            dateTd.innerText = day;
//            tr.appendChild(dateTd);
//
//            periods.forEach(period => {
//
//                const td = document.createElement("td");
//
//                const cb = document.createElement("input");
//
//                cb.type = "checkbox";
//
//                cb.dataset.studentId = student.id;
//                cb.dataset.periodId = period.id;   // FIXED
//
//                td.appendChild(cb);
//
//                tr.appendChild(td);
//
//            });
//
//
////            periods.forEach(p => {
////
////                const td = document.createElement("td");
////
////                const rec = monthData.find(a =>
////                    a.simpleDate === day &&
////                    a.period.id === p.id
////                );
//
//
//                if (rec) {
//
//                    let symbol = "❌";
//
//                    if (rec.status === "Present") symbol = "✔️";
//                    if (rec.status === "Late") symbol = "⏰";
//                    if (rec.status === "Excused") symbol = "📝";
//
//                    td.innerText = symbol;
//
//                    total++;
//
//                    if (rec.status === "Present")
//                        present++;
//
//                } else {
//
//                    td.innerText = "-";
//
//                }
//
//                tr.appendChild(td);
//
//            });
//
//            reportBody.appendChild(tr);
//
//        });
//
//
//        // Percentage calculation
//        const percent =
//            total === 0
//            ? 0
//            : (present / total) * 100;
//
//
//        attendancePercentageEl.innerText =
//            `Attendance Percentage: ${percent.toFixed(2)}%`;
//
//
//    } catch (err) {
//
//        console.error(err);
//
//        alert("Failed to generate report");
//
//    }
//}
//
//// ======================
//// INIT
//// ======================
//fetchData();
//
//// =====================
//// Button Event
//// =====================
//reportBtn.addEventListener(
//    "click",
//    renderMonthlyReport
//);
//

// ======================
// CONFIG
// ======================
//const apiBase = "http://localhost:8080/api";
//const today = new Date( ).toISOString().split("T")[0];
//
//// ======================
//// DOM ELEMENTS
//// ======================
//const dateEl = document.getElementById("date");
//const tableBody = document.getElementById("tableBody");
//const periodHeader = document.getElementById("periodHeader");
//const saveBtn = document.getElementById("saveBtn");
//
//const studentSelect = document.getElementById("studentSelect");
//const monthSelect = document.getElementById("monthSelect");
//const yearInput = document.getElementById("yearInput");
//
//const reportHeader = document.getElementById("reportHeader");
//const reportBody = document.getElementById("reportBody");
//const attendancePercentageEl = document.getElementById("attendancePercentage");
//const reportBtn = document.getElementById("reportBtn");
//
//// ======================
//// DATA STORAGE
//// ======================
//let students = [];
//let periods = [];
//let currentPeriodId = null;
//
//// ======================
//// FETCH STUDENTS & PERIODS
//// ======================
//async function fetchData() {
//
//    try {
//
//        const studentRes =
//        await fetch(`${apiBase}/students`);
//
//        students = await studentRes.json();
//
//
//        const periodRes =
//        await fetch(`${apiBase}/periods`);
//
//        periods = await periodRes.json();
//
//
//        populateStudentDropdown();
//        renderTable();
//
//    }
//    catch(err){
//
//        console.error(err);
//        alert("Backend not reachable");
//
//    }
//
//}
//
//
//// ======================
//// STUDENT DROPDOWN
//// ======================
//function populateStudentDropdown(){
//
//    studentSelect.innerHTML = "";
//
//    students.forEach(student=>{
//
//        const option =
//        document.createElement("option");
//
//        option.value =
//        student.id;
//
//        option.textContent =
//        student.name;
//
//        studentSelect.appendChild(option);
//
//    });
//
//}
//async function fetchCurrentPeriod() {
//
//    const res = await fetch(`${apiBase}/period/current`);
//
//    if (!res.ok) {
//        alert("No active period now");
//        return;
//    }
//
//    const period = await res.json();
//
//    currentPeriodId = period.id;
//
//    console.log("Current period:", currentPeriodId);
//}
//await fetchCurrentPeriod();
//// ======================
//// RENDER ATTENDANCE TABLE
//// ======================
//function renderTable(){
//
//    dateEl.textContent =
//    "Date: " + today;
//
//
//    // HEADER
//    periodHeader.innerHTML =
//    "<th>Student</th>";
//
//    periods.forEach(period=>{
//
//        const th =
//        document.createElement("th");
//
//        th.textContent =
//        "P" + period.periodNo;
//
//        periodHeader.appendChild(th);
//
//    });
//
//
//    // BODY
//    tableBody.innerHTML = "";
//
//    students.forEach(student=>{
//
//        const tr =
//        document.createElement("tr");
//
//
//        // STUDENT NAME + PHOTO
//        const nameTd =
//        document.createElement("td");
//
//        const img =
//        document.createElement("img");
//
//        img.src =
//        student.photoPath || "/photos/default.png";
//
//        img.style.width="35px";
//        img.style.height="35px";
//        img.style.borderRadius="50%";
//        img.style.marginRight="8px";
//
//        const span =
//        document.createElement("span");
//
//        span.textContent =
//        student.name;
//
//        nameTd.appendChild(img);
//        nameTd.appendChild(span);
//
//        tr.appendChild(nameTd);
//
//
//        // CHECKBOXES
//        periods.forEach(period=>{
//
//            const td =
//            document.createElement("td");
//
//            const cb =
//            document.createElement("input");
//
//            cb.type = "checkbox";
//
//            // VERY IMPORTANT
//            cb.dataset.studentId =
//            student.id;
//
//            cb.dataset.periodId =
//            period.id;
//
//            td.appendChild(cb);
//
//            tr.appendChild(td);
//
//        });
//
//        tableBody.appendChild(tr);
//
//    });
//
//}
//
//
//// ======================
//// SAVE ATTENDANCE BUTTON
//// ======================
//saveBtn.addEventListener("click", async () => {
//
//    if (!currentPeriodId) {
//        alert("No active period currently");
//        return;
//    }
//
//    try {
//
//        const checkboxes =
//            document.querySelectorAll(
//                `input[data-period-id='${currentPeriodId}']`
//            );
//
//        for (const cb of checkboxes) {
//
//            const studentId = cb.dataset.studentId;
//
//            const status =
//                cb.checked ? "Present" : "Absent";
//
//            await fetch(
//                `${apiBase}/attendance/mark`,
//                {
//                    method: "POST",
//                    headers: {
//                        "Content-Type": "application/json"
//                    },
//                    body: JSON.stringify({
//                        studentId: studentId,
//                        periodId: currentPeriodId,
//                        date: today,
//                        status: status
//                    })
//                }
//            );
//        }
//
//        alert("Attendance saved for current period only");
//
//    }
//    catch (err) {
//
//        console.error(err);
//        alert("Save failed");
//
//    }
//
//});
//
//
//// ======================
//// GENERATE MONTHLY REPORT
//// ======================
//async function renderMonthlyReport(){
//
//    const studentId =
//    studentSelect.value;
//
//    const month =
//    parseInt(monthSelect.value);
//
//    const year =
//    parseInt(yearInput.value);
//
//
//    if(!studentId){
//
//        alert("Select student");
//        return;
//
//    }
//
//
//    try{
//
//        const res =
//        await fetch(
//            `${apiBase}/attendance/student/${studentId}`
//        );
//
//        const data =
//        await res.json();
//
//
//        const filtered =
//        data.filter(a=>{
//
//            const d =
//            new Date(a.date);
//
//            return (
//
//                d.getMonth()+1 === month &&
//                d.getFullYear() === year
//
//            );
//
//        });
//
//
//        const days =
//        [...new Set(
//            filtered.map(
//                a=>a.date
//            )
//        )];
//
//
//        // HEADER
//        reportHeader.innerHTML="";
//
//        const headRow =
//        document.createElement("tr");
//
//        headRow.innerHTML =
//        "<th>Date</th>";
//
//        periods.forEach(period=>{
//
//            const th =
//            document.createElement("th");
//
//            th.innerText =
//            "P"+period.periodNo;
//
//            headRow.appendChild(th);
//
//        });
//
//        reportHeader.appendChild(headRow);
//
//
//        // BODY
//        reportBody.innerHTML="";
//
//
//        let present=0;
//        let total=0;
//
//
//        days.forEach(day=>{
//
//            const tr =
//            document.createElement("tr");
//
//            const dateTd =
//            document.createElement("td");
//
//            dateTd.innerText =
//            day;
//
//            tr.appendChild(dateTd);
//
//
//            periods.forEach(period=>{
//
//                const td =
//                document.createElement("td");
//
//
//                const rec =
//                filtered.find(a=>
//
//                    a.date===day &&
//                    a.period.id===period.id
//
//                );
//
//
//                if(rec){
//
//                    total++;
//
//                    if(rec.status==="Present"){
//
//                        td.innerText="✔️";
//                        present++;
//
//                    }
//                    else{
//
//                        td.innerText="❌";
//
//                    }
//
//                }
//                else{
//
//                    td.innerText="-";
//
//                }
//
//                tr.appendChild(td);
//
//            });
//
//            reportBody.appendChild(tr);
//
//        });
//
//
//        // PERCENTAGE
//        const percent =
//        total===0
//        ?0
//        :(present/total)*100;
//
//
//        attendancePercentageEl.innerText =
//        "Attendance Percentage: "+
//        percent.toFixed(2)+"%";
//
//    }
//    catch(err){
//
//        console.error(err);
//        alert("Report Failed");
//
//    }
//
//}
//
//
//// ======================
//// BUTTON EVENT
//// ======================
//reportBtn.addEventListener(
//    "click",
//    renderMonthlyReport
//);
//
//
//// ======================
//// INIT
//// ======================
//fetchData();










// ======================
// CONFIG
// ======================
const apiBase = "http://localhost:8080/api";
const today = new Date().toISOString().split("T")[0];

// ======================
// DOM ELEMENTS
// ======================
const dateEl = document.getElementById("date");
const tableBody = document.getElementById("tableBody");
const periodHeader = document.getElementById("periodHeader");
const saveBtn = document.getElementById("saveBtn");

const studentSelect = document.getElementById("studentSelect");
const monthSelect = document.getElementById("monthSelect");
const yearInput = document.getElementById("yearInput");

const reportHeader = document.getElementById("reportHeader");
const reportBody = document.getElementById("reportBody");
const attendancePercentageEl = document.getElementById("attendancePercentage");
const reportBtn = document.getElementById("reportBtn");


// ======================
// DATA STORAGE
// ======================
let students = [];
let periods = [];
let currentPeriodId = null;


// ======================
// FETCH CURRENT ACTIVE PERIOD
// ======================
async function fetchCurrentPeriod() {

    try {

        const res =
        await fetch(`${apiBase}/period/current`);

        if (!res.ok) {

            alert("No active period currently");
            currentPeriodId = null;
            return;

        }

        const period =
        await res.json();

        currentPeriodId =
        period.id;

        console.log("Active Period ID:", currentPeriodId);

    }
    catch(err){

        console.error(err);
        alert("Failed to fetch current period");

    }

}


// ======================
// FETCH STUDENTS & PERIODS
// ======================
async function fetchData() {

    try {

        await fetchCurrentPeriod();


        const studentRes =
        await fetch(`${apiBase}/students`);

        students =
        await studentRes.json();


        const periodRes =
        await fetch(`${apiBase}/periods`);

        periods =
        await periodRes.json();


        populateStudentDropdown();
        renderTable();

    }
    catch(err){

        console.error(err);
        alert("Backend not reachable");

    }

}


// ======================
// STUDENT DROPDOWN
// ======================
function populateStudentDropdown(){

    studentSelect.innerHTML = "";

    students.forEach(student=>{

        const option =
        document.createElement("option");

        option.value =
        student.id;

        option.textContent =
        student.name;

        studentSelect.appendChild(option);

    });

}


// ======================
// RENDER ATTENDANCE TABLE
// ======================
function renderTable(){

    dateEl.textContent =
    "Date: " + today;


    // HEADER
    periodHeader.innerHTML =
    "<th>Student</th>";

    periods.forEach(period => {

        const th = document.createElement("th");

        th.innerText =
        `P${period.periodNo} (${period.startTime} - ${period.endTime})`;

        periodHeader.appendChild(th);

    });


    // BODY
    tableBody.innerHTML = "";

    students.forEach(student=>{

        const tr =
        document.createElement("tr");


        // STUDENT PHOTO + NAME
        const nameTd = document.createElement("td");

        const img = document.createElement("img");

        if(student.photoPath){
            img.src = `http://localhost:8080/photos/${student.photoPath}`;
        }else{
            img.src = "http://localhost:8080/photos/default.png";
        }

        img.style.width="50px";
        img.style.height="50px";
        img.style.objectFit="cover";
        img.style.borderRadius="50%";

        const span = document.createElement("span");
        span.textContent = student.name;

        const container = document.createElement("div");
        container.style.display="flex";
        container.style.alignItems="center";
        container.style.gap="10px";

        container.appendChild(img);
        container.appendChild(span);

        nameTd.appendChild(container);
        tr.appendChild(nameTd);


        // CHECKBOXES
        periods.forEach(period=>{

            const td =
            document.createElement("td");

            const cb =
            document.createElement("input");

            cb.type = "checkbox";

            cb.dataset.studentId =
            student.id;

            cb.dataset.periodId =
            period.id;


            // Disable other period checkboxes
            if(period.id !== currentPeriodId){

                cb.disabled = true;

            }

            td.appendChild(cb);
            tr.appendChild(td);

        });

        tableBody.appendChild(tr);

    });

}


// ======================
// SAVE ATTENDANCE BUTTON
// ======================
saveBtn.addEventListener("click", async () => {

    if (!currentPeriodId) {
        alert("No active period currently");
        return;
    }

    try {

        const checkboxes =
        document.querySelectorAll(
            `input[data-period-id='${currentPeriodId}']`
        );

        let alreadyTaken = false;

        for (const cb of checkboxes) {

            const studentId = cb.dataset.studentId;

            const status =
            cb.checked ? "Present" : "Absent";

            const response =
            await fetch(
                `${apiBase}/attendance/mark`,
                {
                    method: "POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({
                        studentId: studentId,
                        periodId: currentPeriodId,
                        date: today,
                        status: status
                    })
                }
            );

            // STOP if duplicate found
            if (!response.ok) {

                const msg = await response.text();

                alert(msg);

                alreadyTaken = true;

                break; // VERY IMPORTANT
            }

        }

        if (!alreadyTaken) {
            alert("Attendance saved successfully for current period");
        }

    }
    catch(err){

        console.error(err);
        alert("Save failed");

    }

});
//saveBtn.addEventListener("click", async () => {
//
//    if (!currentPeriodId) {
//
//        alert("No active period currently");
//        return;
//
//    }
//
//    try {
//
//        const checkboxes =
//        document.querySelectorAll(
//        `input[data-period-id='${currentPeriodId}']`
//        );
//
//
//        for (const cb of checkboxes) {
//
//            const studentId =
//            cb.dataset.studentId;
//
//            const status =
//            cb.checked ? "Present" : "Absent";
//
//
//            const response =
//            await fetch(
//                `${apiBase}/attendance/mark`,
//                {
//                    method: "POST",
//                    headers:{
//                        "Content-Type":"application/json"
//                    },
//                    body: JSON.stringify({
//
//                        studentId: studentId,
//                        periodId: currentPeriodId,
//                        date: today,
//                        status: status
//
//                    })
//                }
//            );
//
//
//            // DUPLICATE ALERT
//            if(!response.ok){
//
//                const msg =
//                await response.text();
//
//                alert(msg);
//                return;
//
//            }
//
//        }
//
//        alert("Attendance saved successfully");
//
//    }
//    catch(err){
//
//        console.error(err);
//        alert("Save failed");
//
//    }
//
//});

async function renderMonthlyReport(){

    const studentId = studentSelect.value;
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearInput.value);

    if(!studentId){
        alert("Select student");
        return;
    }

    try{

        const res = await fetch(`${apiBase}/attendance/student/${studentId}`);
        const data = await res.json();

        // Filter by month + year
        const filtered = data.filter(a => {
            const d = new Date(a.date);
            return (
                d.getMonth() + 1 === month &&
                d.getFullYear() === year
            );
        });

        // Unique working days
        const days = [...new Set(filtered.map(a => a.date))].sort();

        // HEADER
        reportHeader.innerHTML = "";
        const headRow = document.createElement("tr");

        headRow.innerHTML = "<th>Date</th>";

        periods.forEach(period=>{
            const th = document.createElement("th");
            th.innerText = `P${period.periodNo} (${period.startTime} - ${period.endTime})`;
            headRow.appendChild(th);
        });

        reportHeader.appendChild(headRow);

        // BODY
        reportBody.innerHTML = "";

        let present = 0;
        let total = 0;

        days.forEach(day=>{

            const tr = document.createElement("tr");

            const dateTd = document.createElement("td");
            dateTd.innerText = day;
            tr.appendChild(dateTd);

            periods.forEach(period=>{

                const td = document.createElement("td");

                const rec = filtered.find(a =>
                    a.date === day &&
                    a.period.id === period.id
                );

                if(rec){

                    total++;

                    if(rec.status === "Present"){
                        td.innerText = "✔️";
                        present++;
                    }else{
                        td.innerText = "❌";
                    }

                }else{
                    td.innerText = "-";
                }

                tr.appendChild(td);

            });

            reportBody.appendChild(tr);

        });

        // ===== WORKING DAYS =====
        const workingDays = days.length;

        // ===== PERCENTAGE =====
        const percent = total === 0 ? 0 : (present / total) * 100;

        attendancePercentageEl.innerText =
            `Attendance Percentage: ${percent.toFixed(2)}%`;

        // ===== SHOW WORKING DAYS =====
        document.getElementById("workingDays").innerText =
            "Working Days: " + workingDays;

        // ===== LOW ATTENDANCE WARNING =====
        if(percent < 75){
            attendancePercentageEl.style.color = "red";
            attendancePercentageEl.innerText += " (Low Attendance)";
        }else{
            attendancePercentageEl.style.color = "green";
        }

    }
    catch(err){
        console.error(err);
        alert("Report Failed");
    }
}
//// ======================
//// MONTHLY REPORT
//// ======================
//async function renderMonthlyReport(){
//
//    const studentId =
//    studentSelect.value;
//
//    const month =
//    parseInt(monthSelect.value);
//
//    const year =
//    parseInt(yearInput.value);
//
//
//    if(!studentId){
//
//        alert("Select student");
//        return;
//
//    }
//
//
//    try{
//
//        const res =
//        await fetch(
//        `${apiBase}/attendance/student/${studentId}`
//        );
//
//        const data =
//        await res.json();
//
//
//        const filtered =
//        data.filter(a=>{
//
//            const d =
//            new Date(a.date);
//
//            return (
//            d.getMonth()+1===month &&
//            d.getFullYear()===year
//            );
//
//        });
//
//
//        const days =
//        [...new Set(filtered.map(a=>a.date))];
//
//
//        // HEADER
//        reportHeader.innerHTML="";
//
//        const headRow =
//        document.createElement("tr");
//
//        headRow.innerHTML="<th>Date</th>";
//
//
//        periods.forEach(period=>{
//
//            const th =
//            document.createElement("th");
//
//            th.innerText =
//            "P" + period.periodNo + " (" +
//            period.startTime + " - " +
//            period.endTime + ")";
//
//            headRow.appendChild(th);
//
//        });
//
//        reportHeader.appendChild(headRow);
//
//
//        // BODY
//        reportBody.innerHTML="";
//
//        let present=0;
//        let total=0;
//
//
//        days.forEach(day=>{
//
//            const tr =
//            document.createElement("tr");
//
//            const dateTd =
//            document.createElement("td");
//
//            dateTd.innerText=day;
//
//            tr.appendChild(dateTd);
//
//
//            periods.forEach(period=>{
//
//                const td =
//                document.createElement("td");
//
//                const rec =
//                filtered.find(a=>
//                    a.date===day &&
//                    a.period.id===period.id
//                );
//
//
//                if(rec){
//
//                    total++;
//
//                    if(rec.status==="Present"){
//
//                        td.innerText="✔️";
//                        present++;
//
//                    }
//                    else{
//
//                        td.innerText="❌";
//
//                    }
//
//                }
//                else{
//
//                    td.innerText="-";
//
//                }
//
//                tr.appendChild(td);
//
//            });
//
//            reportBody.appendChild(tr);
//
//        });
//
//
//        const percent =
//        total===0 ? 0 :
//        (present/total)*100;
//
//
//        attendancePercentageEl.innerText =
//        "Attendance Percentage: "+
//        percent.toFixed(2)+"%";
//
//    }
//    catch(err){
//
//        console.error(err);
//        alert("Report Failed");
//
//    }
//
//}


// ======================
// BUTTON EVENTS
// ======================
reportBtn.addEventListener(
"click",
renderMonthlyReport
);


// ======================
// INIT
// ======================
fetchData();



async function loadAbsentStudents(){

const date = document.getElementById("absentDate").value;

if(!date){
alert("Select Date");
return;
}

try{

const res = await fetch(`http://localhost:8080/api/attendance/absent-day/${date}`);

const data = await res.json();

const tbody = document.getElementById("absentTableBody");
tbody.innerHTML="";

/* ===== CHECK IF ATTENDANCE EXISTS ===== */

if(data.length === 0){

const tr = document.createElement("tr");

const td = document.createElement("td");

td.colSpan = 2;

td.style.textAlign = "center";

td.innerText = "Attendance is not taken for the chosen date: " + date;

tr.appendChild(td);

tbody.appendChild(tr);

return;

}

/* ===== SHOW ABSENT STUDENTS ===== */

data.forEach(student => {

const tr = document.createElement("tr");

const nameTd = document.createElement("td");
nameTd.innerText = student.name;

tr.appendChild(nameTd);

tbody.appendChild(tr);

});

}catch(err){

console.error(err);

alert("Failed to load absent students");

}

}

function calculateStudentPercentage(studentId, data){

let present = 0;
let total = 0;

data.forEach(a=>{
if(a.student.id === studentId){
total++;

if(a.status === "Present"){
present++;
}
}
});

if(total === 0) return 0;

return (present / total) * 100;
}

document.body.style.opacity = 0;

window.onload = () => {
document.body.style.transition = "opacity 0.8s";
document.body.style.opacity = 1;
};