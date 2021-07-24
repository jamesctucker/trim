import { useEffect, useState } from "react";
import { Typography, Button } from "@supabase/ui";
import { supabase } from "../../utils/supabaseClient";

export default function Nav() {
  const user = supabase.auth.user();
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const signOut = () => {
    supabase.auth.signOut();
  };
  return (
    <div>
      {session && (
        <>
          <Typography.Text>Signed in: {user.email}</Typography.Text>
          <Button block onClick={signOut}>
            Sign out
          </Button>
        </>
      )}
    </div>
  );
}
