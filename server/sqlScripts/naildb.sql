CREATE SCHEMA IF NOT EXISTS `naildb` DEFAULT CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS `naildb`.`services` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `service_name` VARCHAR(255) NOT NULL,
  `cost` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `naildb`.`specialists` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `spec_name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NULL,
  `telephone` VARCHAR(45) NULL,
  `photo` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `naildb`.`service_has_specialist` (
  `service_id` INT NOT NULL,
  `specialist_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`service_id`, `specialist_id`),
  INDEX `fk_service_has_specialist_specialist1_idx` (`specialist_id` ASC),
  INDEX `fk_service_has_specialist_service_idx` (`service_id` ASC),
  CONSTRAINT `fk_service_has_specialist_service`
    FOREIGN KEY (`service_id`)
    REFERENCES `naildb`.`services` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_service_has_specialist_specialist1`
    FOREIGN KEY (`specialist_id`)
    REFERENCES `naildb`.`specialists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `naildb`.`orders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `reservation_time` DATETIME NOT NULL,
  `client_name` VARCHAR(255) NOT NULL,
  `client_tel` VARCHAR(45) NOT NULL,
  `services_id` INT NOT NULL,
  `specialists_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_services1_idx` (`services_id` ASC),
  INDEX `fk_orders_specialists1_idx` (`specialists_id` ASC),
  CONSTRAINT `fk_orders_services1`
    FOREIGN KEY (`services_id`)
    REFERENCES `naildb`.`services` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_specialists1`
    FOREIGN KEY (`specialists_id`)
    REFERENCES `naildb`.`specialists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `naildb`.`services` (`service_name`, `cost`) VALUES ('наращивание ногтей', '100');
INSERT INTO `naildb`.`services` (`service_name`, `cost`) VALUES ('стрижка', '50');

