import { Sidebar } from "@/components/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/auth/login");
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        userName={user?.user_metadata?.full_name}
        userImage={user?.user_metadata?.avatar_url}
        onLogout={signOut}
      />
      <div className="flex-1 px-8 py-14 overflow-auto">{children}</div>
    </div>
  );
}
