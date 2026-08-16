"use server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const db = await supabase();
  const { error } = await db.auth.signInWithPassword({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
  });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/dashboard");
}

export async function signOut() {
  const db = await supabase();
  await db.auth.signOut();
  redirect("/login");
}

export async function signUp(formData: FormData) {
  const db = await supabase();
  const { error } = await db.auth.signUp({
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    options: { data: { full_name: String(formData.get("name")) } },
  });
  if (error) redirect(`/register?error=${encodeURIComponent(error.message)}`);
  redirect("/login?message=Check%20your%20email%20to%20confirm%20your%20account.");
}