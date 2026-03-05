
CREATE TABLE public.paket_anfragen (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  paket text NOT NULL,
  komponenten text[] DEFAULT '{}',
  anzahl_personen integer DEFAULT 1,
  standort text,
  vorname text NOT NULL,
  nachname text NOT NULL,
  telefon text,
  email text,
  anmerkungen text,
  status text NOT NULL DEFAULT 'neu',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.paket_anfragen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert paket_anfragen" ON public.paket_anfragen FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view paket_anfragen" ON public.paket_anfragen FOR SELECT USING (is_admin(auth.uid()));
CREATE POLICY "Editors can update paket_anfragen" ON public.paket_anfragen FOR UPDATE USING (is_admin(auth.uid()) AND get_admin_role(auth.uid()) <> 'betrachter');
