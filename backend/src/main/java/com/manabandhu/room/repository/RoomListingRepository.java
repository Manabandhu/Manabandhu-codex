package com.manabandhu.room.repository;

import com.manabandhu.room.entity.RoomListing;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomListingRepository extends JpaRepository<RoomListing, String> {
    List<RoomListing> findByTitleContainingIgnoreCaseOrLocationContainingIgnoreCase(String title, String location);
}
