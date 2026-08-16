import { redirect } from "next/navigation";
import { Nav } from "@/components/nav";
import { supabase } from "@/lib/supabase/server";

export default async function Payments() {
  const db = await supabase();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user) redirect("/login");

  const { data: payments } = await db
    .from("payments")
    .select("id,amount,status,purpose,created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const list = payments ?? [];

  return (
    <>
      <Nav />
      <main className="shell page">
        <div className="kicker">Billing</div>
        <h1 className="page-title">Payments.</h1>
        <div className="glass" style={{ overflow: "auto" }}>
          {list.length ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id}>
                    <td>{p.purpose}</td>
                    <td>₹{p.amount}</td>
                    <td>
                      <span className="chip">{p.status}</span>
                    </td>
                    <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="data-empty">Your confirmed payments will appear here.</div>
          )}
        </div>
      </main>
    </>
  );
}