import { Droplet, Ruler, User as UserIcon, Weight } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { getUserTrainData } from "@/app/_lib/api/fetch-generated";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomNav } from "@/components/bottom-nav";
import { LogoutButton } from "@/components/logout-button";
import { StatCard } from "@/components/stat-card";

export default async function ProfilePage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const trainDataResponse = await getUserTrainData();
  const trainData =
    trainDataResponse.status === 200 ? trainDataResponse.data : null;

  const weightKg = trainData
    ? (trainData.weightInGrams / 1000).toFixed(1)
    : "-";
  const heightCm = trainData ? String(trainData.heightInCentimeters) : "-";
  const bodyFat = trainData
    ? `${Math.round(trainData.bodyFatPercentage)}%`
    : "-";
  const age = trainData ? String(trainData.age) : "-";

  const { name, image } = session.data.user;
  const initials = name
    ?.split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

  return (
    <div className="flex min-h-svh flex-col bg-background pb-24">
      <div className="flex h-14 items-center px-5">
        <Image src="/fit-ai-dark.svg" alt="FIT.AI" width={78} height={20} />
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="flex items-center gap-3">
          <Avatar className="size-[52px]">
            {image && <AvatarImage src={image} alt="" />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1.5">
            <p className="font-heading text-lg font-semibold text-foreground">
              {name}
            </p>
            <p className="text-sm text-foreground/70">Plano Básico</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={Weight} value={weightKg} label="KG" />
          <StatCard icon={Ruler} value={heightCm} label="CM" />
          <StatCard icon={Droplet} value={bodyFat} label="GC" />
          <StatCard icon={UserIcon} value={age} label="ANOS" />
        </div>

        <LogoutButton />
      </div>

      <BottomNav />
    </div>
  );
}
