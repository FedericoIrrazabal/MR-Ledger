import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./SubmitButton";

export const SignIn = () => {
  const supabase = createClient();
  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://example.com/auth/callback",
      },
    });

    console.log(data);

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
        <div className="mt-6">
          <SubmitButton onClick={signIn} />
        </div>
      </div>
    </div>
  );
};
