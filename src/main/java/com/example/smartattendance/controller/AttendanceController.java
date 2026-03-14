//package com.example.smartattendance.controller;
//
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//import com.example.smartattendance.entity.Attendance;
//import com.example.smartattendance.service.AttendanceService;
//
//@CrossOrigin(origins = "*")
//@RestController
//@RequestMapping("/attendance")
//public class AttendanceController {
//
//    private final AttendanceService service;
//
//    public AttendanceController(AttendanceService service) {
//        this.service = service;
//    }
//
//    @PostMapping
//    public Attendance mark(@RequestBody Attendance attendance) {
//        return service.markAttendance(attendance);
//    }
//
//    @GetMapping
//    public List<Attendance> view() {
//        return service.getAllAttendance();
//    }
//}

package com.example.smartattendance.controller;
import com.example.smartattendance.entity.AttendanceStatus;
import com.example.smartattendance.repository.AttendanceRepository;
import com.example.smartattendance.dto.DailySummaryDTO;
import com.example.smartattendance.entity.Attendance;
import com.example.smartattendance.entity.Period;
import com.example.smartattendance.entity.Student;
import com.example.smartattendance.repository.PeriodRepository;
import com.example.smartattendance.repository.StudentRepository;
import com.example.smartattendance.service.AttendanceService;
import org.slf4j.spi.LocationAwareLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class AttendanceController {
    @Autowired
    private final AttendanceService service;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private final AttendanceRepository attendanceRepo;
    @Autowired
    private final PeriodRepository periodRepo;

    public AttendanceController(AttendanceService service,AttendanceRepository attendanceRepo,PeriodRepository periodRepo) {
        this.service = service;
        this.attendanceRepo = attendanceRepo;
        this.periodRepo =periodRepo;
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/periods")
    public List<Period> getAllPeriods() {
        return service.getAllPeriods();
    }

    @GetMapping("/attendance/today")
    public List<Attendance> getTodayAttendance() {
        return service.getTodayAttendance();
    }

//    @PostMapping("/attendance/mark")
//    public Attendance markAttendance(@RequestParam Long studentId, @RequestParam Long periodId, @RequestParam boolean present) {
//        return service.markAttendance(studentId, periodId, present);
//    }

//    @GetMapping("/attendance/current-period")
//    public Period getCurrentPeriod() {
//        return service.getCurrentPeriod();
//    }

    @GetMapping("/attendance/student/{id}")
    public List<Attendance> getStudentAttendance(@PathVariable Long id) {
        Student student = service.getStudentById(id);
        return service.getAttendanceByStudent(student);
    }
    @GetMapping("/attendance/period/{id}")
    public List<Attendance> getPeriodAttendance(@PathVariable Long id) {
        Period period = service.getPeriodById(id);
        return service.getAttendanceByPeriod(period);
    }
//    @GetMapping("/attendance/summary")
//    public List<DailySummaryDTO> getDailySummary(
//            @RequestParam LocalDate date) {
//        return attendanceRepo.getDailySummary(date);
//    }
@GetMapping("/attendance/summary")
public List<DailySummaryDTO> getDailySummary(
        @RequestParam
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate date) {
    return attendanceRepo.getDailySummary(date);
}

    @PostMapping("/attendance/mark")
    public Attendance markAttendance(
            @RequestBody AttendanceRequest request) {

        return service.markAttendance(
                request.getStudentId(),
                request.getPeriodId(),
                request.getDate(),
                request.getStatus()
        );
    }

//    @PostMapping("/attendance/mark")
//    public Attendance markAttendance(
//            @RequestParam Long studentId,
//            @RequestParam Long periodId,
//            @RequestParam LocalDate date,
//            @RequestParam String status
//
//    ) {
//        return service.markAttendance(studentId, periodId, date, status);
//    }

//    @GetMapping("/period/current")
//    public Period getCurrentPeriod() {
//
//        LocalTime now = LocalTime.now();
//
//        List<Period> periods = periodRepo.findAll();
//
//        for (Period period : periods) {
//
//            if (!now.isBefore(period.getStartTime()) &&
//                    !now.isAfter(period.getEndTime())) {
//
//                return period;
//            }
//        }
//
//        return null;
//    }

    @GetMapping("/period/current")
    public ResponseEntity<Period> getCurrentPeriod() {

        LocalTime now = LocalTime.now();

        List<Period> periods = periodRepo.findAll();

        for (Period period : periods) {

            if (!now.isBefore(period.getStartTime()) &&
                    !now.isAfter(period.getEndTime())) {

                return ResponseEntity.ok(period);
            }
        }

        return ResponseEntity.notFound().build();
    }

//    @PostMapping("/mark")
//    public String markAttendance(@RequestBody AttendanceRequest request) {
//
//        Student student =
//                studentRepository.findById(request.getStudentId())
//                        .orElseThrow();
//
//        Period period =
//                periodRepo.findById(request.getPeriodId())
//                        .orElseThrow();
//
//        LocalDate date =
//                LocalDate.parse(request.getDate());
//
//        // prevent duplicate attendance
//        boolean exists =
//                attendanceRepo
//                        .findByStudentAndPeriodAndDate(
//                                student, period, date);
//
//        if(exists){
//            return "Attendance already taken for this period";
//        }
//
//        Attendance attendance = new Attendance();
//
//        attendance.setStudent(student);
//        attendance.setPeriod(period);
//        attendance.setDate(date);
//        attendance.setStatus(request.getStatus());
//
//        attendanceRepo.save(attendance);
//
//        return "Saved";


//    @GetMapping("/attendance/date/{date}")
//    public List<Attendance> getAbsentStudentsByDate(
//            @PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") LocalDate date) {
//
//        List<Attendance> list = attendanceRepo.findByDate(date);
//
//        return list.stream()
//                .filter(a -> a.getStatus() == AttendanceStatus.Absent)
//                .collect(Collectors.toList());
//    }

    @GetMapping("/attendance/absent-day/{date}")
    public List<Student> getWholeDayAbsentStudents(
            @PathVariable
            @DateTimeFormat(pattern="yyyy-MM-dd")
            LocalDate date){

        return service.getWholeDayAbsentStudents(date);
    }
    }

