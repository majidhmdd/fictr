CREATE TABLE `common_registrations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`leader_name` text NOT NULL,
	`leader_phone` text NOT NULL,
	`leader_email` text NOT NULL,
	`tournament` text NOT NULL,
	`send_email` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL
);
