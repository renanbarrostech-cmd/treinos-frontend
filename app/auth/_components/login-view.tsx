"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { authClient } from "@/app/_lib/auth-client";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";

export const LoginView = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [isPending, session, router]);

  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    if (error) {
      toast.error(error.message || "Erro ao fazer login com o Google.");
    }
  };

  if (isPending || session) {
    return null;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-black">
      <div className="relative flex-1 overflow-hidden">
        <Image
          src="/images/login-hero.png"
          alt="Homem malhando"
          fill
          priority
          className="object-contain object-top"
        />
        <div className="absolute inset-x-0 top-12 flex justify-center">
          <h1 className="font-heading text-[32px] font-extrabold tracking-tight text-brand-foreground">
            FIT.AI
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[60px] rounded-t-[20px] bg-brand px-5 pt-12 pb-10">
        <div className="flex w-full max-w-[362px] flex-col items-center gap-6">
          <p className="font-heading text-center text-[32px] leading-[1.05] font-semibold text-brand-foreground">
            O app que vai transformar a forma como você treina.
          </p>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            className="h-[38px] gap-2 rounded-full bg-brand-accent px-6 text-sm font-semibold text-brand-accent-foreground hover:bg-brand-accent/90"
          >
            <GoogleIcon className="size-4" />
            Fazer login com Google
          </Button>
        </div>

        <p className="text-center text-xs text-brand-foreground/70">
          ©2026 Copyright FIT.AI. Todos os direitos reservados
        </p>
      </div>
    </div>
  );
};
