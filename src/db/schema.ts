import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const teamRegistrations = sqliteTable('team_registrations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  teamName: text('team_name').notNull(),
  leaderName: text('leader_name').notNull(),
  playerDetails: text('player_details').notNull(),
  contact: text('contact').notNull(),
  tournamentSlug: text('tournament_slug'),
  willingToPay: integer('willing_to_pay', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const contactMessages = sqliteTable('contact_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull(),
});

export const commonRegistrations = sqliteTable('common_registrations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  leaderName: text('leader_name').notNull(),
  leaderPhone: text('leader_phone').notNull(),
  leaderEmail: text('leader_email').notNull(),
  tournament: text('tournament').notNull(),
  sendEmail: integer('send_email', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at').notNull(),
});

export const paymentConfirmations = sqliteTable('payment_confirmations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  receivedConfirmation: integer('received_confirmation', { mode: 'boolean' }).notNull().default(false),
  tournamentSlug: text('tournament_slug').notNull(),
  createdAt: integer('created_at').notNull(),
});