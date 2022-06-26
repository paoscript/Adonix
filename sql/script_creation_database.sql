-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema adonix_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema adonix_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `adonix_db` DEFAULT CHARACTER SET utf8 ;
USE `adonix_db` ;

-- -----------------------------------------------------
-- Table `adonix_db`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adonix_db`.`roles` (
  `rol_id` INT NOT NULL AUTO_INCREMENT,
  `rol_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rol_id`),
  UNIQUE INDEX `rol_id_UNIQUE` (`rol_id` ASC) VISIBLE,
  UNIQUE INDEX `rol_name_UNIQUE` (`rol_name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adonix_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adonix_db`.`users` (
  `use_id` INT NOT NULL AUTO_INCREMENT,
  `use_identification_number` VARCHAR(45) NULL,
  `use_name` VARCHAR(45) NULL,
  `use_password` VARCHAR(45) NULL,
  `use_email` VARCHAR(45) NULL,
  `use_rol_id` INT NOT NULL,
  PRIMARY KEY (`use_id`),
  INDEX `fk_users_roles_idx` (`use_rol_id` ASC) VISIBLE,
  UNIQUE INDEX `use_id_UNIQUE` (`use_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_roles`
    FOREIGN KEY (`use_rol_id`)
    REFERENCES `adonix_db`.`roles` (`rol_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adonix_db`.`apprentices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adonix_db`.`apprentices` (
  `app_id` INT NOT NULL AUTO_INCREMENT,
  `app_identification` VARCHAR(45) NOT NULL,
  `app_name` VARCHAR(200) NOT NULL,
  `app_ccms_id` INT NOT NULL,
  `app_sgva` INT NOT NULL,
  `app_group` INT NULL,
  `app_ceco_id` INT NOT NULL,
  `app_job_description` VARCHAR(500) NULL,
  `app_related_position` VARCHAR(500) NULL,
  `app_sustaninig_support` INT NULL,
  `app_birthday` TIMESTAMP NULL,
  `app_address` VARCHAR(200) NULL,
  `app_email` VARCHAR(200) NULL,
  `app_eps` VARCHAR(200) NULL,
  `app_city` VARCHAR(200) NULL,
  `app_institutions` VARCHAR(45) NULL,
  `app_speciality` VARCHAR(200) NULL,
  `app_name_boss` VARCHAR(200) NULL,
  `app_id_ccms_boss` INT NULL,
  `app_category` VARCHAR(200) NULL,
  `app_yielded` VARCHAR(45) NULL,
  `app_state` VARCHAR(45) NULL,
  `app_contract_start_date` TIMESTAMP NOT NULL,
  `app_end_date_study` TIMESTAMP NOT NULL,
  `app_productive_start_date` TIMESTAMP NOT NULL,
  `app_productive_end_date` TIMESTAMP NOT NULL,
  `app_count_days` INT NOT NULL,
  `app_phone_number` VARCHAR(45) NULL,
  `app_company` VARCHAR(45) NULL,
  `app_creator_id` INT NOT NULL,
  PRIMARY KEY (`app_id`),
  UNIQUE INDEX `app_id_UNIQUE` (`app_id` ASC) VISIBLE,
  UNIQUE INDEX `app_identification_UNIQUE` (`app_identification` ASC) VISIBLE,
  INDEX `fk_apprentices_users1_idx` (`app_creator_id` ASC) VISIBLE,
  CONSTRAINT `fk_apprentices_users1`
    FOREIGN KEY (`app_creator_id`)
    REFERENCES `adonix_db`.`users` (`use_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adonix_db`.`modificationst`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adonix_db`.`modificationst` (
  `mod_id` INT NOT NULL AUTO_INCREMENT,
  `mod_date_start` VARCHAR(45) NULL,
  `mod_date_end` VARCHAR(45) NULL,
  `mod_count_day` VARCHAR(45) NULL,
  `mod_type_modification` VARCHAR(45) NULL,
  `mod_apprentice_id` INT NOT NULL,
  `mod_creator_id` INT NOT NULL,
  PRIMARY KEY (`mod_id`),
  UNIQUE INDEX `mod_id_UNIQUE` (`mod_id` ASC) VISIBLE,
  INDEX `fk_modificationst_apprentices1_idx` (`mod_apprentice_id` ASC) VISIBLE,
  INDEX `fk_modificationst_users1_idx` (`mod_creator_id` ASC) VISIBLE,
  CONSTRAINT `fk_modificationst_apprentices1`
    FOREIGN KEY (`mod_apprentice_id`)
    REFERENCES `adonix_db`.`apprentices` (`app_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_modificationst_users1`
    FOREIGN KEY (`mod_creator_id`)
    REFERENCES `adonix_db`.`users` (`use_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
