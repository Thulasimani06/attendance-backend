//package com.example.smartattendance.entity;
//
//import jakarta.persistence.*;
//
//@Entity
//public class Student {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name;
//
//    private String department;
//
//    // getters & setters
//    public Long getId() { return id; }
//    public void setId(Long id) { this.id = id; }
//
//    public String getName() { return name; }
//    public void setName(String name) { this.name = name; }
//
//    public String getDepartment() { return department; }
//    public void setDepartment(String department) { this.department = department; }
//}

package com.example.smartattendance.entity;

import jakarta.persistence.*;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String reg_no;
    @Column(name = "photo_path")
    private String photoPath;

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

//    @Lob
//    private byte[] photo;

//    @Column(name = "photo_path")
//    private String photoPath;


    // Constructors
    public Student() {}
    public Student(String name, String reg_no) {
        this.name = name;
        this.reg_no = reg_no;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getReg_no() { return reg_no; }
    public void setReg_no(String reg_no) { this.reg_no = reg_no; }
//    public String getPhotoPath() {
//        return photoPath;
//    }
//
//    public void setPhotoPath(String photoPath) {
//        this.photoPath = photoPath;
//    }
}
