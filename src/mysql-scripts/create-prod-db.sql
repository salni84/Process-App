

CREATE TABLE `Process_DB`.`basicprocess`
(
    `id`          int         NOT NULL AUTO_INCREMENT,
    `level`       varchar(45) NOT NULL,
    `name`        varchar(45) NOT NULL,
    `color`       varchar(45) DEFAULT NULL,
    `form`        int         DEFAULT NULL,
    `position`    int         DEFAULT NULL,
    `isVisible`   TINYINT     DEFAULT NULL,
    `visibleName` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Process_DB`.`subprocess`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `level`       varchar(45) DEFAULT NULL,
    `name`        varchar(45) DEFAULT NULL,
    `color`       varchar(45) DEFAULT NULL,
    `form`        int         DEFAULT NULL,
    `position`    int         DEFAULT NULL,
    `parent`      varchar(45) DEFAULT NULL,
    `visibleName` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
);


CREATE TABLE `Process_DB`.`departmentprocess`
(

    `id`          int NOT NULL AUTO_INCREMENT,
    `level`       varchar(45) DEFAULT NULL,
    `name`        varchar(45) DEFAULT NULL,
    `color`       varchar(45) DEFAULT NULL,
    `form`        int         DEFAULT NULL,
    `position`    int         DEFAULT NULL,
    `parent`      varchar(45) DEFAULT NULL,
    `visibleName` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
);


CREATE TABLE `Process_DB`.`detailprocess`
(

    `id`          int NOT NULL AUTO_INCREMENT,
    `level`       varchar(45) DEFAULT NULL,
    `name`        varchar(45) DEFAULT NULL,
    `color`       varchar(45) DEFAULT NULL,
    `form`        int         DEFAULT NULL,
    `position`    int         DEFAULT NULL,
    `parent`      varchar(45) DEFAULT NULL,
    `order`       int         DEFAULT NULL,
    `isVisible`   TINYINT     DEFAULT NULL,
    `visibleName` varchar(45) DEFAULT NULL,
    `isBubble`    TINYINT     DEFAULT NULL,
    PRIMARY KEY (`id`)
);


CREATE TABLE `Process_DB`.`documents`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `link`        varchar(45) DEFAULT NULL,
    `description`  varchar(45) DEFAULT NULL,
    `coreElement` varchar(45) DEFAULT NULL,
    `nr`          varchar(45) DEFAULT NULL,
    `parent`      varchar(45) DEFAULT NULL,
    `name`        varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Process_DB`.`departments`
(
    `id`    int NOT NULL AUTO_INCREMENT,
    `name`  varchar(45) DEFAULT NULL,
    `color` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
);


INSERT into Process_DB.basicprocess (id, level, name, color, form, position, isVisible, visibleName)
VALUES (null, 'basic', 'Projekt', 'green', 0, 0, 1, 'Projekt'),
       (null, 'basic', 'Admin', 'red', 0, 1, 1, 'Admin'),
       (null, 'basic', 'Service', 'blue', 0, 2, 1, 'Service');

INSERT into Process_DB.subprocess (id, level, name, color, form, position, parent, visibleName)
VALUES (null, 'sub', 'Akquisition', 'red', 0, 0, 'Projekt', 'Akquisition'),
       (null, 'sub', 'Bestellung', 'red', 1, 1, 'Projekt', 'Bestellung'),
       (null, 'sub', 'Kickoff', 'red', 0, 2, 'Projekt', 'Kickoff');

INSERT into Process_DB.departmentprocess (id, level, name, color, form, position, parent, visibleName)
VALUES (null, 'department', 'Service', 'red', 0, 0, 'Kickoff', 'Service'),
       (null, 'department', 'Ersatzteil', 'red', 0, 1, 'Kickoff', 'Ersatzteil'),
       (null, 'department', 'Kickoff', 'red', 1, 2, 'Kickoff', 'Kickoff');

INSERT into Process_DB.detailprocess (id, level, name, color, form, position, parent, visibleName, isVisible,
                                          `order`, isBubble)
VALUES (null, 'detail', 'Kundenkontakt', 'blue', 0, 0, 'Ersatzteil', 'Kundenkontakt', 1, 2, 0),
       (null, 'detail', 'Abnahme', 'green', 0, 1, 'Ersatzteil', 'Abnahme', 1, 3, 0),
       (null, 'detail', 'Kickoff', 'yellow', 1, 2, 'Ersatzteil', 'Kickoff', 1, 4, 0),
       (null, 'detail', 'Bestellung', 'green', 1, 2, 'Ersatzteil', 'Bestellung', 1, 3, 0);

INSERT into Process_DB.documents (id, name, link, description, parent, coreElement, nr)
VALUES (null, 'checkliste', 'docs/checkliste.pdf', 'liste zum checken', 'Ersatzteil', 'Abnahme', '1-00-1');

INSERT into Process_DB.departments (id, name, color)
VALUES (null, 'Projektleitung', 'blue'),
       (null, 'Hauptprozess', 'green'),
       (null, 'Reparatur', 'yellow');
