CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar(25) NOT NULL,
	"cellphone" varchar(15),
	"tax_id" varchar(14),
	"is_paid" boolean DEFAULT false NOT NULL,
	"paid_until" varchar(30),
	"pix_qr_code_id" varchar(100),
	"created_at" varchar(30) NOT NULL,
	"updated_at" varchar(30) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
