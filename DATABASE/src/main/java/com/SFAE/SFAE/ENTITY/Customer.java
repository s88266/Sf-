package com.SFAE.SFAE.ENTITY;


import org.hibernate.annotations.GenericGenerator;

import com.SFAE.SFAE.ENUM.Role;
import com.SFAE.SFAE.ENUM.StatusOrder;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Customer Entity
 * 
 * @author erayzor
 */

@Data
@Entity
@Table(name="CUSTOMER")
public class Customer {

    @Id
    @GeneratedValue(generator = "custom-generator")
    @GenericGenerator(name = "custom-generator", strategy = "com.SFAE.SFAE.ENTITY.CustomIdGenerator")
    @Column(name = "ID", updatable = false, nullable = false)
    private String id;

    @Size(max=100)
    @Column(name = "NAME")
    private String name;

    @Size(min = 6, max = 100)
    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "EMAIL",unique = true)
    @Email
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "ROLE")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "contract_status")
    private StatusOrder statusOrder;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "profile_picture_blob", nullable = true)
    private Long profilePictureOid;

    @Column(name = "CONFIRM")
    private Boolean confirm =false;

    public Customer(){}
    
    public Customer( String name, String password, String email,Long profilePictureOid,Boolean confirm,StatusOrder statusOrder) { 
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = Role.CUSTOMER;
        this.profilePictureOid = profilePictureOid;
        this.confirm= confirm;
        this.statusOrder=statusOrder;
    }

    
    public Customer( String id, String name, String password, String email) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
    }

    
    public Customer( String id, String name, String password, String email, String role,Boolean confirm,StatusOrder statusOrder) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = Role.valueOf(role);
        this.confirm= confirm;
        this.statusOrder=statusOrder;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole(){
        return role;
    }

    public boolean isConfirm() {
        return confirm;
    }

    public void setConfirm(boolean confirm) {
        this.confirm = confirm;
    }

    @Override
    public String toString() {
    return "Customer{" +
           "id=" + id +
           ", name='" + name + '\'' +
           ", password='" + password + '\'' +
           ", email='" + email + '\'' +
           ", role=" + role +
           '}';
    }
}