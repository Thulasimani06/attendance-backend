package com.example.smartattendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.smartattendance.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
