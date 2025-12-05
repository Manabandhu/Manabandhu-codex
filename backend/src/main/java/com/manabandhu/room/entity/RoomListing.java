package com.manabandhu.room.entity;

import com.manabandhu.common.base.BaseEntity;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "room_listing")
public class RoomListing extends BaseEntity {
    private String title;
    private String location;
    private BigDecimal price;
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "room_listing_amenities", joinColumns = @JoinColumn(name = "room_listing_id"))
    @Column(name = "amenity")
    private List<String> amenities;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }
}
