-- MySQL Workbench Forward Engineering

SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;
SET NAMES utf8;
SET @OLD_TIME_ZONE=@@TIME_ZONE ;
SET TIME_ZONE='+00:00';
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0;

-----------------------------------------------------
-- Schema web_academy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema web_academy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `web_academy` DEFAULT CHARACTER SET utf8 ;
USE `web_academy` ;

-- -----------------------------------------------------
-- Table `web_academy`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_academy`.`users` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `avatar_UNIQUE` (`avatar` ASC));
  


-- -----------------------------------------------------
-- Table `web_academy`.`shopping_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_academy`.`shopping_cart` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `status` TINYINT NOT NULL DEFAULT 1,
  `total` MEDIUMINT UNSIGNED NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `web_academy`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `web_academy`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_academy`.`categories` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `icon` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC));


-- -----------------------------------------------------
-- Table `web_academy`.`professors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_academy`.`professors` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `profession` VARCHAR(100) NOT NULL,
 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `web_academy`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_academy`.`courses` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `price` MEDIUMINT UNSIGNED NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT '/img/cursos/curso.jpg' ,
  `vacancies` TINYINT UNSIGNED NOT NULL,
  `outstanding` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `description_short` TEXT NOT NULL,
  `description_full` TEXT NOT NULL,
  `category_id` INT NOT NULL,
  `program_id` INT NOT NULL,
  `professor_id` INT  NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  INDEX `program_id_idx` (`program_id` ASC),
  INDEX `category_id_idx` (`category_id` ASC),
  INDEX `professor_id_idx` (`professor_id` ASC),
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `web_academy`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `program_id`
    FOREIGN KEY (`program_id`)
    REFERENCES `web_academy`.`program` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `professor_id`
    FOREIGN KEY (`professor_id`)
    REFERENCES `web_academy`.`professors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `web_academy`.`cart_courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_academy`.`cart_courses` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `course_id` INT NOT NULL,
  `shopping_cart_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `course_id_idx` (`course_id` ASC),
  INDEX `shopping_cart_idx` (`shopping_cart_id` ASC),
  CONSTRAINT `course_id`
    FOREIGN KEY (`course_id`)
    REFERENCES `web_academy`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `shopping_cart`
    FOREIGN KEY (`shopping_cart_id`)
    REFERENCES `web_academy`.`shopping_cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `web_academy`.`tips`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_academy`.`tips` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `icon` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC));


-- -----------------------------------------------------
-- Table `web_academy`.`user_course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `web_academy`.`user_course` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `courses_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `users_id_idx` (`users_id` ASC),
  INDEX `courses_id_idx` (`courses_id` ASC),
  CONSTRAINT `users_id`
    FOREIGN KEY (`users_id`)
    REFERENCES `web_academy`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `courses_id`
    FOREIGN KEY (`courses_id`)
    REFERENCES `web_academy`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Table `web_academy`.`schedule`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `web_academy`.`program` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `starts_at` DATE NOT NULL,
  `ends_at` DATE NOT NULL,
  `days` VARCHAR(100) NOT NULL,
  `since` TIME NOT NULL,
  `up_to` TIME NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`));



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;