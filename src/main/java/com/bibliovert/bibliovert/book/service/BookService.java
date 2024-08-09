package com.bibliovert.bibliovert.book.service;

import com.bibliovert.bibliovert.book.domain.Book;
import com.bibliovert.bibliovert.book.model.BookDTO;
import com.bibliovert.bibliovert.book.repos.BookRepository;
import com.bibliovert.bibliovert.order.domain.Order;
import com.bibliovert.bibliovert.order.repos.OrderRepository;
import com.bibliovert.bibliovert.user.domain.User;
import com.bibliovert.bibliovert.user.repos.UserRepository;
import com.bibliovert.bibliovert.util.NotFoundException;
import com.bibliovert.bibliovert.util.ReferencedWarning;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public BookService(final BookRepository bookRepository, final UserRepository userRepository,
            final OrderRepository orderRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    public List<BookDTO> findAll() {
        final List<Book> books = bookRepository.findAll(Sort.by("idBook"));
        return books.stream()
                .map(book -> mapToDTO(book, new BookDTO()))
                .toList();
    }

    public BookDTO get(final Long idBook) {
        return bookRepository.findById(idBook)
                .map(book -> mapToDTO(book, new BookDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final BookDTO bookDTO) {
        final Book book = new Book();
        mapToEntity(bookDTO, book);
        return bookRepository.save(book).getIdBook();
    }

    public void update(final Long idBook, final BookDTO bookDTO) {
        final Book book = bookRepository.findById(idBook)
                .orElseThrow(NotFoundException::new);
        mapToEntity(bookDTO, book);
        bookRepository.save(book);
    }

    public void delete(final Long idBook) {
        bookRepository.deleteById(idBook);
    }

    private BookDTO mapToDTO(final Book book, final BookDTO bookDTO) {
        bookDTO.setIdBook(book.getIdBook());
        bookDTO.setTitle(book.getTitle());
        bookDTO.setIsbn(book.getIsbn());
        bookDTO.setGenre(book.getGenre());
        bookDTO.setAuthor(book.getAuthor());
        bookDTO.setPublicationYear(book.getPublicationYear());
        bookDTO.setCondition(book.getCondition());
        bookDTO.setPrice(book.getPrice());
        bookDTO.setDescription(book.getDescription());
        bookDTO.setCoverImage(book.getCoverImage());
        bookDTO.setQuantity(book.getQuantity());
        bookDTO.setSellerId(book.getSellerId());
        bookDTO.setUser(book.getUser() == null ? null : book.getUser().getUserId());
        return bookDTO;
    }

    private Book mapToEntity(final BookDTO bookDTO, final Book book) {
        book.setTitle(bookDTO.getTitle());
        book.setIsbn(bookDTO.getIsbn());
        book.setGenre(bookDTO.getGenre());
        book.setAuthor(bookDTO.getAuthor());
        book.setPublicationYear(bookDTO.getPublicationYear());
        book.setCondition(bookDTO.getCondition());
        book.setPrice(bookDTO.getPrice());
        book.setDescription(bookDTO.getDescription());
        book.setCoverImage(bookDTO.getCoverImage());
        book.setQuantity(bookDTO.getQuantity());
        book.setSellerId(bookDTO.getSellerId());
        final User user = bookDTO.getUser() == null ? null : userRepository.findById(bookDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        book.setUser(user);
        return book;
    }

    public ReferencedWarning getReferencedWarning(final Long idBook) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Book book = bookRepository.findById(idBook)
                .orElseThrow(NotFoundException::new);
        final Order bookOrder = orderRepository.findFirstByBook(book);
        if (bookOrder != null) {
            referencedWarning.setKey("book.order.book.referenced");
            referencedWarning.addParam(bookOrder.getOrderId());
            return referencedWarning;
        }
        return null;
    }

}
