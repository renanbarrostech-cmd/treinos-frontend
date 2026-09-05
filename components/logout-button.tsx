"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error(error.message);
      return;
    }

    router.push("/auth");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleLogout}
      className="mx-auto h-auto gap-2 rounded-full px-4 py-2 font-heading text-base font-semibold text-destructive hover:bg-transparent hover:text-destructive"
    >
      Sair da conta
      <LogOut className="size-4" />
    </Button>
  );
};
