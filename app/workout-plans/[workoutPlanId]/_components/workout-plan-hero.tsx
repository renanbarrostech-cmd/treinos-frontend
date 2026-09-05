import { Goal } from "lucide-react";
import Image from "next/image";

type WorkoutPlanHeroProps = {
  name: string;
};

export const WorkoutPlanHero = ({ name }: WorkoutPlanHeroProps) => {
  return (
    <div className="relative h-[320px] w-full shrink-0 overflow-hidden rounded-b-[28px] bg-gradient-to-br from-media to-media/80 shadow-lg md:h-[380px] md:rounded-[28px] md:shadow-xl">
      <Image
        src="/images/plano-de-treino.png"
        alt=""
        fill
        priority
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-media via-media/40 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-6 pb-10 md:p-8">
        <Image src="/fit.ai.svg" alt="FIT.AI" width={78} height={20} />

        <div className="flex flex-col items-start gap-3">
          <div className="flex w-fit items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground">
            <Goal className="size-3.5" />
            <span className="uppercase">{name}</span>
          </div>

          <h1 className="font-heading text-3xl font-semibold tracking-tight text-media-foreground md:text-4xl">
            Plano de Treino
          </h1>
        </div>
      </div>
    </div>
  );
};
