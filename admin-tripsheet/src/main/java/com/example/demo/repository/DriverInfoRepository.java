package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.DriverInfo;
@Repository
public interface DriverInfoRepository extends MongoRepository<DriverInfo, Long> {

    DriverInfo findByDriverNumber(Long long1);

    DriverInfo findByDriverId(Long long1);

}
