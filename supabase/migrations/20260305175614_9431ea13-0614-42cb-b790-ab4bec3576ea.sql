
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS show_on_website boolean NOT NULL DEFAULT true;

ALTER TABLE public.aktionen ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
