-- criar o banco
CREATE DATABASE `foodapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- criação de tabelas

-- criar food
CREATE TABLE `food` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `qtd_ref` int NOT NULL DEFAULT '1',
  `preco` decimal(10,2) NOT NULL,
  `proteina` double DEFAULT '0',
  `carboidrato` double DEFAULT '0',
  `gorduras` double DEFAULT '0',
  `fibra` double DEFAULT '0',
  `calcio` double DEFAULT '0',
  `ferro` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=597 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- criar meal
CREATE TABLE `meals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prato` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weekday` enum('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday') COLLATE utf8mb4_unicode_ci NOT NULL,
  `components` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `preco_total` decimal(10,2) NOT NULL,
  `proteina` double DEFAULT NULL,
  `carboidrato` double DEFAULT NULL,
  `gorduras` double DEFAULT NULL,
  `fibra` double DEFAULT NULL,
  `calcio` double DEFAULT NULL,
  `ferro` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- criar nutrientes
CREATE TABLE `nutrientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grupo_etario` varchar(50) NOT NULL,
  `idade_min` int NOT NULL,
  `idade_max` int NOT NULL,
  `sexo` enum('Masculino','Feminino') NOT NULL,
  `proteina` float NOT NULL,
  `carboidratos` float NOT NULL,
  `gorduras` varchar(20) NOT NULL,
  `fibra` float NOT NULL,
  `calcio` float NOT NULL,
  `ferro` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- criar rel_meal_food
CREATE TABLE `relmealfoods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meal_id` int DEFAULT NULL,
  `food_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `meal_id` (`meal_id`),
  KEY `food_id` (`food_id`),
  CONSTRAINT `relmealfoods_ibfk_1` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`),
  CONSTRAINT `relmealfoods_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `food` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- criar sentences
CREATE TABLE `sentences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(455) NOT NULL,
  `message` varchar(455) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  `deletedAT` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- criar users
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` varchar(45) NOT NULL,
  `sexo` varchar(45) DEFAULT 'M',
  `login_count` int DEFAULT NULL,
  `login_streak` int DEFAULT NULL,
  `family_members` int NOT NULL DEFAULT '1',
  `members_info` varchar(455) DEFAULT '{}',
  `createdAt` date DEFAULT NULL,
  `updatedAT` date DEFAULT NULL,
  `active` int DEFAULT '1',
  `renda` int DEFAULT '1400',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- abastecimento de tabelas

importar cada arquivo contido nessa pasta dentro da respectiva tabela, pelo gerenciador do SGBD


