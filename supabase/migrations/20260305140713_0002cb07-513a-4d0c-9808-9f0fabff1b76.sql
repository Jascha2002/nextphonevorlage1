CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF EXISTS (SELECT 1 FROM public.email_whitelist WHERE LOWER(email) = LOWER(NEW.email)) THEN
    INSERT INTO public.admin_users (id, email, name, role)
    VALUES (
      NEW.id, 
      NEW.email, 
      COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), 
      CASE 
        WHEN LOWER(NEW.email) = 'robert@nextphones.de' THEN 'super_admin'::admin_role
        ELSE 'redakteur'::admin_role
      END
    );
  END IF;
  RETURN NEW;
END;
$function$;