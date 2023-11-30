import CreateAccountForm from "@/components/CreateAccountForm";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-bold">Crear cuenta</h1>
        </div>

        <Button
          variant="link"
          asChild
          className="text-muted-foreground h-fit"
          size="sm"
        >
          <Link href="/iniciar-sesion">
            ¿Ya tienes cuenta? Inicia sesión &rarr;
          </Link>
        </Button>

        <div className="grid gap-6 mt-8">
          <CreateAccountForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
