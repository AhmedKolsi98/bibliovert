package com.bibliovert.bibliovert.book.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BookDTO {

    private Long idBook;

    @NotNull
    @Size(max = 255)
    private String title;

    @NotNull
    @Size(max = 255)
    private String isbn;

    private List<@Size(max = 255) String> genre;

    @NotNull
    @Size(max = 255)
    private String author;

    @Size(max = 255)
    private String publicationYear;

    @Size(max = 255)
    private String condition;

    private Double price;

    @Size(max = 255)
    private String description;

    @Size(max = 255)
    private String coverImage;

    private Integer quantity;

    private Integer sellerId;

    private Long user;

}
