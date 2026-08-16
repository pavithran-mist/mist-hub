import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import { supabase } from "@/lib/supabase/server";

export default async function Messages() {
  const db = await supabase();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");

  const { data: conversations } = await db
    .from("conversation_members")
    .select("conversation_id,last_read_at,conversations(created_at)")
    .eq("user_id", user.id);

  const list = conversations ?? [];

  return (
    <>
      <Nav />
      <main className="shell page">
        <div className="kicker">Community</div>
        <h1 className="page-title">Conversations.</h1>
        <section className="glass chat">
          <aside>
            <b>Messages</b>
            <p className="muted">
              Search and start a conversation with someone in your campus community.
            </p>
            {list.length ? (
              list.map((m: any) => (
                <div className="metric" style={{ marginTop: 10 }} key={m.conversation_id}>
                  Conversation
                </div>
              ))
            ) : (
              <p className="muted">No conversations yet.</p>
            )}
          </aside>
          <main>Select a conversation to start reading and sending text messages.</main>
        </section>
        <p className="muted" style={{ fontSize: 13 }}>
          MIST chat is text-only by design. Attachments, audio and media uploads are not supported.
        </p>
      </main>
    </>
  );
}