
CREATE TABLE public.pakete (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  badge text NOT NULL DEFAULT '',
  badge_color text,
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  core_services text[] NOT NULL DEFAULT '{}',
  optional_services text[] NOT NULL DEFAULT '{}',
  price text NOT NULL DEFAULT '',
  price_note text NOT NULL DEFAULT '',
  detail_description text NOT NULL DEFAULT '',
  detail_example text NOT NULL DEFAULT '',
  detail_notes text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.pakete ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active pakete" ON public.pakete
  FOR SELECT TO public USING (is_active = true OR is_admin(auth.uid()));

CREATE POLICY "Editors can insert pakete" ON public.pakete
  FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()) AND get_admin_role(auth.uid()) <> 'betrachter');

CREATE POLICY "Editors can update pakete" ON public.pakete
  FOR UPDATE TO authenticated USING (is_admin(auth.uid()) AND get_admin_role(auth.uid()) <> 'betrachter');

CREATE POLICY "Editors can delete pakete" ON public.pakete
  FOR DELETE TO authenticated USING (is_admin(auth.uid()) AND get_admin_role(auth.uid()) <> 'betrachter');
