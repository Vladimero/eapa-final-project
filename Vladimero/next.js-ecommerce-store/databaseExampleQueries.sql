/** Query templates: */

SELECT * FROM items;

/* Table 1: --> GENERATED DATA */

CREATE TABLE users (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name varchar(30) NOT NULL,
last_name varchar(30) NOT NULL,
email varchar(30) NOT NULL,
password varchar(100) NOT NULL,
is_admin boolean,
created_at varchar(30) NOT NULL,
updated_at varchar(30) NOT NULL,
);

/* Table 2: */

CREATE TABLE pollution (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
kind varchar(30) NOT NULL,
);

INSERT INTO pollution
(kind)
VALUES
('air'),
('water'),
('noise'),
('soil'),
('plastic'),
('radioactive'),
('thermal'),
('pluvial'),
('biological');

/* Table 3: */

CREATE TABLE region (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
state_of_austria varchar(30) NOT NULL,
);

INSERT INTO region
(state_of_austria)
VALUES
('Vienna'),
('Niederösterreich'),
('Oberösterreich'),
('Salzburg'),
('Steiermark'),
('Burgenland'),
('Kärnten'),
('Tirol'),
('Vorarlberg');

/* Table 4: */

CREATE TABLE requests (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
kind varchar(30) NOT NULL,
);

INSERT INTO requests
(kind)
VALUES
('appointment'),
('investigation'),
('improvement'),
('mending'),
('cleaning'),
('repair');

/* Table 5: --> GENERATED DATA*/

CREATE TABLE events (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
image_of_report varchar(30) NOT NULL,
report varchar(200) NOT NULL,
damage_estimation integer,
date_of_report varchar(30) NOT NULL,
);
