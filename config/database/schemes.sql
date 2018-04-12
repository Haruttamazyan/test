CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL ,
  `lastname` varchar(255) NOT NULL ,
  `email` varchar(255) NOT NULL ,
  `ambion_id` int(11) NOT NULL,
  `password` varchar (255)  NOT NULL,
  `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

CREATE TABLE IF NOT EXISTS `students` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL ,
  `lastname` varchar(255) NOT NULL ,
  `email` varchar(255) NOT NULL ,
  `your_group` varchar(255) NOT NULL,
  `phone` varchar(255) ,
  `img` varchar(255) ,
  `password` varchar (255)  NOT NULL,

  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;


CREATE TABLE IF NOT EXISTS `photo_users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `img_path` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;




CREATE TABLE IF NOT EXISTS `ambions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

CREATE TABLE IF NOT EXISTS `ambion_news` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ambion_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `img` varchar(255),
  `description` LONGTEXT NOT NULL,
  `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;



CREATE TABLE IF NOT EXISTS `user_information` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `description` TEXT NOT NULL,
  `phone`  varchar(255) NOT NULL,
  `profesion` varchar(255) NOT NULL,
   PRIMARY KEY (`id`)
  ) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;


