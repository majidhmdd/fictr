CREATE TABLE `payment_confirmations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`received_confirmation` integer DEFAULT false NOT NULL,
	`tournament_slug` text NOT NULL,
	`created_at` integer NOT NULL
);
