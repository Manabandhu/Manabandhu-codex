package com.manabandhu.user.entity;

import com.manabandhu.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_profile")
public class UserProfile extends BaseEntity {

    @Column(name = "user_account_id")
    private String userAccountId;

    @Column(nullable = false, unique = true)
    private String email;
    private String name;
    private boolean verified;
    @Column(name = "avatar_url")
    private String avatarUrl;
    private String country;
    private String city;
    private String purposes;
    private String bio;
    private java.time.LocalDate dateOfBirth;
    private String gender;
    private boolean onboardingCompleted = false;

    public String getUserAccountId() {
        return userAccountId;
    }

    public void setUserAccountId(String userAccountId) {
        this.userAccountId = userAccountId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPurposes() {
        return purposes;
    }

    public void setPurposes(String purposes) {
        this.purposes = purposes;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public java.time.LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(java.time.LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean isOnboardingCompleted() {
        return onboardingCompleted;
    }

    public void setOnboardingCompleted(boolean onboardingCompleted) {
        this.onboardingCompleted = onboardingCompleted;
    }
}
