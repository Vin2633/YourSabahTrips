-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2025 at 05:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `your_sabah_trips`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `AdminId` int(10) UNSIGNED NOT NULL COMMENT 'Primary Key for Admin',
  `Username` varchar(100) NOT NULL COMMENT 'Unique username for login',
  `PasswordHash` VARCHAR(255) NOT NULL COMMENT 'Secure hash of the admin password using bcrypt',
  `RoleLevel` varchar(50) NOT NULL DEFAULT 'standard' COMMENT 'Role level (e.g., SuperAdmin, Manager)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`AdminId`, `Username`, `PasswordHash`, `RoleLevel`) VALUES
(1, 'superadmin', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'SuperAdmin'),
(2, 'manager_ops', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff114d56d11231f13b69201a', 'Manager'),
(3, 'editor', 'd9987f2e12818228d7a12b403dd321af141d6b048754b2a472c1c6868848b88d', 'Standard');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `BookingId` int(10) UNSIGNED NOT NULL COMMENT 'Primary Key for Booking',
  `TouristId` int(10) UNSIGNED NOT NULL COMMENT 'Foreign Key linking to the Tourist table',
  `ScheduleId` int(10) UNSIGNED NOT NULL COMMENT 'Foreign Key linking to the Schedule table',
  `NumPax` tinyint(3) UNSIGNED NOT NULL COMMENT 'Number of passengers in the booking',
  `TotalCost` decimal(10,2) NOT NULL COMMENT 'Total cost of the booking',
  `Status` varchar(50) NOT NULL DEFAULT 'Pending' COMMENT 'Booking status (e.g., Pending, Confirmed, Cancelled)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`BookingId`, `TouristId`, `ScheduleId`, `NumPax`, `TotalCost`, `Status`) VALUES
(1, 1, 1, 2, 2500.00, 'Confirmed'),
(2, 2, 2, 1, 980.50, 'Confirmed'),
(3, 3, 3, 4, 1400.00, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `PackageId` int(10) UNSIGNED NOT NULL COMMENT 'Primary Key for Package',
  `PackageName` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(7,2) NOT NULL COMMENT 'Base price per person for the package',
  `Location` varchar(100) NOT NULL COMMENT 'Main location or region of the package',
  `Max_Pax` int(10) UNSIGNED DEFAULT NULL COMMENT 'Maximum number of passengers allowed for this package'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`PackageId`, `PackageName`, `Description`, `Price`, `Location`, `Max_Pax`) VALUES
(1, 'Tropical Island Retreat', 'A 5-day journey to stunning beaches and coral reefs in Southeast Asia.', 1250.00, 'Maldives', 20),
(2, 'Ancient Ruins Trek', 'Explore forgotten Inca temples and historical sites over 7 days in the Andes.', 980.50, 'Peru', 15),
(3, 'City Food Tour', 'A short but intense 2-day gastronomic adventure focusing on street food.', 350.00, 'Tokyo', 30);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `PaymentId` int(10) UNSIGNED NOT NULL COMMENT 'Primary Key for Payment',
  `BookingId` int(10) UNSIGNED NOT NULL COMMENT 'Foreign Key linking to the Booking table',
  `AmountPaid` decimal(10,2) NOT NULL,
  `ReceiptNo` varchar(100) DEFAULT NULL COMMENT 'Unique transaction receipt identifier',
  `PaymentDate` datetime NOT NULL COMMENT 'Date and time of the payment',
  `PaymentStatus` varchar(50) NOT NULL DEFAULT 'Initiated' COMMENT 'Status of the payment (e.g., Completed, Failed, Refunded)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`PaymentId`, `BookingId`, `AmountPaid`, `ReceiptNo`, `PaymentDate`, `PaymentStatus`) VALUES
(1, 1, 2500.00, 'TXN1001A', '2025-12-03 12:46:54', 'Completed'),
(2, 2, 980.50, 'TXN1002B', '2025-12-02 12:46:54', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `ScheduleId` int(10) UNSIGNED NOT NULL COMMENT 'Primary Key for Schedule',
  `PackageId` int(10) UNSIGNED NOT NULL COMMENT 'Foreign Key linking to the Package table',
  `TravelDate` date NOT NULL COMMENT 'The date the trip starts',
  `StartTime` time NOT NULL COMMENT 'The start time of the trip',
  `EndTime` time NOT NULL COMMENT 'The anticipated end time of the trip'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`ScheduleId`, `PackageId`, `TravelDate`, `StartTime`, `EndTime`) VALUES
(1, 1, '2025-12-20', '08:00:00', '18:00:00'),
(2, 2, '2026-01-15', '07:30:00', '19:30:00'),
(3, 3, '2025-12-25', '10:00:00', '17:00:00'),
(4, 1, '2026-02-10', '08:00:00', '18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tourist`
--

CREATE TABLE `tourist` (
  `TouristId` int(10) UNSIGNED NOT NULL COMMENT 'Primary Key for Tourist',
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `PasswordHash` VARCHAR(255) NOT NULL COMMENT 'Secure hash of the tourist password using bcrypt',
  `PhoneNo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tourist`
--

INSERT INTO `tourist` (`TouristId`, `FirstName`, `LastName`, `Email`, `PasswordHash`, `PhoneNo`) VALUES
(1, 'Alice', 'Smith', 'alice.s@mail.com', '8e32906ec143f6e147b3b4f620ff6dfd6c5478d10b42f63f35c5c0c20a84e2a8', '555-0101'),
(2, 'Bob', 'Johnson', 'bob.j@mail.com', 'd5366cc9d7c499c75945ff60000d07525389e187766b2a001ccf4640161476d0', '555-0102'),
(3, 'Charlie', 'Brown', 'charlie.b@mail.com', '6e56860d5b1285317b96874e44d6a7882253f9328229b1d3032d667634f59e99', '555-0103');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminId`),
  ADD UNIQUE KEY `Username` (`Username`),

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`BookingId`),
  ADD KEY `TouristId` (`TouristId`),
  ADD KEY `ScheduleId` (`ScheduleId`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`PackageId`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`PaymentId`),
  ADD UNIQUE KEY `ReceiptNo` (`ReceiptNo`),
  ADD KEY `BookingId` (`BookingId`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`ScheduleId`),
  ADD KEY `PackageId` (`PackageId`);

--
-- Indexes for table `tourist`
--
ALTER TABLE `tourist`
  ADD PRIMARY KEY (`TouristId`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `AdminId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary Key for Admin', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `BookingId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary Key for Booking', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `PackageId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary Key for Package', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `PaymentId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary Key for Payment', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `ScheduleId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary Key for Schedule', AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tourist`
--
ALTER TABLE `tourist`
  MODIFY `TouristId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Primary Key for Tourist', AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`TouristId`) REFERENCES `tourist` (`TouristId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`ScheduleId`) REFERENCES `schedule` (`ScheduleId`) ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`BookingId`) REFERENCES `booking` (`BookingId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`PackageId`) REFERENCES `package` (`PackageId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
