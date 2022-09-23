package com.springbootapp.springbootbackend.controller;

import com.springbootapp.springbootbackend.exception.ResourceNotFoundException;
import com.springbootapp.springbootbackend.model.Employee;
import com.springbootapp.springbootbackend.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee= employeeRepository.findById(id).orElseThrow(()->new
                ResourceNotFoundException("Employee doesn't exists with given id: " +id));
        return ResponseEntity.ok(employee);
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,@RequestBody Employee newEmployee){
        Employee employee= employeeRepository.findById(id).orElseThrow(()->new
                ResourceNotFoundException("Employee doesn't exists with given id: " +id));
        employee.setFirstName(newEmployee.getFirstName());
        employee.setLastName(newEmployee.getLastName());
        employee.setEmail(newEmployee.getEmail());

        Employee updatedEmployee= employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
        Employee employee= employeeRepository.findById(id).orElseThrow(()->new
                ResourceNotFoundException("Employee doesn't exists with given id: " +id));
        employeeRepository.delete(employee);
        Map<String,Boolean> response= new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
