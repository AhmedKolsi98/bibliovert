package com.bibliovert.bibliovert.user.service;

import com.bibliovert.bibliovert.book.domain.Book;
import com.bibliovert.bibliovert.book.repos.BookRepository;
import com.bibliovert.bibliovert.user.domain.User;
import com.bibliovert.bibliovert.user.model.UserDTO;
import com.bibliovert.bibliovert.user.repos.UserRepository;
import com.bibliovert.bibliovert.util.NotFoundException;
import com.bibliovert.bibliovert.util.ReferencedWarning;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public UserService(final UserRepository userRepository, final BookRepository bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public List<UserDTO> findAll() {
        final List<User> users = userRepository.findAll(Sort.by("userId"));
        return users.stream()
                .map(user -> mapToDTO(user, new UserDTO()))
                .toList();
    }

    public UserDTO get(final Long userId) {
        return userRepository.findById(userId)
                .map(user -> mapToDTO(user, new UserDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final UserDTO userDTO) {
        final User user = new User();
        mapToEntity(userDTO, user);
        return userRepository.save(user).getUserId();
    }

    public void update(final Long userId, final UserDTO userDTO) {
        final User user = userRepository.findById(userId)
                .orElseThrow(NotFoundException::new);
        mapToEntity(userDTO, user);
        userRepository.save(user);
    }

    public void delete(final Long userId) {
        userRepository.deleteById(userId);
    }

    private UserDTO mapToDTO(final User user, final UserDTO userDTO) {
        userDTO.setUserId(user.getUserId());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setAddress(user.getAddress());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setOrderHistory(user.getOrderHistory());
        return userDTO;
    }

    private User mapToEntity(final UserDTO userDTO, final User user) {
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setAddress(userDTO.getAddress());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setOrderHistory(userDTO.getOrderHistory());
        return user;
    }

    public ReferencedWarning getReferencedWarning(final Long userId) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final User user = userRepository.findById(userId)
                .orElseThrow(NotFoundException::new);
        final Book userBook = bookRepository.findFirstByUser(user);
        if (userBook != null) {
            referencedWarning.setKey("user.book.user.referenced");
            referencedWarning.addParam(userBook.getIdBook());
            return referencedWarning;
        }
        return null;
    }

}
