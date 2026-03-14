//// URL of backend
//const baseURL = 'http://localhost:8080';
//
//// Handle form submission
//document.getElementById('attendanceForm').addEventListener('submit', async (e) => {
//    e.preventDefault();
//    const studentId = document.getElementById('studentId').value;
//    const present = document.getElementById('present').checked;
//
//    // POST request to backend
//    await fetch(`${baseURL}/attendance`, {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ studentId: studentId, present: present, date: new Date() })
//    });
//
//    alert('Attendance marked!');
//    loadAttendance();  // Refresh list
//});
//
//// Load all attendance
//async function loadAttendance() {
//    const res = await fetch(`${baseURL}/attendance`);
//    const data = await res.json();
//
//    const list = document.getElementById('attendanceList');
//    list.innerHTML = '';
//    data.forEach(att => {
//        const li = document.createElement('li');
//        li.textContent = `Student ID: ${att.studentId}, Present: ${att.present}, Date: ${new Date(att.date).toLocaleDateString()}`;
//        list.appendChild(li);
//    });
//}
//
//// Initial load
//loadAttendance();
