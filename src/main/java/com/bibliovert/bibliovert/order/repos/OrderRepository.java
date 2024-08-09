package com.bibliovert.bibliovert.order.repos;

import com.bibliovert.bibliovert.book.domain.Book;
import com.bibliovert.bibliovert.order.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderRepository extends JpaRepository<Order, Long> {

    Order findFirstByBook(Book book);

}
