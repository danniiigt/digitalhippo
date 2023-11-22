import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { CheckCircle, Leaf, PackageCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

type Perk = {
  name: string;
  description: string;
  Icon: React.FC;
};

const perks: Perk[] = [
  {
    name: "Envío instantaneo",
    Icon: PackageCheck,
    description:
      "Recibe tu producto en segundos via email listo para consumir.",
  },
  {
    name: "Devolución 30 días",
    Icon: ShieldCheck,
    description:
      "¿No estás contento con tu producto? Tienes un plazo de 30 días para devolverlo.",
  },
  {
    name: "Producto Sostenible",
    Icon: Leaf,
    description:
      "Donamos el 1% de todas nuestras ventas a organizaciones eco-friendly.",
  },
];

const Page = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Tu marketplace de{" "}
            <span className="text-primary font-extrabold">
              productos digitales
            </span>{" "}
            de calidad.
          </h1>
          <p className="text-lg mt-6 max-w-prose text-muted-foreground">
            Bienvenido a DigitalHippo. Un marketplace de productos digitales
            donde el cliente es nuestra prioridad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button asChild>
              <Link href="/productos">Productos Trend 🔥</Link>
            </Button>
            <Button
              variant="ghost"
              className="bg-accent hover:bg-foreground/10"
            >
              Estándares de calidad &rarr;
            </Button>
          </div>
        </div>

        {/* TODO: Listar productos */}
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk: Perk, index: number) => (
              <div
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                key={index}
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {<perk.Icon />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium">{perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground max-w-xs mx-auto">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
};

export default Page;
