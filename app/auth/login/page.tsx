import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Login() {
  const origin = headers().get("origin");
  const signIn = async () => {
    "use server";

    const supabase = createClient();

    const { data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (data.url) {
      redirect(data.url);
    }
  };
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Inicia sesión en tu cuenta
        </h1>
        <p className="mt-4 text-muted-foreground">
          ¡Bienvenido de vuelta! Por favor, inicia sesión en tu cuenta para
          continuar.
        </p>
        <form className="mt-6">
          <Button variant="outline" formAction={signIn}>
            Iniciar sesion
          </Button>
        </form>
      </div>
    </div>
  );
}
