import { VerifyEmail } from "@/components/VerifyEmail";
import { Metadata } from "next";
import Image from "next/image";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const metadata: Metadata = {
  title: "Iniciar sesión - DigitalHippo",
};

const Page = ({ searchParams }: PageProps) => {
  const { token, to: toEmail } = searchParams;

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src="/hippo-email-sent.png" alt="Email enviado" fill />
            </div>

            <h3 className="font-semibold text-2xl">Comprueba tu email</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center">
                Hemos enviado un enlace de verificación al correo{" "}
                <span className="font-semibold">{toEmail}.</span>{" "}
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                Hemos enviado un enlace de verificación a tu email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
