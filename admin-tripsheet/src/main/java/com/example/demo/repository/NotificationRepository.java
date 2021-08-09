package com.example.demo.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.Notification;

public interface NotificationRepository extends MongoRepository<Notification, Long> {

}
