package com.bibliovert.bibliovert.order.rest;

import com.bibliovert.bibliovert.book.domain.Book;
import com.bibliovert.bibliovert.book.repos.BookRepository;
import com.bibliovert.bibliovert.order.model.OrderDTO;
import com.bibliovert.bibliovert.order.service.OrderService;
import com.bibliovert.bibliovert.util.CustomCollectors;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/orders", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderResource {

    private final OrderService orderService;
    private final BookRepository bookRepository;

    public OrderResource(final OrderService orderService, final BookRepository bookRepository) {
        this.orderService = orderService;
        this.bookRepository = bookRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.findAll());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable(name = "orderId") final Long orderId) {
        return ResponseEntity.ok(orderService.get(orderId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createOrder(@RequestBody @Valid final OrderDTO orderDTO) {
        final Long createdOrderId = orderService.create(orderDTO);
        return new ResponseEntity<>(createdOrderId, HttpStatus.CREATED);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Long> updateOrder(@PathVariable(name = "orderId") final Long orderId,
            @RequestBody @Valid final OrderDTO orderDTO) {
        orderService.update(orderId, orderDTO);
        return ResponseEntity.ok(orderId);
    }

    @DeleteMapping("/{orderId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteOrder(@PathVariable(name = "orderId") final Long orderId) {
        orderService.delete(orderId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bookValues")
    public ResponseEntity<Map<Long, String>> getBookValues() {
        return ResponseEntity.ok(bookRepository.findAll(Sort.by("idBook"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Book::getIdBook, Book::getTitle)));
    }

}
