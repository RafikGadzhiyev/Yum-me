export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Food: {
        Row: {
          calories: number | null
          category: string | null
          cooking_description: string | null
          created_at: string
          description: string | null
          generatedFor: string | null
          id: string
          image: string | null
          name: string | null
        }
        Insert: {
          calories?: number | null
          category?: string | null
          cooking_description?: string | null
          created_at?: string
          description?: string | null
          generatedFor?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Update: {
          calories?: number | null
          category?: string | null
          cooking_description?: string | null
          created_at?: string
          description?: string | null
          generatedFor?: string | null
          id?: string
          image?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Food_generatedFor_fkey"
            columns: ["generatedFor"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          age: number | null
          calories_per_day: number | null
          contraindications: string | null
          created_at: string
          email: string | null
          gender: string | null
          generated_foods: Json[] | null
          height: number | null
          id: string
          last_name: string | null
          name: string
          updated_at: string
          weight: number | null
          wishes: string | null
        }
        Insert: {
          age?: number | null
          calories_per_day?: number | null
          contraindications?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          generated_foods?: Json[] | null
          height?: number | null
          id?: string
          last_name?: string | null
          name?: string
          updated_at?: string
          weight?: number | null
          wishes?: string | null
        }
        Update: {
          age?: number | null
          calories_per_day?: number | null
          contraindications?: string | null
          created_at?: string
          email?: string | null
          gender?: string | null
          generated_foods?: Json[] | null
          height?: number | null
          id?: string
          last_name?: string | null
          name?: string
          updated_at?: string
          weight?: number | null
          wishes?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
