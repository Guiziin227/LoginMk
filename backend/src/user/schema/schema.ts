import { InferInsertModel } from 'drizzle-orm';
import { InferSelectModel } from 'drizzle-orm';
import { boolean, timestamp } from 'drizzle-orm/pg-core';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  first_name: varchar({ length: 50 }).notNull(),
  last_name: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 50 }).notNull().unique(),
  password: varchar({ length: 75 }).notNull(),
  cellphone: varchar({ length: 15 }).notNull(),
  tax_id: varchar({ length: 14 }).notNull(),
  is_paid: boolean().notNull().default(false),
  paid_until: timestamp('paid_until', { withTimezone: true }),
  pix_qr_code_id: varchar({ length: 100 }),
  created_At: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updated_At: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type UserSelectModel = InferSelectModel<typeof usersTable>;
export type UserInsertModel = InferInsertModel<typeof usersTable>;
