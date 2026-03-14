package com.example.smartattendance.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.example.smartattendance.entity.Student;
import com.example.smartattendance.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public Student saveStudent(Student student) {
        return repo.save(student);
    }

    public List<Student> getAllStudents() {
        return repo.findAll();
    }

}
