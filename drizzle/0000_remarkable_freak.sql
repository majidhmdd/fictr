CREATE TABLE `team_registrations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`team_name` text NOT NULL,
	`leader_name` text NOT NULL,
	`player_details` text NOT NULL,
	`contact` text NOT NULL,
	`tournament_slug` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
