package com.manabandhu.ride.repository;

import com.manabandhu.ride.entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RideRepository extends JpaRepository<Ride, String> {}
