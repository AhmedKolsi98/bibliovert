package com.bibliovert.bibliovert.book.rest;

import com.bibliovert.bibliovert.book.model.BookDTO;
import com.bibliovert.bibliovert.book.service.BookService;
import com.bibliovert.bibliovert.user.domain.User;
import com.bibliovert.bibliovert.user.repos.UserRepository;
import com.bibliovert.bibliovert.util.CustomCollectors;
import com.bibliovert.bibliovert.util.ReferencedException;
import com.bibliovert.bibliovert.util.ReferencedWarning;
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
@RequestMapping(value = "/api/books", produces = MediaType.APPLICATION_JSON_VALUE)
public class BookResource {

    private final BookService bookService;
    private final UserRepository userRepository;

    public BookResource(final BookService bookService, final UserRepository userRepository) {
        this.bookService = bookService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        return ResponseEntity.ok(bookService.findAll());
    }

    @GetMapping("/{idBook}")
    public ResponseEntity<BookDTO> getBook(@PathVariable(name = "idBook") final Long idBook) {
        return ResponseEntity.ok(bookService.get(idBook));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createBook(@RequestBody @Valid final BookDTO bookDTO) {
        final Long createdIdBook = bookService.create(bookDTO);
        return new ResponseEntity<>(createdIdBook, HttpStatus.CREATED);
    }

    @PutMapping("/{idBook}")
    public ResponseEntity<Long> updateBook(@PathVariable(name = "idBook") final Long idBook,
            @RequestBody @Valid final BookDTO bookDTO) {
        bookService.update(idBook, bookDTO);
        return ResponseEntity.ok(idBook);
    }

    @DeleteMapping("/{idBook}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteBook(@PathVariable(name = "idBook") final Long idBook) {
        final ReferencedWarning referencedWarning = bookService.getReferencedWarning(idBook);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        bookService.delete(idBook);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/userValues")
    public ResponseEntity<Map<Long, Long>> getUserValues() {
        return ResponseEntity.ok(userRepository.findAll(Sort.by("userId"))
                .stream()
                .collect(CustomCollectors.toSortedMap(User::getUserId, User::getUserId)));
    }

}
