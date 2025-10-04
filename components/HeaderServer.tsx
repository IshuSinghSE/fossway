import { createClient } from "@/lib/supabase/server";
import { HeaderClient } from "./HeaderClient";
import { UserButton } from "./UserButton";

export async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <HeaderClient user={user}>
      {user && <UserButton user={user} />}
    </HeaderClient>
  );
}
