package com.example.angularjstest.rest;

import com.example.angularjstest.dto.UserDto;
import com.example.angularjstest.model.User;
import com.example.angularjstest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = "/api/v1/users/")
public class UserRestControllerV1 {
    private final UserService userService;

    @Autowired
    public UserRestControllerV1(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable(name = "id") Long id){
        User user = userService.findById(id);
        if(user == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        UserDto result = UserDto.fromUser(user);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void addUser(@RequestBody UserDto userDto){
        userService.register(userDto.toUser());
    }


    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public User saveUser(@RequestBody UserDto userDto){
        return userService.save(userDto.toUser());
    }


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<UserDto> getAllUsers(){
        return userService.getAll().stream().map(e -> UserDto.fromUser(e)).collect(Collectors.toList());
    }


    @DeleteMapping(value = "{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public void deleteUser(@PathVariable(value = "id") Long id){
        userService.delete(id);
    }

}
