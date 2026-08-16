import Link from "next/link";
import { LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { supabase } from "@/lib/supabase/server";
import { signOut } from "@/actions/auth";

export async function Nav() {
  const db = await supabase();
  const {
    data: { user },
  } = await db.auth.getUser();

  return (
    <header className="topbar">
      <div className="shell nav">
        <Link href="/" className="brand">
          <span className="brand-mark" />
          MIST HUB
        </Link>
        <nav className="nav-links">
          <Link href="/courses">Courses</Link>
          <Link href="/books">Books</Link>
          <Link href="/notes">Notes</Link>
          <Link href="/events">Events</Link>
          <Link href="/messages">Messages</Link>
        </nav>
        {user ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Link href="/dashboard" className="btn btn-quiet">
              <LayoutDashboard size={15} /> Dashboard
            </Link>
            <form action={signOut}>
              <button className="btn btn-quiet" type="submit">
                <LogOut size={15} /> Sign out
              </button>
            </form>
          </div>
        ) : (
          <Link href="/login" className="btn btn-quiet">
            <LogIn size={15} /> Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
