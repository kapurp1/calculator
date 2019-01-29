# calculator

Calculator application written in plain HTML+CSS+JavaScript+PHP

  - Pure HTML, CSS, JS, JQuery and PHP
  - The calculator layout uses the CSS3 FlexBox layout
  - Use Touch.js to handle touch detecting on mobile devices.
  - Ajax is used to store values in Database
<br />

## Folder Structure
.<br />
+-- css<br />
|   +-- calc.css<br />
+-- db<br />
|   +-- calci.sql<br />
+-- font<br />
|   +-- iconfont.css<br />
|   +-- iconfont.eot<br />
|   +-- iconfont.svg<br />
|   +-- iconfont.ttf<br />
|   +-- iconfont.woff<br />
+-- js<br />
|   +-- calc.js<br />
|   +-- common.js<br />
|   +-- jquery.min.js<br />
|   +-- zepto<br />
|   |   +-- fx.js<br />
|   |   +-- touch.js<br />
|   |   +-- zepto.min.js<br />
+-- save.php<br />
+-- index.php<br />
<br />

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
