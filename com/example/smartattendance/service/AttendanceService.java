package com.example.smartattendance.service;

import com.example.smartattendance.entity.*;
import com.example.smartattendance.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepo;
    private final StudentRepository studentRepo;
    private final PeriodRepository periodRepo;

    public AttendanceService(
            AttendanceRepository attendanceRepo,
            StudentRepository studentRepo,
            PeriodRepository periodRepo
    ) {
        this.attendanceRepo = attendanceRepo;
        this.studentRepo = studentRepo;
        this.periodRepo = periodRepo;
    }

    // ================= STUDENT / PERIOD =================

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public List<Period> getAllPeriods() {
        return periodRepo.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Period getPeriodById(Long id) {
        return periodRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Period not found"));
    }

    // ================= ATTENDANCE =================

//    public Attendance markAttendance(Long studentId, Long periodId, LocalDate date, boolean present) {
//
//        Student student = studentRepo.findById(studentId).orElseThrow();
//        Period period = periodRepo.findById(periodId).orElseThrow();
//
//        Attendance attendance = attendanceRepo
//                .findByStudentAndPeriodAndDate(student, period, date)
//                .orElse(new Attendance(student, period, date));
//
//        attendance.setStatus(
//                present ? AttendanceStatus.Present : AttendanceStatus.Absent
//        );
//
//        return attendanceRepo.save(attendance);
//    }

//    crt
//public Attendance markAttendance(Long studentId, Long periodId, AttendanceStatus status) {
//
//    Student student = studentRepo.findById(studentId)
//            .orElseThrow(() -> new RuntimeException("Student not found"));
//
//    Period period = periodRepo.findById(periodId)
//            .orElseThrow(() -> new RuntimeException("Period not found"));
//
//    LocalTime now = LocalTime.now();
//
//    if (now.isBefore(period.getStartTime()) || now.isAfter(period.getEndTime())) {
//        throw new RuntimeException("Attendance can only be marked during period time");
//    }
//
//    LocalDate today = LocalDate.now();
//
//    // Check if already marked
//    if (attendanceRepo.findByStudentAndPeriodAndDate(student, period, today).isPresent()) {
//        throw new RuntimeException("Attendance already marked for this period");
//    }
//
//    Attendance attendance = new Attendance(student, period, today);
//    attendance.setStatus(status);
//
//    return attendanceRepo.save(attendance);
//}
public Attendance markAttendance(
        Long studentId,
        Long periodId,
        LocalDate date,
        String status) {

    Student student = studentRepo.findById(studentId).orElseThrow();

    Period period = periodRepo.findById(periodId).orElseThrow();

    LocalTime now = LocalTime.now();

    // check valid time
    if (now.isBefore(period.getStartTime()) || now.isAfter(period.getEndTime())) {

        throw new RuntimeException(
                "Attendance allowed only during "
                        + period.getStartTime() + " - "
                        + period.getEndTime()
        );
    }

    // check duplicate attendance
    boolean exists = attendanceRepo
            .existsByStudentIdAndPeriodIdAndDate(studentId, periodId, date);

    if (exists) {
        throw new RuntimeException(
                "Attendance already taken for Period "
                        + period.getPeriodNo() + " on " + date
        );
    }

    Attendance attendance = new Attendance();

    attendance.setStudent(student);
    attendance.setPeriod(period);
    attendance.setDate(date);
    attendance.setStatus(AttendanceStatus.valueOf(status));

    return attendanceRepo.save(attendance);
}
//    public Attendance markAttendance(
//            Long studentId,
//            Long periodId,
//            LocalDate date,
//            String status) {
//
//        Student student =
//                studentRepo.findById(studentId)
//                        .orElseThrow();
//
//        Period period =
//                periodRepo.findById(periodId)
//                        .orElseThrow();
//
//        LocalTime now = LocalTime.now();
//
//        // check valid time
//        if (now.isBefore(period.getStartTime())
//                || now.isAfter(period.getEndTime())) {
//
//            throw new RuntimeException(
//                    "Attendance allowed only during "
//                            + period.getStartTime() + " - "
//                            + period.getEndTime()
//            );
//        }
//
//        // check already exists
//        boolean exists =
//                attendanceRepo
//                        .existsByStudentIdAndPeriodIdAndDate(
//                                studentId, periodId, date
//                        );
//
//        if (exists) {
//
//            throw new RuntimeException(
//                    "Attendance already taken for Period "
//                            + period.getPeriodNo()
//                            + " on " + date
//            );
//        }
//
//        Attendance attendance = new Attendance();
//
//        attendance.setStudent(student);
//        attendance.setPeriod(period);
//        attendance.setDate(date);
////        attendance.setStatus(status);
//
//        return attendanceRepo.save(attendance);
//    }


    public List<Attendance> getTodayAttendance() {
        return attendanceRepo.findByDate(LocalDate.now());
    }

    public List<Attendance> getAttendanceByStudent(Student student) {
        return attendanceRepo.findByStudent(student);
    }

    public List<Attendance> getAttendanceByPeriod(Period period) {
        return attendanceRepo.findByPeriod(period);
    }

    // ================= PERIOD LOGIC =================

    public Period getCurrentPeriod() {
        LocalTime now = LocalTime.now();
        return periodRepo.findAll().stream()
                .filter(p ->
                        !now.isBefore(p.getStartTime()) &&
                                now.isBefore(p.getEndTime())
                )
                .findFirst()
                .orElse(null);
    }

    // ✅ ADD THIS METHOD HERE
//    public List<Attendance> getAttendanceByDate(LocalDate date){
//        return attendanceRepo.findByDate(date);
//    }
    public List<Student> getWholeDayAbsentStudents(LocalDate date){
        return attendanceRepo.findWholeDayAbsentStudents(date);
    }
}
