package com.example.smartattendance.dto;

import com.example.smartattendance.entity.AttendanceStatus;

import java.time.LocalDate;

public record AttendanceDTO(
        LocalDate date,
        int periodNo,
        AttendanceStatus status
) {}
