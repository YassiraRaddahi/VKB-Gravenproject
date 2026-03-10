-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Gegenereerd op: 10 mrt 2026 om 18:56
-- Serverversie: 10.4.28-MariaDB
-- PHP-versie: 8.2.4

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
(7, 4, '2026-03-10 12:28:55', '2026-03-10 12:28:55');

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
  `city` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL,
  `relation_to_deceased` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `first_name`, `infix`, `last_name`, `address`, `city`, `email`, `email_verified_at`, `phone_number`, `relation_to_deceased`, `password_hash`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Jetze', NULL, 'Kempenaar', 'Leliegracht 415', 'Amsterdam', 'j.kempenaar@kerkrentmeester.nl', NULL, '06 – 22 54 94 53', '', '$argon2id$v=19$m=65536,t=3,p=4$3eq+8GJkXrcRxe3zKN/OOw$XhrX8ccRUX/8s5N7r6AyWn3x4I28M7GTwm5savJuhIc', NULL, '2026-03-10 09:51:34', '2026-03-10 09:51:34'),
(2, 'Bea', NULL, 'Bakker', 'Vondelpark 777', 'Amsterdam', 'beabakkerr@gmail.com', NULL, '06 – 22 34 54 53', '', '$argon2id$v=19$m=65536,t=3,p=4$JoYC7NkZIIweymNGsgEc7w$ffpiotccKl4bxKJWENp0qor5l2DowI9Y0uxNv3TLsG4', NULL, '2026-03-10 09:51:34', '2026-03-10 09:51:34'),
(3, 'Liza ', NULL, 'Petrushenko', 'Bloemgracht 390', 'Amsterdam', 'liza2511liza@gmail.com', NULL, '06 – 43 54 21 53', NULL, '$argon2id$v=19$m=65536,t=3,p=4$GCgYLUej/n2kgwyl7nkqlA$E5Vhl60WNw5Wg/gFSUX5btTnvOPXrvBbh+sOfM8aZCk', NULL, '2026-03-10 11:51:40', '2026-03-10 11:51:40'),
(4, 'Yassira', NULL, 'Raddahi', 'Egelantiersgracht 401', 'Amsterdam', 'yassiraraddahi@gmail.com', NULL, '06 – 98 49 94 33', NULL, '$argon2id$v=19$m=65536,t=3,p=4$4HLJsTaaRCw9356kQ9PcZA$Q3qYGxPovVdLWzCYmVe7PXE2SZ2aWqsJppia7AQolmQ', NULL, '2026-03-10 11:53:52', '2026-03-10 11:53:52'),
(5, 'Bram', NULL, 'Meijer', 'Lheebroek 27', 'Dwingeloo', 'brammeijer16@hotmail.com', NULL, '06 - 12 13 93 96', NULL, '$argon2id$v=19$m=65536,t=3,p=4$DEXaorJa8Je5pIyHoKknvA$8Af2sodmaTmLQaTCqJbKNqfB8PUiFvNlrMIYXBjvA04', NULL, '2026-03-10 11:55:40', '2026-03-10 11:55:40'),
(6, 'Lisa', 'de', 'Vries', 'Keizersgracht 45', 'Amsterdam', 'lisa.devries@gmail.com', NULL, '06 - 12 34 56 78', NULL, '$argon2id$v=19$m=65536,t=3,p=4$iqmiC/UIViGMs/AGxt2vBA$gKfLyPzyMxOGZTjnLlGPPqeLov8O67fsBWVeaXabRFk', NULL, '2026-03-10 11:57:08', '2026-03-10 11:57:08'),
(7, 'Thomas', 'van den', 'Berg', 'Wilhelminastraat 12', 'Utrecht', 'thomas.vdberg@outlook.com', NULL, '06 - 87 65 43 21', NULL, '$argon2id$v=19$m=65536,t=3,p=4$quMZOUaUXPkNjMfakB7bVg$qD5Fci+cGLleDiBAEmeMssz+oAT1zsYpxo057IKvREo', NULL, '2026-03-10 11:57:08', '2026-03-10 11:57:08');

--
-- Indexen voor geëxporteerde tabellen
--

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
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

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
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Beperkingen voor geëxporteerde tabellen
--

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
