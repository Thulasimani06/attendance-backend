package com.example.smartattendance.dto;

public class DailySummaryDTO {

    private String name;
    private boolean present;

    public DailySummaryDTO(String name, boolean present) {
        this.name = name;
        this.present = present;
    }

    public String getName() {
        return name;
    }

    public boolean isPresent() {
        return present;
    }
}
