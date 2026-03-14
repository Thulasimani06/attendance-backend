package com.example.smartattendance.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.smartattendance.entity.Student;
import com.example.smartattendance.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return service.saveStudent(student);
    }

    @GetMapping
    public List<Student> getStudents() {
        return service.getAllStudents();
    }
//    @GetMapping("/students/{id}/photo")
//    public ResponseEntity<byte[]> getPhoto(@PathVariable Long id) {
//
//        Student student = studentRepository.findById(id).orElseThrow();
//
//        return ResponseEntity
//                .ok()
//                .contentType(MediaType.IMAGE_JPEG)
//                .body(student.getPhoto());
//    }



}
