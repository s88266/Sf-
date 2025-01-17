package com.SFAE.SFAE.INTERFACE;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.SFAE.SFAE.ENTITY.NewsLetter;

/**
 * Repository interface for managing NewsLetter entities.
 * Provides methods for retrieving newsletters with non-empty customer emails.
 */
@Repository
public interface NewsLetterRepository extends JpaRepository<NewsLetter, String> {

    /**
     * Finds all newsletters with non-empty customer emails.
     * 
     * @return A list of NewsLetter entities where the customer email is not null and not empty.
     */
    @Query("SELECT n FROM NewsLetter n WHERE n.customerEmail IS NOT NULL AND n.customerEmail <> ''")
    List<NewsLetter> findAllNonEmptyCustomerEmail();
}