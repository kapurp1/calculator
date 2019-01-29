# calculator

# Dillinger

Calculator application written in plain HTML+CSS+JavaScript+PHP

  - Pure HTML, CSS, JS, JQuery and PHP
  - The calculator layout uses the CSS3 FlexBox layout
  - Use Touch.js to handle touch detecting on mobile devices.
  - Ajax is used to store values in Database

.
+-- css
|   +-- calc.css
+-- db
|   +-- calci.sql
+-- font
|   +-- iconfont.css
|   +-- iconfont.eot
|   +-- iconfont.svg
|   +-- iconfont.ttf
|   +-- iconfont.woff
+-- js
|   +-- calc.js
|   +-- common.js
|   +-- jquery.min.js
|   +-- zepto
|   |   +-- fx.js
|   |   +-- touch.js
|   |   +-- zepto.min.js
+-- save.php
+-- index.php

# DataBase comand
```
CREATE DATABASE IF NOT EXISTS `calci` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `calci`;

Table structure for table `calci_history`

CREATE TABLE `calci_history` (
  `id` int(11) NOT NULL,
  `expression` text NOT NULL,
  `value` text NOT NULL,
  `created_at` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
```
