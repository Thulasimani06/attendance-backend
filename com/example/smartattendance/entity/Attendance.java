//package com.example.smartattendance.entity;
//
//import jakarta.persistence.*;
//import java.time.LocalDate;
//
//@Entity
//public class Attendance {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private Long studentId;
//
//    private LocalDate date;
//
//    private boolean present;
//
//    // getters & setters
//    public Long getId() { return id; }
//    public void setId(Long id) { this.id = id; }
//
//    public Long getStudentId() { return studentId; }
//    public void setStudentId(Long studentId) { this.studentId = studentId; }
//
//    public LocalDate getDate() { return date; }
//    public void setDate(LocalDate date) { this.date = date; }
//
//    public boolean isPresent() { return present; }
//    public void setPresent(boolean present) { this.present = present; }
//}

//package com.example.smartattendance.entity;
//
//import com.example.smartattendance.model.AttendanceStatus;
//import jakarta.persistence.*;
//import java.time.LocalDate;
//
//@Entity
//public class Attendance {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    private Student student;
//
////    @Column(name = "attendance_date")
//    private LocalDate Date;
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private AttendanceStatus status;
//
//    @ManyToOne
////    @JoinColumn(name = "period_id")
//    private Period period;
//
//    private LocalDate date;
//    private boolean present;
//
//    public Attendance() {}
//    public Attendance(Student student, Period period, LocalDate date, boolean present) {
//        this.student = student;
//        this.period = period;
//        this.date = date;
//        this.present = present;
//    }
//
//    // Getters & Setters
//    public Long getId() {
//        return id;
//    }
//
//    public Student getStudent() {
//        return student;
//    }
//
//    public Period getPeriod() {
//        return period;
//    }
//
//    public LocalDate getDate() {
//        return date;
//    }
//
//    public boolean isPresent() {   // IMPORTANT
//        return present;
//    }
//
//    // ===== Setters =====
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public void setStudent(Student student) {
//        this.student = student;
//    }
//
//    public void setPeriod(Period period) {
//        this.period = period;
//    }
//
//    public void setDate(LocalDate date) {
//        this.date = date;
//    }
//
//    public void setPresent(boolean present) {   // ⭐ THIS FIXES YOUR ERROR
//        this.present = present;
//    }
//
//}





package com.example.smartattendance.entity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(
        name = "attendance",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"student_id", "period_id", "date"})
        }
)
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    private Period period;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttendanceStatus status = AttendanceStatus.Absent;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    // ✅ REQUIRED by JPA
    public Attendance() {}

    // ✅ Convenience constructor
    public Attendance(Student student, Period period, LocalDate date) {
        this.student = student;
        this.period = period;
        this.date = date;
        this.status = AttendanceStatus.Absent;
    }

    // getters & setters
    public Long getId() { return id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public Period getPeriod() { return period; }
    public void setPeriod(Period period) { this.period = period; }

    public AttendanceStatus getStatus() { return status; }
    public void setStatus(AttendanceStatus status) { this.status = status; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}
