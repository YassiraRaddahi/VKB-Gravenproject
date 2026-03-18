-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 18 mrt 2026 om 21:56
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vkb`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `cemeteries`
--

CREATE TABLE `cemeteries` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `zip_code` varchar(7) NOT NULL,
  `city` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `website_url` varchar(1024) DEFAULT NULL,
  `image_url` varchar(1024) DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL,
  `municipalityID` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `cemeteries`
--

INSERT INTO `cemeteries` (`id`, `name`, `address`, `zip_code`, `city`, `email`, `phone_number`, `website_url`, `image_url`, `remarks`, `municipalityID`, `created_at`, `updated_at`) VALUES
(1, 'Begraafplaats Kranenburg', 'Kranenburgweg 7', '8024 AC', 'Zwolle', 'bb', '038 454 4148', 'https://www.zwolle.nl/begraven-en-cremeren-op-kranenburg', 'public\\images\\cemeteries\\kranenburg.webp', '', 1, '2026-03-16 21:13:35', '2026-03-16 21:13:35'),
(2, 'Begraafplaats Meppelerstraatweg', 'Meppelerstraatweg', '8014 RT', 'Zwolle', 'info.meppeler@cemetery.nl', NULL, 'https://www.zwolle.nl', 'public\\images\\cemeteries\\meppelerstraatweg.png', '', 1, '2026-03-17 10:37:49', '2026-03-17 10:37:49'),
(3, 'Begraafplaats Voorst', 'Ridder Zwederlaan 1a', '8042 CC', 'Zwolle', 'contact.voorst@cemetery.nl', NULL, NULL, 'public\\images\\cemeteries\\voorst.png', '', 1, '2026-03-17 10:37:49', '2026-03-17 10:37:49'),
(4, 'Begraafplaats Windesheim', 'Pastorieweg', '8015 PK', 'Zwolle', 'beheer.windesheim@cemetery.nl', NULL, NULL, 'public\\images\\cemeteries\\windesheim.png', '', 1, '2026-03-17 10:37:49', '2026-03-17 10:37:49'),
(5, 'Begraafplaats Bergklooster', 'Bergkloosterweg 92', '8034 PL', 'Zwolle', 'info@bergklooster.nl', '+31384532281', 'http://www.bergklooster.nl', 'public\\images\\cemeteries\\bergklooster.png', '', 1, '2026-03-17 10:37:49', '2026-03-17 10:37:49'),
(6, 'R.K. Kerkhof Zwolle', 'Bisschop Willebrandlaan 62', '8021 GA', 'Zwolle', 'admin.rkkerkhof@cemetery.nl', '+31384533853', 'https://www.rkkerkhofzwolle.nl', 'public\\images\\cemeteries\\R.K._Kerkhof_zwolle.png', '', 1, '2026-03-17 10:37:49', '2026-03-17 10:37:49'),
(7, 'Joodse Begraafplaats Kuyerhuislaan', 'Kuyerhuislaan 16', '8025 AS', 'Zwolle', 'info.joods@cemetery.nl', NULL, NULL, 'public\\images\\cemeteries\\Kuyerhuislaan.png', '', 1, '2026-03-17 10:37:49', '2026-03-17 10:37:49'),
(8, 'Begraafplaats Het Heilige Kruis', 'Buitengasthuisstraat', '8011 AG', 'Zwolle', 'contact.kruis@cemetery.nl', NULL, NULL, 'public\\images\\cemeteries\\het_heilige_kruis.png', '', 1, '2026-03-17 10:37:49', '2026-03-17 10:37:49');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `cemetery_manager`
--

CREATE TABLE `cemetery_manager` (
  `user_id` int(11) NOT NULL,
  `cemetery_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `cemetery_manager`
--

INSERT INTO `cemetery_manager` (`user_id`, `cemetery_id`) VALUES
(2, 1),
(3, 1),
(9, 3),
(10, 4),
(11, 5),
(12, 6),
(13, 7),
(14, 8),
(15, 2),
(16, 2);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `cleanups`
--

CREATE TABLE `cleanups` (
  `id` int(11) NOT NULL,
  `grave_id` int(11) NOT NULL,
  `date_of_cleaned` date NOT NULL,
  `status` enum('volledig','gedeeltelijk','niet_schoon') NOT NULL,
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `cleanups`
--

INSERT INTO `cleanups` (`id`, `grave_id`, `date_of_cleaned`, `status`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-01-15', 'volledig', NULL, '2026-03-18 20:01:35', '2026-03-18 20:01:35'),
(2, 1, '2024-06-20', 'gedeeltelijk', 'Onkruid deels verwijderd', '2026-03-18 20:01:35', '2026-03-18 20:01:35'),
(3, 2, '2024-03-10', 'volledig', NULL, '2026-03-18 20:01:35', '2026-03-18 20:01:35'),
(4, 3, '2024-05-05', 'niet_schoon', 'Steen te beschadigd om schoon te maken', '2026-03-18 20:01:35', '2026-03-18 20:01:35'),
(5, 4, '2024-08-18', 'volledig', NULL, '2026-03-18 20:01:35', '2026-03-18 20:01:35'),
(6, 5, '2023-11-30', 'gedeeltelijk', 'Grafrecht verlopen, minimaal onderhoud', '2026-03-18 20:01:35', '2026-03-18 20:01:35');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `graves`
--

CREATE TABLE `graves` (
  `id` int(11) NOT NULL,
  `cemetery_id` int(11) NOT NULL,
  `last_cleanup_id` int(11) DEFAULT NULL,
  `status_id` int(11) NOT NULL,
  `type` varchar(60) DEFAULT NULL,
  `sort` varchar(60) DEFAULT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `image_hash_url` varchar(1024) DEFAULT NULL,
  `grave_number` int(11) NOT NULL,
  `remarks` text DEFAULT NULL,
  `grave_right_start` date DEFAULT NULL,
  `grave_right_end` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `graves`
--

INSERT INTO `graves` (`id`, `cemetery_id`, `last_cleanup_id`, `status_id`, `type`, `sort`, `latitude`, `longitude`, `image_hash_url`, `grave_number`, `remarks`, `grave_right_start`, `grave_right_end`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'kistgraf', 'algemeen', 52.1234567, 6.7890123, 'public\\images\\cemeteries\\bergklooster.png', 101, NULL, '2010-03-15', '2035-03-15', '2026-03-18 20:01:35', '2026-03-18 20:01:35'),
(2, 1, 3, 2, 'urnengraf', 'eigen', 52.1235567, 6.7891123, 'hash_002', 102, NULL, NULL, NULL, '2026-03-18 20:01:35', '2026-03-18 20:01:35'),
(3, 5, 4, 3, 'kistgraf', 'ereperk', 52.1236567, 6.7892123, 'hash_003', 103, 'Steen is beschadigd', '2015-06-01', '2040-06-01', '2026-03-18 20:01:35', '2026-03-18 20:01:35'),
(4, 4, 5, 1, 'kindergraf', 'algemeen', 52.1237567, 6.7893123, NULL, 104, NULL, '2020-01-10', '2045-01-10', '2026-03-18 20:01:35', '2026-03-18 20:01:35'),
(5, 8, 6, 4, 'kistgraf', 'algemeen', 52.1238567, 6.7894123, 'hash_005', 105, 'Grafrecht verlopen', '2000-05-20', '2020-05-20', '2026-03-18 20:01:35', '2026-03-18 20:01:35');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `municipalities`
--

CREATE TABLE `municipalities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `municipalities`
--

INSERT INTO `municipalities` (`id`, `name`) VALUES
(1, 'Zwolle');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `permissions`
--

INSERT INTO `permissions` (`id`, `name`) VALUES
(4, 'begraafplaats.aanmaken'),
(5, 'begraafplaats.aanpassen'),
(1, 'beheerder.aanmaken'),
(2, 'beheerder.aanpassen'),
(3, 'beheerder.verwijderen'),
(19, 'eigen.facturen.bekijken'),
(18, 'eigen.graven.bekijken'),
(12, 'graf.aanmaken'),
(13, 'graf.aanpassen'),
(14, 'graf.koppelen'),
(15, 'grafonderhouder.aanmaken'),
(16, 'grafonderhouder.aanpassen'),
(17, 'grafonderhouder.verwijderen'),
(20, 'onderhoud.graven.bekijken'),
(9, 'overledene.aanmaken'),
(10, 'overledene.aanpassen'),
(11, 'overledene.verwijderen'),
(6, 'rechthebbende.aanmaken'),
(7, 'rechthebbende.aanpassen'),
(8, 'rechthebbende.verwijderen');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `permission_role`
--

CREATE TABLE `permission_role` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `permission_role`
--

INSERT INTO `permission_role` (`role_id`, `permission_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(2, 17),
(3, 18),
(3, 19),
(4, 20);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'beheerder'),
(4, 'grafonderhouder'),
(3, 'rechthebbende');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `role_user`
--

CREATE TABLE `role_user` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `role_user`
--

INSERT INTO `role_user` (`user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2026-03-10 12:13:08', '2026-03-10 12:13:08'),
(2, 2, '2026-03-10 12:15:33', '2026-03-10 12:15:33'),
(3, 2, '2026-03-10 12:15:33', '2026-03-10 12:15:33'),
(4, 3, '2026-03-10 12:28:55', '2026-03-10 12:28:55'),
(5, 3, '2026-03-10 12:28:55', '2026-03-10 12:28:55'),
(6, 4, '2026-03-10 12:28:55', '2026-03-10 12:28:55'),
(7, 4, '2026-03-10 12:28:55', '2026-03-10 12:28:55'),
(9, 2, '2026-03-17 10:42:39', '2026-03-17 10:42:39'),
(10, 2, '2026-03-17 10:42:39', '2026-03-17 10:42:39'),
(11, 2, '2026-03-17 10:42:39', '2026-03-17 10:42:39'),
(12, 2, '2026-03-17 10:42:39', '2026-03-17 10:42:39'),
(13, 2, '2026-03-17 10:42:39', '2026-03-17 10:42:39'),
(14, 2, '2026-03-17 10:42:39', '2026-03-17 10:42:39'),
(15, 4, '2026-03-17 10:42:39', '2026-03-17 10:42:39'),
(16, 3, '2026-03-17 10:42:39', '2026-03-17 10:42:39');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `naam` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `statuses`
--

INSERT INTO `statuses` (`id`, `naam`) VALUES
(1, 'bezet'),
(2, 'vrij'),
(3, 'gereserveerd'),
(4, 'verlopen');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `infix` varchar(20) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `zip_code` varchar(7) NOT NULL,
  `city` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL,
  `profile_picture_url` varchar(1024) DEFAULT NULL,
  `relation_to_deceased` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `first_name`, `infix`, `last_name`, `address`, `zip_code`, `city`, `email`, `email_verified_at`, `phone_number`, `profile_picture_url`, `relation_to_deceased`, `password_hash`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Jetze', NULL, 'Kempenaar', 'Leliegracht 415', '3129 AB', 'Amsterdam', 'j.kempenaar@kerkrentmeester.nl', NULL, '06 – 22 54 94 53', 'public\\images\\cemetery-managers\\profile-picture.png', NULL, '$argon2id$v=19$m=65536,t=3,p=4$3eq+8GJkXrcRxe3zKN/OOw$XhrX8ccRUX/8s5N7r6AyWn3x4I28M7GTwm5savJuhIc', NULL, '2026-03-10 09:51:34', '2026-03-10 09:51:34'),
(2, 'Bea', NULL, 'Bakker', 'Vondelpark 777', '2348 GJ', 'Amsterdam', 'beabakkerr@gmail.com', NULL, '06 – 22 34 54 53', 'public\\images\\cemetery-managers\\profile-picture.png', NULL, '$argon2id$v=19$m=65536,t=3,p=4$JoYC7NkZIIweymNGsgEc7w$ffpiotccKl4bxKJWENp0qor5l2DowI9Y0uxNv3TLsG4', NULL, '2026-03-10 09:51:34', '2026-03-10 09:51:34'),
(3, 'Liza ', NULL, 'Petrushenko', 'Bloemgracht 390', '3467 JH', 'Amsterdam', 'liza2511liza@gmail.com', NULL, '06 – 43 54 21 53', 'public\\images\\cemetery-managers\\profile-picture.png', NULL, '$argon2id$v=19$m=65536,t=3,p=4$GCgYLUej/n2kgwyl7nkqlA$E5Vhl60WNw5Wg/gFSUX5btTnvOPXrvBbh+sOfM8aZCk', NULL, '2026-03-10 11:51:40', '2026-03-10 11:51:40'),
(4, 'Yassira', NULL, 'Raddahi', 'Egelantiersgracht 401', '2349 OV', 'Amsterdam', 'yassiraraddahi@gmail.com', NULL, '06 – 98 49 94 33', 'public\\images\\cemetery-managers\\profile-picture.png', NULL, '$argon2id$v=19$m=65536,t=3,p=4$4HLJsTaaRCw9356kQ9PcZA$Q3qYGxPovVdLWzCYmVe7PXE2SZ2aWqsJppia7AQolmQ', NULL, '2026-03-10 11:53:52', '2026-03-10 11:53:52'),
(5, 'Bram', NULL, 'Meijer', 'Lheebroek 27', '8923 HF', 'Dwingeloo', 'brammeijer16@hotmail.com', NULL, '06 - 12 13 93 96', 'public\\images\\cemetery-managers\\profile-picture.png', NULL, '$argon2id$v=19$m=65536,t=3,p=4$DEXaorJa8Je5pIyHoKknvA$8Af2sodmaTmLQaTCqJbKNqfB8PUiFvNlrMIYXBjvA04', NULL, '2026-03-10 11:55:40', '2026-03-10 11:55:40'),
(6, 'Lisa', 'de', 'Vries', 'Keizersgracht 45', '4389 YJ', 'Amsterdam', 'lisa.devries@gmail.com', NULL, '06 - 12 34 56 78', 'public\\images\\cemetery-managers\\profile-picture.png', NULL, '$argon2id$v=19$m=65536,t=3,p=4$iqmiC/UIViGMs/AGxt2vBA$gKfLyPzyMxOGZTjnLlGPPqeLov8O67fsBWVeaXabRFk', NULL, '2026-03-10 11:57:08', '2026-03-10 11:57:08'),
(7, 'Thomas', 'van den', 'Berg', 'Wilhelminastraat 12', '6679 TK', 'Utrecht', 'thomas.vdberg@outlook.com', NULL, '06 - 87 65 43 21', 'public\\images\\cemetery-managers\\profile-picture.png', NULL, '$argon2id$v=19$m=65536,t=3,p=4$quMZOUaUXPkNjMfakB7bVg$qD5Fci+cGLleDiBAEmeMssz+oAT1zsYpxo057IKvREo', NULL, '2026-03-10 11:57:08', '2026-03-10 11:57:08'),
(9, 'Jan', 'de', 'Vries', 'Kerkstraat 12', '8011 AA', 'Zwolle', 'jan.devries@email.nl', '2026-03-17 10:39:11', '0612345678', 'public\\images\\cemetery-managers\\profile-picture.png', 'Vader', NULL, NULL, '2026-03-17 10:39:11', '2026-03-17 10:39:11'),
(10, 'Sanne', NULL, 'Jansen', 'Meppelerstraatweg 45', '8014 RT', 'Zwolle', 'sanne.jansen@email.nl', '2026-03-17 10:39:11', '0687654321', 'public\\images\\cemetery-managers\\profile-picture.png', 'Moeder', NULL, NULL, '2026-03-17 10:39:11', '2026-03-17 10:39:11'),
(11, 'Mohammed', 'el', 'Amrani', 'Assendorperstraat 88', '8012 DE', 'Zwolle', 'm.elamrani@email.nl', '2026-03-17 10:39:11', '0611223344', 'public\\images\\cemetery-managers\\profile-picture.png', 'Broer', NULL, NULL, '2026-03-17 10:39:11', '2026-03-17 10:39:11'),
(12, 'Lisa', 'van', 'Dijk', 'Holtenbroekerdijk 23', '8031 LH', 'Zwolle', 'lisa.vandijk@email.nl', '2026-03-17 10:39:11', '0622334455', 'public\\images\\cemetery-managers\\profile-picture.png', 'Zus', NULL, NULL, '2026-03-17 10:39:11', '2026-03-17 10:39:11'),
(13, 'Peter', NULL, 'Bakker', 'Zwartewaterallee 101', '8031 DX', 'Zwolle', 'peter.bakker@email.nl', '2026-03-17 10:39:11', '0633445566', 'public\\images\\cemetery-managers\\profile-picture.png', 'Opa', NULL, NULL, '2026-03-17 10:39:11', '2026-03-17 10:39:11'),
(14, 'Fatima', NULL, 'Hassan', 'Hogenkampsweg 67', '8022 DA', 'Zwolle', 'fatima.hassan@email.nl', '2026-03-17 10:39:11', '0644556677', 'public\\images\\cemetery-managers\\profile-picture.png', 'Tante', NULL, NULL, '2026-03-17 10:39:11', '2026-03-17 10:39:11'),
(15, 'Tom', 'van der', 'Meer', 'Bachlaan 9', '8031 HL', 'Zwolle', 'tom.vandermeer@email.nl', '2026-03-17 10:39:11', '0655667788', 'public\\images\\cemetery-managers\\profile-picture.png', 'Vriend', NULL, NULL, '2026-03-17 10:39:11', '2026-03-17 10:39:11'),
(16, 'Emma', NULL, 'Smit', 'Veerallee 55', '8019 AA', 'Zwolle', 'emma.smit@email.nl', '2026-03-17 10:39:11', '0666778899', 'public\\images\\cemetery-managers\\profile-picture.png', 'Dochter', NULL, NULL, '2026-03-17 10:39:11', '2026-03-17 10:39:11');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `cemeteries`
--
ALTER TABLE `cemeteries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `municipalityID` (`municipalityID`);

--
-- Indexen voor tabel `cemetery_manager`
--
ALTER TABLE `cemetery_manager`
  ADD PRIMARY KEY (`user_id`,`cemetery_id`),
  ADD KEY `cemetery_id` (`cemetery_id`);

--
-- Indexen voor tabel `cleanups`
--
ALTER TABLE `cleanups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grave_id` (`grave_id`);

--
-- Indexen voor tabel `graves`
--
ALTER TABLE `graves`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `status_id` (`status_id`) USING BTREE,
  ADD KEY `cemetery_id` (`cemetery_id`) USING BTREE,
  ADD KEY `last_cleanup_id` (`last_cleanup_id`) USING BTREE;

--
-- Indexen voor tabel `municipalities`
--
ALTER TABLE `municipalities`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexen voor tabel `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`role_id`,`permission_id`),
  ADD KEY `permission` (`permission_id`);

--
-- Indexen voor tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexen voor tabel `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexen voor tabel `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `cemeteries`
--
ALTER TABLE `cemeteries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT voor een tabel `cleanups`
--
ALTER TABLE `cleanups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `graves`
--
ALTER TABLE `graves`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT voor een tabel `municipalities`
--
ALTER TABLE `municipalities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT voor een tabel `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT voor een tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `cemeteries`
--
ALTER TABLE `cemeteries`
  ADD CONSTRAINT `cemeteries_ibfk_1` FOREIGN KEY (`municipalityID`) REFERENCES `municipalities` (`id`) ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `cemetery_manager`
--
ALTER TABLE `cemetery_manager`
  ADD CONSTRAINT `cemetery_manager_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cemetery_manager_ibfk_2` FOREIGN KEY (`cemetery_id`) REFERENCES `cemeteries` (`id`);

--
-- Beperkingen voor tabel `cleanups`
--
ALTER TABLE `cleanups`
  ADD CONSTRAINT `cleanups_ibfk_1` FOREIGN KEY (`grave_id`) REFERENCES `graves` (`id`);

--
-- Beperkingen voor tabel `graves`
--
ALTER TABLE `graves`
  ADD CONSTRAINT `graves_ibfk_1` FOREIGN KEY (`cemetery_id`) REFERENCES `cemeteries` (`id`),
  ADD CONSTRAINT `graves_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`),
  ADD CONSTRAINT `graves_ibfk_3` FOREIGN KEY (`last_cleanup_id`) REFERENCES `cleanups` (`id`);

--
-- Beperkingen voor tabel `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_role_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `role_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
