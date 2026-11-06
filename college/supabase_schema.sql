-- ============================================================================
-- CAMPUSFIND: COLLEGE LOST & FOUND MANAGEMENT SYSTEM
-- PostgreSQL Database Schema for Supabase
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    student_id TEXT UNIQUE,
    department TEXT NOT NULL,
    phone_number TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'restricted')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pre-seed Categories
INSERT INTO public.categories (name, icon, description) VALUES
('Electronics', 'laptop', 'Laptops, phones, chargers, headphones, calculators, USB drives'),
('Student ID & Cards', 'id-card', 'College ID badges, dorm access cards, credit/debit cards, transit passes'),
('Keys & Badges', 'key', 'Dorm keys, car keys, bike lock keys, security lanyards'),
('Bags & Backpacks', 'briefcase', 'Backpacks, totes, handbags, gym duffels, pencil pouches'),
('Bottles & Flasks', 'coffee', 'Hydroflasks, reusable water bottles, tumblers, thermos'),
('Books & Notes', 'book-open', 'Textbooks, course binders, lecture notebooks, lab manuals'),
('Clothing & Apparel', 'shirt', 'Jackets, hoodies, college varsity wear, caps, scarves, umbrellas'),
('Valuables & Jewelry', 'watch', 'Watches, rings, necklaces, prescription glasses, wallets')
ON CONFLICT (name) DO NOTHING;

-- 3. LOST_ITEMS TABLE (Reports filed by students who lost items)
CREATE TABLE IF NOT EXISTS public.lost_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_code TEXT NOT NULL UNIQUE, -- e.g. LOST-2026-1042
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    description TEXT NOT NULL,
    brand TEXT,
    primary_color TEXT,
    image_url TEXT,
    -- Location Details
    last_known_location TEXT NOT NULL,
    building TEXT NOT NULL,
    specific_area TEXT,
    -- Timing Details
    date_last_seen DATE NOT NULL,
    time_last_seen TIME,
    date_noticed_missing DATE NOT NULL,
    time_noticed_missing TIME,
    -- Confidential details (NEVER exposed to claimants)
    unique_identifying_marks TEXT NOT NULL,
    additional_notes TEXT,
    reward_amount TEXT,
    -- Status
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'matched', 'claimed', 'returned', 'archived')),
    views_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. FOUND_ITEMS TABLE (Reports filed by finders or security)
CREATE TABLE IF NOT EXISTS public.found_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_code TEXT NOT NULL UNIQUE, -- e.g. FND-2026-8021
    finder_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    general_description TEXT NOT NULL, -- Public description (no sensitive secrets)
    brand TEXT,
    primary_color TEXT,
    image_url TEXT,
    -- Location Details
    found_location TEXT NOT NULL,
    building TEXT NOT NULL,
    specific_area TEXT,
    date_found DATE NOT NULL,
    time_found TIME,
    -- Current Possession Status
    possession_status TEXT NOT NULL CHECK (possession_status IN (
        'with_finder', 
        'submitted_to_college_office', 
        'stored_in_designated_location'
    )),
    custody_location_details TEXT, -- e.g. 'Security Gate 1 Safe #3'
    custody_officer_name TEXT,
    -- Status
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'claim_pending', 'reunited', 'archived')),
    views_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. OWNERSHIP_CLAIMS TABLE (Confidential ownership verification claims)
CREATE TABLE IF NOT EXISTS public.ownership_claims (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_code TEXT NOT NULL UNIQUE, -- e.g. CLM-2026-9014
    found_item_id UUID NOT NULL REFERENCES public.found_items(id) ON DELETE CASCADE,
    claimant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- 8 Mandated Ownership Verification Answers
    q1_unique_characteristics TEXT NOT NULL,
    q2_distinguishing_features TEXT NOT NULL,
    q3_last_had_location TEXT NOT NULL,
    q4_date_lost DATE NOT NULL,
    q5_approx_time_lost TEXT NOT NULL,
    q6_identifying_marks_or_accessories TEXT NOT NULL,
    q7_purchase_receipt_or_document_info TEXT,
    q8_additional_evidence TEXT,
    
    -- Private Evidence Attachment URL (Stored in private Supabase Storage bucket)
    evidence_attachment_url TEXT,
    
    -- Verification & Review Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 
        'under_review', 
        'additional_proof_required', 
        'approved', 
        'rejected', 
        'returned'
    )),
    admin_review_notes TEXT,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    proof_request_message TEXT,
    claimant_proof_response TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. HANDOVER_RECORDS TABLE (Audit record of physical item return)
CREATE TABLE IF NOT EXISTS public.handover_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    claim_id UUID NOT NULL REFERENCES public.ownership_claims(id) ON DELETE CASCADE,
    found_item_id UUID NOT NULL REFERENCES public.found_items(id) ON DELETE CASCADE,
    claimant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    authorized_admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    
    handover_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    handover_location TEXT NOT NULL, -- e.g. 'Main Security Gate 1 Desk'
    recipient_verified_id TEXT NOT NULL, -- Verified Student ID Card No
    recipient_signature_acknowledgment BOOLEAN NOT NULL DEFAULT TRUE,
    handover_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN (
        'match_suggestion', 
        'claim_submitted', 
        'claim_status_change', 
        'additional_proof_requested', 
        'item_returned', 
        'admin_alert'
    )),
    reference_id TEXT, -- Item or Claim code
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. ADMIN_ACTIVITY_LOGS TABLE (Immutable administrative audit trail)
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    admin_name TEXT NOT NULL,
    action_type TEXT NOT NULL, -- e.g. 'CLAIM_APPROVED', 'HANDOVER_COMPLETED', 'REPORT_ARCHIVED'
    target_entity TEXT NOT NULL, -- e.g. 'ownership_claims', 'lost_items'
    target_id TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_lost_items_user ON public.lost_items(user_id);
CREATE INDEX IF NOT EXISTS idx_lost_items_status ON public.lost_items(status);
CREATE INDEX IF NOT EXISTS idx_lost_items_category ON public.lost_items(category_name);
CREATE INDEX IF NOT EXISTS idx_lost_items_building ON public.lost_items(building);

CREATE INDEX IF NOT EXISTS idx_found_items_finder ON public.found_items(finder_id);
CREATE INDEX IF NOT EXISTS idx_found_items_status ON public.found_items(status);
CREATE INDEX IF NOT EXISTS idx_found_items_category ON public.found_items(category_name);
CREATE INDEX IF NOT EXISTS idx_found_items_building ON public.found_items(building);

CREATE INDEX IF NOT EXISTS idx_claims_found_item ON public.ownership_claims(found_item_id);
CREATE INDEX IF NOT EXISTS idx_claims_claimant ON public.ownership_claims(claimant_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON public.ownership_claims(status);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON public.admin_activity_logs(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.found_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ownership_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.handover_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can view names & departments; only user or admin can update
CREATE POLICY "Profiles are viewable by authenticated users" 
ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE TO authenticated 
USING (auth.uid() = id);

-- Categories: Public read-only
CREATE POLICY "Categories are viewable by all" 
ON public.categories FOR SELECT TO authenticated USING (true);

-- Lost Items:
-- Public can browse open reports (sensitive identifying marks column restricted via API view)
CREATE POLICY "Public can view active lost items" 
ON public.lost_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Students can insert their own lost items" 
ON public.lost_items FOR INSERT TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owners or Admins can update lost items" 
ON public.lost_items FOR UPDATE TO authenticated 
USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
));

-- Found Items:
-- Public can view active found items
CREATE POLICY "Public can view found items" 
ON public.found_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Students can report found items" 
ON public.found_items FOR INSERT TO authenticated 
WITH CHECK (auth.uid() = finder_id);

CREATE POLICY "Finders or Admins can update found items" 
ON public.found_items FOR UPDATE TO authenticated 
USING (auth.uid() = finder_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
));

-- Ownership Claims:
-- CRITICAL PRIVACY: ONLY the claimant and authorized admins can view the claim answers!
CREATE POLICY "Claimants and Admins can view claims" 
ON public.ownership_claims FOR SELECT TO authenticated 
USING (
    claimant_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Authenticated users can submit claims" 
ON public.ownership_claims FOR INSERT TO authenticated 
WITH CHECK (claimant_id = auth.uid());

CREATE POLICY "Only Admins can update claim status and decisions" 
ON public.ownership_claims FOR UPDATE TO authenticated 
USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin') OR
    (claimant_id = auth.uid() AND status = 'additional_proof_required')
);

-- Handover Records:
CREATE POLICY "Claimants and Admins can view handover records" 
ON public.handover_records FOR SELECT TO authenticated 
USING (
    claimant_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Only Admins can create handover records" 
ON public.handover_records FOR INSERT TO authenticated 
WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Notifications:
CREATE POLICY "Users can only view their own notifications" 
ON public.notifications FOR SELECT TO authenticated 
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notification read status" 
ON public.notifications FOR UPDATE TO authenticated 
USING (user_id = auth.uid());

-- Admin Activity Logs:
CREATE POLICY "Only Admins can view audit activity logs" 
ON public.admin_activity_logs FOR SELECT TO authenticated 
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Only Admins can insert audit activity logs" 
ON public.admin_activity_logs FOR INSERT TO authenticated 
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================================
-- SUPABASE STORAGE BUCKETS SETUP
-- ============================================================================
-- 1. 'public_items' (Public read for item photographs)
-- 2. 'private_evidence' (Restricted read only for Claimant & Admins)

