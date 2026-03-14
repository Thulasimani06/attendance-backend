package com.example.smartattendance.repository;

import com.example.smartattendance.dto.DailySummaryDTO;
import com.example.smartattendance.entity.Attendance;
import com.example.smartattendance.entity.Student;
import com.example.smartattendance.entity.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

//
//public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
//    @Query("""
//        SELECT new com.smartattendance.dto.DailySummaryDTO(
//            s.name,
//            CASE WHEN COUNT(a) > 0 THEN true ELSE false END
//        )
//        FROM Student s
//        LEFT JOIN Attendance a
//            ON s.id = a.student.id
//           AND a.attendanceDate = :date
//           AND a.status = 'Present'
//        GROUP BY s.id, s.name
//    """)
//    List<DailySummaryDTO> getDailySummary(@Param("date") LocalDate date);
//    Optional<Attendance> findByStudentAndPeriodAndDate(Student student, Period period, LocalDate date);
//    List<Attendance> findByDate(LocalDate date);
//}

//public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
//
//    Optional<Attendance> findByStudentAndPeriodAndDate(
//            Student student,
//            Period period,
//            LocalDate date
//    );
//
//    List<Attendance> findByDate(LocalDate date);
//}


//package com.example.smartattendance.repository;

import com.example.smartattendance.dto.DailySummaryDTO;
import com.example.smartattendance.entity.Attendance;
import com.example.smartattendance.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    @Query("""
        SELECT new com.example.smartattendance.dto.DailySummaryDTO(
            s.name,
            CASE WHEN COUNT(a) > 0 THEN true ELSE false END
        )
        FROM Student s
        LEFT JOIN Attendance a
               ON s.id = a.student.id
              AND a.date = :date
              AND a.status = 'Present'
        GROUP BY s.id, s.name
    """)
    List<DailySummaryDTO> getDailySummary(@Param("date") LocalDate date);

    Optional<Attendance> findByStudentAndPeriodAndDate(
            Student student,
            com.example.smartattendance.entity.Period period,
            LocalDate date
    );

    List<Attendance> findByDate(LocalDate date);
    List<Attendance> findByPeriod(Period period);
    List<Attendance> findByStudent(Student student);
    boolean existsByStudentIdAndPeriodIdAndDate(
            Long studentId,
            Long periodId,
            LocalDate date
    );

    @Query("""
SELECT a.student
FROM Attendance a
WHERE a.date = :date
GROUP BY a.student
HAVING SUM(CASE WHEN a.status = 'Absent' THEN 1 ELSE 0 END) = COUNT(a)
""")
    List<Student> findWholeDayAbsentStudents(@Param("date") LocalDate date);

}
