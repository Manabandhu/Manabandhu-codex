package com.manabandhu.job.dto;

public record JobDto(String id, String title, String company, String location, String category, String description, boolean verified, boolean reported) {}
