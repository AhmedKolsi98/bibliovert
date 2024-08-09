package com.bibliovert.bibliovert.book.repos;

import com.bibliovert.bibliovert.book.domain.Book;
import com.bibliovert.bibliovert.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BookRepository extends JpaRepository<Book, Long> {

    Book findFirstByUser(User user);

}
