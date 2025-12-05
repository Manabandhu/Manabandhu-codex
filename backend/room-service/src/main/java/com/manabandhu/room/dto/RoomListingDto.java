package com.manabandhu.room.dto;

import java.util.List;

public record RoomListingDto(String id, String title, String location, Double price, List<String> amenities, String description) {}
