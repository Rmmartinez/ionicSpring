package com.example.springBoot.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.springBoot.entities.Customer;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long>{

}
