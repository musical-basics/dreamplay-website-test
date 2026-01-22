


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;




ALTER SCHEMA "public" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."CampaignStatus" AS ENUM (
    'DRAFT',
    'SENT'
);


ALTER TYPE "public"."CampaignStatus" OWNER TO "postgres";


CREATE TYPE "public"."ContentType" AS ENUM (
    'EMAIL',
    'LANDING',
    'CHECKOUT'
);


ALTER TYPE "public"."ContentType" OWNER TO "postgres";


CREATE TYPE "public"."JourneyStatus" AS ENUM (
    'DRAFT',
    'ACTIVE',
    'PAUSED',
    'COMPLETED'
);


ALTER TYPE "public"."JourneyStatus" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."AnalyticsEvent" (
    "id" "text" NOT NULL,
    "type" "text" NOT NULL,
    "url" "text" NOT NULL,
    "meta" "jsonb",
    "customerId" "text",
    "journeyId" "text",
    "templateId" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "campaignId" "text"
);


ALTER TABLE "public"."AnalyticsEvent" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Asset" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "url" "text" NOT NULL,
    "mimeType" "text",
    "size" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."Asset" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Campaign" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "status" "public"."CampaignStatus" DEFAULT 'DRAFT'::"public"."CampaignStatus" NOT NULL,
    "templateId" "text" NOT NULL,
    "journeyId" "text" NOT NULL,
    "sentCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "audience" "text" DEFAULT 'ALL'::"text" NOT NULL
);


ALTER TABLE "public"."Campaign" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Configuration" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."Configuration" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ConfigurationTemplate" (
    "id" "text" NOT NULL,
    "configurationId" "text" NOT NULL,
    "templateId" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."ConfigurationTemplate" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ContentTemplate" (
    "id" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "type" "public"."ContentType" NOT NULL,
    "body" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "previewData" "jsonb",
    "transparentHeader" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."ContentTemplate" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Customer" (
    "id" "text" NOT NULL,
    "email" "text" NOT NULL,
    "name" "text",
    "shopifyCustomerId" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "tags" "text"[] DEFAULT '{}'::"text"[]
);


ALTER TABLE "public"."Customer" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."CustomerJourneyState" (
    "id" "text" NOT NULL,
    "customerId" "text" NOT NULL,
    "currentStepId" "text",
    "status" "text" NOT NULL,
    "lastUpdated" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."CustomerJourneyState" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Journey" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "status" "public"."JourneyStatus" DEFAULT 'DRAFT'::"public"."JourneyStatus" NOT NULL
);


ALTER TABLE "public"."Journey" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."JourneyStep" (
    "id" "text" NOT NULL,
    "order" integer NOT NULL,
    "journeyId" "text" NOT NULL,
    "templateId" "text" NOT NULL
);


ALTER TABLE "public"."JourneyStep" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."NavLink" (
    "id" "text" NOT NULL,
    "label" "text" NOT NULL,
    "url" "text" NOT NULL,
    "order" integer NOT NULL,
    "configurationId" "text" NOT NULL,
    "forceRefresh" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."NavLink" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Waitlist" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "full_name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."Waitlist" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."admin_variables" (
    "key" "text" NOT NULL,
    "value" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "public"."admin_variables" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."analytics_logs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "event_name" "text" NOT NULL,
    "path" "text" NOT NULL,
    "ip_address" "text",
    "user_agent" "text",
    "user_id" "text",
    "metadata" "jsonb"
);


ALTER TABLE "public"."analytics_logs" OWNER TO "postgres";


ALTER TABLE ONLY "public"."AnalyticsEvent"
    ADD CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Asset"
    ADD CONSTRAINT "Asset_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Campaign"
    ADD CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ConfigurationTemplate"
    ADD CONSTRAINT "ConfigurationTemplate_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Configuration"
    ADD CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ContentTemplate"
    ADD CONSTRAINT "ContentTemplate_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."CustomerJourneyState"
    ADD CONSTRAINT "CustomerJourneyState_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."JourneyStep"
    ADD CONSTRAINT "JourneyStep_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Journey"
    ADD CONSTRAINT "Journey_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."NavLink"
    ADD CONSTRAINT "NavLink_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Waitlist"
    ADD CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_variables"
    ADD CONSTRAINT "admin_variables_pkey" PRIMARY KEY ("key");



ALTER TABLE ONLY "public"."analytics_logs"
    ADD CONSTRAINT "analytics_logs_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "Asset_url_key" ON "public"."Asset" USING "btree" ("url");



CREATE UNIQUE INDEX "ConfigurationTemplate_configurationId_templateId_key" ON "public"."ConfigurationTemplate" USING "btree" ("configurationId", "templateId");



CREATE UNIQUE INDEX "Configuration_slug_key" ON "public"."Configuration" USING "btree" ("slug");



CREATE UNIQUE INDEX "ContentTemplate_slug_key" ON "public"."ContentTemplate" USING "btree" ("slug");



CREATE UNIQUE INDEX "Customer_email_key" ON "public"."Customer" USING "btree" ("email");



CREATE UNIQUE INDEX "JourneyStep_journeyId_order_key" ON "public"."JourneyStep" USING "btree" ("journeyId", "order");



CREATE UNIQUE INDEX "Journey_slug_key" ON "public"."Journey" USING "btree" ("slug");



CREATE INDEX "idx_analytics_logs_created_at" ON "public"."analytics_logs" USING "btree" ("created_at" DESC);



ALTER TABLE ONLY "public"."AnalyticsEvent"
    ADD CONSTRAINT "AnalyticsEvent_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."AnalyticsEvent"
    ADD CONSTRAINT "AnalyticsEvent_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."AnalyticsEvent"
    ADD CONSTRAINT "AnalyticsEvent_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "public"."Journey"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."AnalyticsEvent"
    ADD CONSTRAINT "AnalyticsEvent_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."ContentTemplate"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Campaign"
    ADD CONSTRAINT "Campaign_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "public"."Journey"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Campaign"
    ADD CONSTRAINT "Campaign_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."ContentTemplate"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."ConfigurationTemplate"
    ADD CONSTRAINT "ConfigurationTemplate_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "public"."Configuration"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ConfigurationTemplate"
    ADD CONSTRAINT "ConfigurationTemplate_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."ContentTemplate"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."CustomerJourneyState"
    ADD CONSTRAINT "CustomerJourneyState_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."JourneyStep"
    ADD CONSTRAINT "JourneyStep_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "public"."Journey"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."JourneyStep"
    ADD CONSTRAINT "JourneyStep_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."ContentTemplate"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."NavLink"
    ADD CONSTRAINT "NavLink_configurationId_fkey" FOREIGN KEY ("configurationId") REFERENCES "public"."Configuration"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Allow public read access" ON "public"."admin_variables" FOR SELECT USING (true);



CREATE POLICY "Allow service_role full access" ON "public"."admin_variables" TO "service_role" USING (true) WITH CHECK (true);



CREATE POLICY "Enable insert for anon" ON "public"."analytics_logs" FOR INSERT TO "anon" WITH CHECK (true);



CREATE POLICY "Enable insert for authenticated" ON "public"."analytics_logs" FOR INSERT TO "authenticated" WITH CHECK (true);



CREATE POLICY "Enable insert for service_role" ON "public"."analytics_logs" FOR INSERT TO "service_role" WITH CHECK (true);



CREATE POLICY "Enable read for service_role" ON "public"."analytics_logs" FOR SELECT TO "service_role" USING (true);



CREATE POLICY "Public Insert Policy" ON "public"."Waitlist" FOR INSERT WITH CHECK (true);



CREATE POLICY "Service Role Full Access" ON "public"."Waitlist" USING (("auth"."role"() = 'service_role'::"text"));



ALTER TABLE "public"."Waitlist" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."admin_variables" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."analytics_logs" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";








































































































































































GRANT ALL ON TABLE "public"."AnalyticsEvent" TO "service_role";



GRANT ALL ON TABLE "public"."Asset" TO "service_role";



GRANT ALL ON TABLE "public"."Campaign" TO "service_role";



GRANT ALL ON TABLE "public"."Configuration" TO "service_role";



GRANT ALL ON TABLE "public"."ConfigurationTemplate" TO "service_role";



GRANT ALL ON TABLE "public"."ContentTemplate" TO "service_role";



GRANT ALL ON TABLE "public"."Customer" TO "service_role";



GRANT ALL ON TABLE "public"."CustomerJourneyState" TO "service_role";



GRANT ALL ON TABLE "public"."Journey" TO "service_role";



GRANT ALL ON TABLE "public"."JourneyStep" TO "service_role";



GRANT ALL ON TABLE "public"."NavLink" TO "service_role";



GRANT ALL ON TABLE "public"."Waitlist" TO "anon";
GRANT ALL ON TABLE "public"."Waitlist" TO "authenticated";
GRANT ALL ON TABLE "public"."Waitlist" TO "service_role";



GRANT SELECT ON TABLE "public"."admin_variables" TO "anon";
GRANT SELECT ON TABLE "public"."admin_variables" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_variables" TO "service_role";



GRANT INSERT ON TABLE "public"."analytics_logs" TO "anon";
GRANT INSERT ON TABLE "public"."analytics_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."analytics_logs" TO "service_role";


































