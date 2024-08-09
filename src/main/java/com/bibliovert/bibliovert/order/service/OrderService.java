package com.bibliovert.bibliovert.order.service;

import com.bibliovert.bibliovert.book.domain.Book;
import com.bibliovert.bibliovert.book.repos.BookRepository;
import com.bibliovert.bibliovert.order.domain.Order;
import com.bibliovert.bibliovert.order.model.OrderDTO;
import com.bibliovert.bibliovert.order.repos.OrderRepository;
import com.bibliovert.bibliovert.util.NotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final BookRepository bookRepository;

    public OrderService(final OrderRepository orderRepository,
            final BookRepository bookRepository) {
        this.orderRepository = orderRepository;
        this.bookRepository = bookRepository;
    }

    public List<OrderDTO> findAll() {
        final List<Order> orders = orderRepository.findAll(Sort.by("orderId"));
        return orders.stream()
                .map(order -> mapToDTO(order, new OrderDTO()))
                .toList();
    }

    public OrderDTO get(final Long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> mapToDTO(order, new OrderDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final OrderDTO orderDTO) {
        final Order order = new Order();
        mapToEntity(orderDTO, order);
        return orderRepository.save(order).getOrderId();
    }

    public void update(final Long orderId, final OrderDTO orderDTO) {
        final Order order = orderRepository.findById(orderId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderDTO, order);
        orderRepository.save(order);
    }

    public void delete(final Long orderId) {
        orderRepository.deleteById(orderId);
    }

    private OrderDTO mapToDTO(final Order order, final OrderDTO orderDTO) {
        orderDTO.setOrderId(order.getOrderId());
        orderDTO.setUserId(order.getUserId());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setBook(order.getBook() == null ? null : order.getBook().getIdBook());
        return orderDTO;
    }

    private Order mapToEntity(final OrderDTO orderDTO, final Order order) {
        order.setUserId(orderDTO.getUserId());
        order.setOrderDate(orderDTO.getOrderDate());
        final Book book = orderDTO.getBook() == null ? null : bookRepository.findById(orderDTO.getBook())
                .orElseThrow(() -> new NotFoundException("book not found"));
        order.setBook(book);
        return order;
    }

}
