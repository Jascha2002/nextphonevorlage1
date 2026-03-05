export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_activity_log: {
        Row: {
          action_type: string
          admin_id: string | null
          admin_name: string | null
          affected_item: string | null
          id: string
          ip_address: string | null
          timestamp: string
        }
        Insert: {
          action_type: string
          admin_id?: string | null
          admin_name?: string | null
          affected_item?: string | null
          id?: string
          ip_address?: string | null
          timestamp?: string
        }
        Update: {
          action_type?: string
          admin_id?: string | null
          admin_name?: string | null
          affected_item?: string | null
          id?: string
          ip_address?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_log_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          last_login: string | null
          must_change_password: boolean
          name: string
          photo_url: string | null
          role: Database["public"]["Enums"]["admin_role"]
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          is_active?: boolean
          last_login?: string | null
          must_change_password?: boolean
          name: string
          photo_url?: string | null
          role?: Database["public"]["Enums"]["admin_role"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          must_change_password?: boolean
          name?: string
          photo_url?: string | null
          role?: Database["public"]["Enums"]["admin_role"]
        }
        Relationships: []
      }
      aktionen: {
        Row: {
          bullets: string[] | null
          corner_badge: string | null
          created_at: string
          id: string
          provider: string
          show_aktionen_page: boolean
          show_homepage: boolean
          sort_order: number
          startpreis: string | null
          status: string
          subheadline: string | null
          title: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          bullets?: string[] | null
          corner_badge?: string | null
          created_at?: string
          id?: string
          provider: string
          show_aktionen_page?: boolean
          show_homepage?: boolean
          sort_order?: number
          startpreis?: string | null
          status?: string
          subheadline?: string | null
          title: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          bullets?: string[] | null
          corner_badge?: string | null
          created_at?: string
          id?: string
          provider?: string
          show_aktionen_page?: boolean
          show_homepage?: boolean
          sort_order?: number
          startpreis?: string | null
          status?: string
          subheadline?: string | null
          title?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      benachrichtigungen: {
        Row: {
          admin_id: string | null
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          type: string
        }
        Insert: {
          admin_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          type: string
        }
        Update: {
          admin_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "benachrichtigungen_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      beratungsanfragen: {
        Row: {
          anliegen: string | null
          created_at: string
          email: string | null
          id: string
          nachricht: string | null
          name: string
          standort: string | null
          status: string
          telefon: string | null
        }
        Insert: {
          anliegen?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nachricht?: string | null
          name: string
          standort?: string | null
          status?: string
          telefon?: string | null
        }
        Update: {
          anliegen?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nachricht?: string | null
          name?: string
          standort?: string | null
          status?: string
          telefon?: string | null
        }
        Relationships: []
      }
      bewertungen: {
        Row: {
          created_at: string
          date: string
          id: string
          is_featured: boolean
          reviewer_name: string
          show_on_website: boolean
          sort_order: number
          standort: string | null
          stars: number
          text: string | null
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          is_featured?: boolean
          reviewer_name: string
          show_on_website?: boolean
          sort_order?: number
          standort?: string | null
          stars: number
          text?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          is_featured?: boolean
          reviewer_name?: string
          show_on_website?: boolean
          sort_order?: number
          standort?: string | null
          stars?: number
          text?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          cover_image: string | null
          created_at: string
          id: string
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reading_time: number | null
          show_on_website: boolean
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          show_on_website?: boolean
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          show_on_website?: boolean
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      email_whitelist: {
        Row: {
          added_at: string
          added_by: string | null
          email: string
          id: string
          note: string | null
        }
        Insert: {
          added_at?: string
          added_by?: string | null
          email: string
          id?: string
          note?: string | null
        }
        Update: {
          added_at?: string
          added_by?: string | null
          email?: string
          id?: string
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_whitelist_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      oeffnungszeiten: {
        Row: {
          close_time: string | null
          day_of_week: number
          id: string
          is_open: boolean
          open_time: string | null
          standort_id: string
        }
        Insert: {
          close_time?: string | null
          day_of_week: number
          id?: string
          is_open?: boolean
          open_time?: string | null
          standort_id: string
        }
        Update: {
          close_time?: string | null
          day_of_week?: number
          id?: string
          is_open?: boolean
          open_time?: string | null
          standort_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "oeffnungszeiten_standort_id_fkey"
            columns: ["standort_id"]
            isOneToOne: false
            referencedRelation: "standort_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      sonder_oeffnungszeiten: {
        Row: {
          close_time: string | null
          date: string
          id: string
          is_open: boolean
          open_time: string | null
          reason: string | null
          standort_id: string
        }
        Insert: {
          close_time?: string | null
          date: string
          id?: string
          is_open?: boolean
          open_time?: string | null
          reason?: string | null
          standort_id: string
        }
        Update: {
          close_time?: string | null
          date?: string
          id?: string
          is_open?: boolean
          open_time?: string | null
          reason?: string | null
          standort_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sonder_oeffnungszeiten_standort_id_fkey"
            columns: ["standort_id"]
            isOneToOne: false
            referencedRelation: "standort_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      standort_settings: {
        Row: {
          adresse: string | null
          email: string | null
          google_maps_link: string | null
          id: string
          standort_name: string
          telefon: string | null
          temp_closed: boolean
          temp_closed_message: string | null
          updated_at: string
        }
        Insert: {
          adresse?: string | null
          email?: string | null
          google_maps_link?: string | null
          id?: string
          standort_name: string
          telefon?: string | null
          temp_closed?: boolean
          temp_closed_message?: string | null
          updated_at?: string
        }
        Update: {
          adresse?: string | null
          email?: string | null
          google_maps_link?: string | null
          id?: string
          standort_name?: string
          telefon?: string | null
          temp_closed?: boolean
          temp_closed_message?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          photo_url: string | null
          position: string
          show_on_website: boolean
          since_year: number | null
          sort_order: number
          standort: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          photo_url?: string | null
          position: string
          show_on_website?: boolean
          since_year?: number | null
          sort_order?: number
          standort?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          photo_url?: string | null
          position?: string
          show_on_website?: boolean
          since_year?: number | null
          sort_order?: number
          standort?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_admin_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["admin_role"]
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_email_whitelisted: { Args: { _email: string }; Returns: boolean }
      is_super_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      admin_role: "super_admin" | "redakteur" | "betrachter"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_role: ["super_admin", "redakteur", "betrachter"],
    },
  },
} as const
