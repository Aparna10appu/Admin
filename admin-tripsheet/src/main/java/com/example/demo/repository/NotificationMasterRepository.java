package com.example.demo.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.NotificationMaster;

public interface NotificationMasterRepository extends MongoRepository<NotificationMaster, Long> {

}
