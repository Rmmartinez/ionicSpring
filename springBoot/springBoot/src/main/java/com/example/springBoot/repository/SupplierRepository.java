package com.example.springBoot.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.springBoot.entities.Supplier;

@Repository
public interface SupplierRepository extends CrudRepository<Supplier, Long>{

}
