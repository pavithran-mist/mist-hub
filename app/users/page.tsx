import Link from "next/link";
import { Nav } from "@/components/nav";
import { supabase } from "@/lib/supabase/server";

export default async function Users() {
  const db = await supabase();
  const { data: profiles } = await db
    .from("profiles")
    .select("id,full_name,username,bio,college,avatar_url")
    .eq("is_private", false)
    .limit(24);

  const list = profiles ?? [];

  return (
    <>
      <Nav />
      <main className="shell page">
        <div className="kicker">Campus community</div>
        <h1 className="page-title">Find your people.</h1>
        <div className="cards">
          {list.map((p) => (
            <Link className="glass card" href="/profile" key={p.id}>
              {p.avatar_url && <img src={p.avatar_url} alt="" />}
              <h3>{p.full_name || "MIST member"}</h3>
              <p className="muted">
                @{p.username || "member"} · {p.college || "Campus"}
              </p>
              <span className="price">View profile →</span>
            </Link>
          ))}
        </div>
        {!list.length && (
          <div className="glass data-empty">No public profiles yet.</div>
        )}
      </main>
    </>
  );
}