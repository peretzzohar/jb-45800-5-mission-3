-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jun 09, 2026 at 07:21 AM
-- Server version: 9.6.0
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `managing_meetings`
--
CREATE DATABASE IF NOT EXISTS `managing_meetings` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `managing_meetings`;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `created_at`, `updated_at`) VALUES
('1049124a-63d1-11f1-81c9-16ca933baaaf', 'Apple', '1976-04-01 14:23:23', '2026-06-09 07:00:53'),
('5e036423-63d0-11f1-81c9-16ca933baaaf', 'NVIDIA', '1993-04-05 11:43:40', '2026-06-01 09:53:40'),
('b4ce8d67-63d0-11f1-81c9-16ca933baaaf', 'Alphabet', '2005-10-02 15:57:43', '2026-06-09 06:57:42');

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `group_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `start_date` datetime NOT NULL,
  `finish_date` datetime NOT NULL,
  `description` text NOT NULL,
  `room` text NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`id`, `group_id`, `start_date`, `finish_date`, `description`, `room`, `created_at`, `updated_at`) VALUES
('0df1ca7c-63d2-11f1-81c9-16ca933baaaf', '1049124a-63d1-11f1-81c9-16ca933baaaf', '2026-04-14 10:07:48', '2026-04-14 16:07:48', 'creating new app', 'the round room', '2026-06-07 10:07:48', '2026-06-09 07:07:47'),
('3a50fed9-63d2-11f1-81c9-16ca933baaaf', 'b4ce8d67-63d0-11f1-81c9-16ca933baaaf', '2026-06-07 10:08:51', '2026-06-07 13:08:51', 'Job interviews', 'The Purple Room', '2026-06-09 07:08:51', '2026-06-09 07:08:51'),
('e203cab1-63d1-11f1-81c9-16ca933baaaf', '1049124a-63d1-11f1-81c9-16ca933baaaf', '2025-10-08 10:02:41', '2025-10-08 13:02:41', 'talking about creating new product', 'the pink room', '2026-05-04 10:02:41', '2026-05-05 10:02:41'),
('e2049f09-63d1-11f1-81c9-16ca933baaaf', '1049124a-63d1-11f1-81c9-16ca933baaaf', '2026-06-01 10:02:41', '2026-06-01 11:14:41', 'job interviews', 'the blue room', '2026-06-02 10:02:41', '2026-06-09 07:02:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
