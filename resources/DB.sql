DROP DATABASE IF EXISTS `project_quick_hospitalization`;

CREATE DATABASE `project_quick_hospitalization`;


CREATE TABLE `hospital` (
	`registration_no` CHAR(10) NOT NULL,
	`hospital_name` VARCHAR(100) NOT NULL UNIQUE,
	`description` TEXT DEFAULT NULL,
	`hospital_type` ENUM('Public','Private') NOT NULL,
	`bed_type` SET('Ward','Special Ward','Cabin','ICU','CCU','COVIDU') NOT NULL,
	`image_source` VARCHAR(500),
	`website` TINYTEXT DEFAULT NULL,
	`joined_on` DATETIME NOT NULL DEFAULT NOW(),
	`status` ENUM('public','private','deleted') NOT NULL DEFAULT 'private',
	PRIMARY KEY (`registration_no`)
);

CREATE TABLE `user` (
	`mobile_no` CHAR(10) NOT NULL,
	`password` VARCHAR(50) NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`sex` ENUM('M','F','T','S') NOT NULL,
	`dob` DATE NOT NULL,
	`email` VARCHAR(50) UNIQUE DEFAULT NULL,
	`document_id` CHAR(17) UNIQUE DEFAULT NULL,
	`joined_on` DATETIME NOT NULL DEFAULT NOW(),
	PRIMARY KEY (`mobile_no`)
);

CREATE TABLE `booking` (
	`id` CHAR(10) NOT NULL,
	`booked_at` DATETIME NOT NULL DEFAULT NOW(),
	`user_mobile_no` CHAR(10) NOT NULL,
	`name` VARCHAR(50),
	`sex` ENUM('M','F','T','S') NOT NULL,
	`bed_type` ENUM('Ward','Special Ward','Cabin','ICU','CCU','COVIDU') NOT NULL,
	`booked_for` ENUM('Self','Father','Mother','Brother','Sister','Relative','Friend','Stranger'),
	`cancelled_at` DATETIME DEFAULT NULL,
	`cancelled_by` CHAR(10) DEFAULT NULL,
	`registration_no` CHAR(10) NOT NULL,
	`status` ENUM('Requested','Booked','Served','Cancelled') NOT NULL,
	`remarks` TINYTEXT DEFAULT NULL,
	`last_updated` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (`id`)
);

CREATE TABLE `address` (
	`registration_no` CHAR(10) NOT NULL,
	`street_address` TEXT NOT NULL,
	`district` VARCHAR(50) NOT NULL,
	`division` VARCHAR(50) NOT NULL,
	`phone_no` CHAR(10),
	`mobile_no` CHAR(10),
	`latitude` DECIMAL(10,5),
	`longitude` DECIMAL(10,5),
	PRIMARY KEY (`registration_no`)
);

CREATE TABLE `capacity` (
	`registration_no` CHAR(10) NOT NULL,
	`total_capacity` MEDIUMINT UNSIGNED NOT NULL,
	`ward` SMALLINT UNSIGNED DEFAULT NULL,
	`special_ward` SMALLINT UNSIGNED DEFAULT NULL,
	`cabin` TINYINT UNSIGNED DEFAULT NULL,
	`icu` TINYINT UNSIGNED DEFAULT NULL,
	`ccu` TINYINT UNSIGNED DEFAULT NULL,
	`covidu` SMALLINT UNSIGNED DEFAULT NULL,
	PRIMARY KEY (`registration_no`)
);

CREATE TABLE `vacant_bed_log` (
	`registration_no` CHAR(10) NOT NULL,
	`last_updated` DATETIME NOT NULL DEFAULT NOW(),
	`ward` SMALLINT UNSIGNED DEFAULT NULL,
	`special_ward` SMALLINT UNSIGNED DEFAULT NULL,
	`cabin` TINYINT UNSIGNED DEFAULT NULL,
	`icu` TINYINT UNSIGNED DEFAULT NULL,
	`ccu` TINYINT UNSIGNED DEFAULT NULL,
	`covidu` SMALLINT UNSIGNED DEFAULT NULL,
	PRIMARY KEY (`registration_no`,`last_updated`)
);

CREATE TABLE `staff` (
	`mobile_no` CHAR(10) NOT NULL,
	`password` CHAR(50) NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`email` VARCHAR(50) NOT NULL UNIQUE,
	`role` ENUM('Admin', 'DB Manager', 'Moderator') NOT NULL,
	`status` ENUM('Active', 'Inactive') NOT NULL,
	`registration_no` CHAR(10) NOT NULL,
	`joined_on` DATETIME NOT NULL DEFAULT NOW(),
	`last_updated` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (`mobile_no`,`registration_no`,`joined_on`)
);

CREATE TABLE `log` (
	`logged_at` DATETIME NOT NULL DEFAULT NOW(),
	`registration_no` CHAR(10) NOT NULL,
	`task` TINYTEXT NOT NULL,
	`mobile_no` CHAR(10) NOT NULL,
	`role` ENUM('Admin', 'DB Manager', 'Moderator') NOT NULL,
	PRIMARY KEY (`logged_at`,`registration_no`)
);

CREATE TABLE `doctor` (
	`id` CHAR(10) NOT NULL,
	`password` VARCHAR(50) NOT NULL,
	`email` VARCHAR(50) NOT NULL UNIQUE,
	`registration_no` CHAR(10) NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`sex` ENUM('M','F','T','S') NOT NULL,
	`department` ENUM(
					"Anesthesiology",
					"Audiology",
					"Cardiology",
					"Cardiothoracic Surgery",
					"Dental Sciences",
					"Dermatology",
					"Electrophysiology",
					"Emergency Medicine",
					"Endocrinology",
					"ENT",
					"Family Medicine",
					"Gastroenterology",
					"General Surgery",
					"Genetics",
					"Gynecology",
					"Haemato Oncology",
					"Internal Medicine",
					"Microbiology",
					"Nephrology",
					"Neurology",
					"Neurosurgery",
					"Nuclear Medicine",
					"Obstetrics and Gynecology",
					"Oncology",
					"Ophthalmology",
					"Oral and Maxillofacial Surgery",
					"Orthopedics",
					"Pediatrics",
					"Physiotherapy",
					"Plastic Surgery",
					"Psychiatry",
					"Pulmonology",
					"Radiology",
					"Reproductive Medicine",
					"Rheumatology",
					"Stroke Unit",
					"Urology",
					"Uro Oncology",
					"Vascular Surgery"
				) NOT NULL,
	`specialization` VARCHAR(512) NOT NULL,
	`chamber` VARCHAR(10) DEFAULT NULL,
	`bio` TEXT DEFAULT NULL,
	`image_source` VARCHAR(500),
	`joined_on` DATETIME NOT NULL DEFAULT NOW(),
	`status` ENUM('Active', 'Inactive') NOT NULL,
	`last_updated` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (`id`,`registration_no`,`joined_on`)
);

CREATE TABLE `schedule` (
	`doctor_id` CHAR(10) NOT NULL,
	`day` SET('A','S','M','T','W','R','F') NOT NULL,
	`start_time` TIME NOT NULL,
	`end_time` TIME NOT NULL,
	`last_updated` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (`id`,`day`)
);

CREATE TABLE `appointment` (
	`id` CHAR(10) NOT NULL,
	`user_mobile_no` CHAR(10) NOT NULL,
	`name` VARCHAR(50) NOT NULL,
	`sex` ENUM('M','F','T','S') NOT NULL,
	`for` ENUM('Self','Father','Mother','Brother','Sister','Relative','Friend','Stranger') NOT NULL DEFAULT 'Self',
	`doctor_id` CHAR(10) NOT NULL,
	`time` DATETIME NOT NULL DEFAULT NOW(),
	`status` ENUM('Requested','Confirmed','Completed','Cancelled') NOT NULL,
	`cancelled_at` DATETIME DEFAULT NULL,
	`cancelled_by` CHAR(10) DEFAULT NULL,
	`registration_no` CHAR(10) NOT NULL,
	`remarks` TINYTEXT DEFAULT NULL,
	`last_updated` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (`id`)
);


ALTER TABLE `booking` ADD CONSTRAINT `booking_fk0` FOREIGN KEY (`user_mobile_no`) REFERENCES `user`(`mobile_no`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `booking` ADD CONSTRAINT `booking_fk1` FOREIGN KEY (`registration_no`) REFERENCES `hospital`(`registration_no`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `address` ADD CONSTRAINT `address_fk0` FOREIGN KEY (`registration_no`) REFERENCES `hospital`(`registration_no`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `capacity` ADD CONSTRAINT `capacity_fk0` FOREIGN KEY (`registration_no`) REFERENCES `hospital`(`registration_no`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `vacant_bed_log` ADD CONSTRAINT `vacant_bed_log_fk0` FOREIGN KEY (`registration_no`) REFERENCES `hospital`(`registration_no`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `staff` ADD CONSTRAINT `staff_fk0` FOREIGN KEY (`registration_no`) REFERENCES `hospital`(`registration_no`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `log` ADD CONSTRAINT `log_fk0` FOREIGN KEY (`registration_no`) REFERENCES `hospital`(`registration_no`) ON DELETE CASCADE ON UPDATE CASCADE;
	
ALTER TABLE `log` ADD CONSTRAINT `log_fk1` FOREIGN KEY (`mobile_no`) REFERENCES `staff`(`mobile_no`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `doctor` ADD CONSTRAINT `doctor_fk0` FOREIGN KEY (`registration_no`) REFERENCES `hospital`(`registration_no`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `schedule` ADD CONSTRAINT `schedule_fk0` FOREIGN KEY (`doctor_id`) REFERENCES `doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `appointment` ADD CONSTRAINT `appointment_fk0` FOREIGN KEY (`user_mobile_no`) REFERENCES `user`(`mobile_no`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `appointment` ADD CONSTRAINT `appointment_fk1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `appointment` ADD CONSTRAINT `appointment_fk2` FOREIGN KEY (`registration_no`) REFERENCES `hospital`(`registration_no`) ON DELETE CASCADE ON UPDATE CASCADE;