
-- Create app_role enum for admin roles
CREATE TYPE public.admin_role AS ENUM ('super_admin', 'redakteur', 'betrachter');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ADMIN USERS TABLE
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role admin_role NOT NULL DEFAULT 'redakteur',
  is_active BOOLEAN NOT NULL DEFAULT true,
  must_change_password BOOLEAN NOT NULL DEFAULT false,
  photo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_login TIMESTAMPTZ
);
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Security definer functions
CREATE OR REPLACE FUNCTION public.get_admin_role(_user_id UUID)
RETURNS admin_role
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT role FROM public.admin_users WHERE id = _user_id AND is_active = true; $$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE id = _user_id AND is_active = true); $$;

CREATE OR REPLACE FUNCTION public.is_super_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE id = _user_id AND role = 'super_admin' AND is_active = true); $$;

-- Admin users policies
CREATE POLICY "Admins can view all admin users" ON public.admin_users FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Can insert first admin or super admin inserts" ON public.admin_users FOR INSERT TO authenticated WITH CHECK (public.is_super_admin(auth.uid()) OR NOT EXISTS (SELECT 1 FROM public.admin_users));
CREATE POLICY "Super admins or self can update" ON public.admin_users FOR UPDATE TO authenticated USING (public.is_super_admin(auth.uid()) OR auth.uid() = id);
CREATE POLICY "Super admins can delete" ON public.admin_users FOR DELETE TO authenticated USING (public.is_super_admin(auth.uid()));

-- EMAIL WHITELIST TABLE
CREATE TABLE public.email_whitelist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  added_by UUID REFERENCES public.admin_users(id),
  added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  note TEXT
);
ALTER TABLE public.email_whitelist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super admins can manage whitelist" ON public.email_whitelist FOR ALL TO authenticated USING (public.is_super_admin(auth.uid()));

CREATE OR REPLACE FUNCTION public.is_email_whitelisted(_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.email_whitelist WHERE LOWER(email) = LOWER(_email)); $$;

-- BLOG POSTS TABLE
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  category TEXT,
  author_id UUID REFERENCES public.admin_users(id),
  status TEXT NOT NULL DEFAULT 'entwurf' CHECK (status IN ('entwurf', 'veröffentlicht', 'geplant', 'archiviert')),
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  cover_image TEXT,
  reading_time INTEGER,
  tags TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published posts" ON public.blog_posts FOR SELECT USING (status = 'veröffentlicht' OR public.is_admin(auth.uid()));
CREATE POLICY "Editors can insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE POLICY "Editors can update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE POLICY "Editors can delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- AKTIONEN TABLE
CREATE TABLE public.aktionen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  title TEXT NOT NULL,
  subheadline TEXT,
  corner_badge TEXT,
  startpreis TEXT,
  bullets TEXT[],
  valid_from DATE,
  valid_until DATE,
  show_homepage BOOLEAN NOT NULL DEFAULT false,
  show_aktionen_page BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'aktiv' CHECK (status IN ('aktiv', 'inaktiv', 'abgelaufen')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.aktionen ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active aktionen" ON public.aktionen FOR SELECT USING (status = 'aktiv' OR public.is_admin(auth.uid()));
CREATE POLICY "Editors can insert aktionen" ON public.aktionen FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE POLICY "Editors can update aktionen" ON public.aktionen FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE POLICY "Editors can delete aktionen" ON public.aktionen FOR DELETE TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');

-- BEWERTUNGEN TABLE
CREATE TABLE public.bewertungen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name TEXT NOT NULL,
  stars INTEGER NOT NULL CHECK (stars >= 1 AND stars <= 5),
  text TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  standort TEXT,
  show_on_website BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bewertungen ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view visible bewertungen" ON public.bewertungen FOR SELECT USING (show_on_website = true OR public.is_admin(auth.uid()));
CREATE POLICY "Editors can insert bewertungen" ON public.bewertungen FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE POLICY "Editors can update bewertungen" ON public.bewertungen FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE POLICY "Editors can delete bewertungen" ON public.bewertungen FOR DELETE TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');

-- TEAM MEMBERS TABLE
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  standort TEXT,
  since_year INTEGER,
  description TEXT,
  photo_url TEXT,
  show_on_website BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view visible team" ON public.team_members FOR SELECT USING (show_on_website = true OR public.is_admin(auth.uid()));
CREATE POLICY "Editors can insert team" ON public.team_members FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE POLICY "Editors can update team" ON public.team_members FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE POLICY "Editors can delete team" ON public.team_members FOR DELETE TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');

-- STANDORT SETTINGS TABLE
CREATE TABLE public.standort_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  standort_name TEXT NOT NULL UNIQUE,
  telefon TEXT,
  email TEXT,
  adresse TEXT,
  google_maps_link TEXT,
  temp_closed BOOLEAN NOT NULL DEFAULT false,
  temp_closed_message TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.standort_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view standorte" ON public.standort_settings FOR SELECT USING (true);
CREATE POLICY "Editors can update standorte" ON public.standort_settings FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE POLICY "Editors can insert standorte" ON public.standort_settings FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');
CREATE TRIGGER update_standort_updated_at BEFORE UPDATE ON public.standort_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- OEFFNUNGSZEITEN TABLE
CREATE TABLE public.oeffnungszeiten (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  standort_id UUID NOT NULL REFERENCES public.standort_settings(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  is_open BOOLEAN NOT NULL DEFAULT true,
  open_time TIME,
  close_time TIME,
  UNIQUE(standort_id, day_of_week)
);
ALTER TABLE public.oeffnungszeiten ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view oeffnungszeiten" ON public.oeffnungszeiten FOR SELECT USING (true);
CREATE POLICY "Editors can manage oeffnungszeiten" ON public.oeffnungszeiten FOR ALL TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');

-- SONDER OEFFNUNGSZEITEN TABLE
CREATE TABLE public.sonder_oeffnungszeiten (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  standort_id UUID NOT NULL REFERENCES public.standort_settings(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  is_open BOOLEAN NOT NULL DEFAULT false,
  open_time TIME,
  close_time TIME,
  reason TEXT
);
ALTER TABLE public.sonder_oeffnungszeiten ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view sonder" ON public.sonder_oeffnungszeiten FOR SELECT USING (true);
CREATE POLICY "Editors can manage sonder" ON public.sonder_oeffnungszeiten FOR ALL TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');

-- ADMIN ACTIVITY LOG TABLE
CREATE TABLE public.admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.admin_users(id),
  admin_name TEXT,
  action_type TEXT NOT NULL,
  affected_item TEXT,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address TEXT
);
ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Super admins can view log" ON public.admin_activity_log FOR SELECT TO authenticated USING (public.is_super_admin(auth.uid()));
CREATE POLICY "Admins can insert log" ON public.admin_activity_log FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));

-- BENACHRICHTIGUNGEN TABLE
CREATE TABLE public.benachrichtigungen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  admin_id UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.benachrichtigungen ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view own notifications" ON public.benachrichtigungen FOR SELECT TO authenticated USING (public.is_admin(auth.uid()) AND (admin_id = auth.uid() OR admin_id IS NULL));
CREATE POLICY "Admins update own notifications" ON public.benachrichtigungen FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()) AND (admin_id = auth.uid() OR admin_id IS NULL));
CREATE POLICY "Admins insert notifications" ON public.benachrichtigungen FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));

-- BERATUNGSANFRAGEN TABLE
CREATE TABLE public.beratungsanfragen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  telefon TEXT,
  standort TEXT,
  anliegen TEXT,
  nachricht TEXT,
  status TEXT NOT NULL DEFAULT 'neu' CHECK (status IN ('neu', 'in_bearbeitung', 'erledigt', 'abgesagt')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.beratungsanfragen ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view anfragen" ON public.beratungsanfragen FOR SELECT TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Anyone can insert anfragen" ON public.beratungsanfragen FOR INSERT WITH CHECK (true);
CREATE POLICY "Editors can update anfragen" ON public.beratungsanfragen FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()) AND public.get_admin_role(auth.uid()) != 'betrachter');

-- INSERT DEFAULT STANDORTE
INSERT INTO public.standort_settings (standort_name, telefon, email, adresse) VALUES
  ('Erfurt', '0361 12345678', 'erfurt@nextphones.de', 'Bahnhofstraße 1, 99084 Erfurt'),
  ('Weimar', '03643 12345678', 'weimar@nextphones.de', 'Schillerstraße 1, 99423 Weimar'),
  ('Jena', '03641 12345678', 'jena@nextphones.de', 'Leutragraben 1, 07743 Jena'),
  ('Gotha', '03621 12345678', 'gotha@nextphones.de', 'Hauptmarkt 1, 99867 Gotha'),
  ('Arnstadt', '03628 12345678', 'arnstadt@nextphones.de', 'Marktplatz 1, 99310 Arnstadt');

-- Insert default Öffnungszeiten
DO $$
DECLARE s_id UUID;
BEGIN
  FOR s_id IN SELECT id FROM public.standort_settings LOOP
    INSERT INTO public.oeffnungszeiten (standort_id, day_of_week, is_open, open_time, close_time) VALUES
      (s_id, 1, true, '09:00', '18:00'), (s_id, 2, true, '09:00', '18:00'),
      (s_id, 3, true, '09:00', '18:00'), (s_id, 4, true, '09:00', '18:00'),
      (s_id, 5, true, '09:00', '18:00'), (s_id, 6, true, '10:00', '14:00'),
      (s_id, 0, false, NULL, NULL);
  END LOOP;
END $$;

-- Auto-create admin user on registration if whitelisted
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.email_whitelist WHERE LOWER(email) = LOWER(NEW.email)) THEN
    INSERT INTO public.admin_users (id, email, name, role)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), 'redakteur');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();
