ALTER TABLE hotel_booking_system.Guest ADD email varchar(100) NOT NULL;
ALTER TABLE hotel_booking_system.Guest ADD CONSTRAINT Guest_UNIQUE UNIQUE KEY (email);
