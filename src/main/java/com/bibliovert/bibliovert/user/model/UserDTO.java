package com.bibliovert.bibliovert.user.model;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDTO {

    private Long userId;

    @Size(max = 255)
    private String firstName;

    @Size(max = 255)
    private String lastName;

    @Size(max = 255)
    private String email;

    @Size(max = 255)
    private String password;

    @Size(max = 255)
    private String address;

    @Size(max = 255)
    private String phoneNumber;

    @Size(max = 255)
    private String orderHistory;

}
