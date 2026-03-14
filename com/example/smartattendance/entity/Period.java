package com.example.smartattendance.entity;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "period")
public class Period {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="period_no")
    private int periodNo;
    private LocalTime startTime;
    private LocalTime endTime;

    public Period() {}
    public Period(int periodNo, LocalTime startTime, LocalTime endTime) {
        this.periodNo = periodNo;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public int getPeriodNo() {
        return periodNo;
    }

    public LocalTime getStartTime() {   // ⭐ REQUIRED
        return startTime;
    }

    public LocalTime getEndTime() {     // ⭐ REQUIRED
        return endTime;
    }

    // ===== Setters =====
    public void setId(Long id) {
        this.id = id;
    }

    public void setPeriodNo(int periodNo) {
        this.periodNo = periodNo;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}
