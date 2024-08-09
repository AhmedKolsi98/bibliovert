package com.bibliovert.bibliovert.order.model;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class OrderDTO {

    private Long orderId;
    private Long userId;
    private LocalDateTime orderDate;
    private Long book;

}
