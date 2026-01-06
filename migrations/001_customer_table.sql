-- Create Customer Table
create table public."Customer" (
  id text not null,
  email text not null,
  name text null,
  "shopifyCustomerId" text null,
  "createdAt" timestamp without time zone not null default CURRENT_TIMESTAMP,
  constraint Customer_pkey primary key (id)
) TABLESPACE pg_default;

-- Create Unique Index on Email
create unique INDEX IF not exists "Customer_email_key" on public."Customer" using btree (email) TABLESPACE pg_default;

-- Add tags column (for Newsletter Popup logic)
ALTER TABLE public."Customer" 
ADD COLUMN IF NOT EXISTS "tags" text[] DEFAULT '{}';
