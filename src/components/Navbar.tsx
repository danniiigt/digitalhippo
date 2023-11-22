import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Icons } from "./ui/icons";
import { Button } from "./ui/button";
import NavItems from "./NavItems";
import Cart from "./Cart";

const Navbar = () => {
  const user = null;

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 backdrop-blur-lg">
      <header className="relative border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center">
            {/* TODO: Mobile Nav */}

            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <Icons.logo className="h-9 w-9" />
              </Link>
            </div>

            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
              <NavItems />
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {!user && (
                  <>
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/iniciar-sesion">Acceder</Link>
                    </Button>
                    <span
                      className="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                    <Button asChild size="sm">
                      <Link href="/crear-cuenta">Crear cuenta</Link>
                    </Button>
                  </>
                )}

                <div className="ml-4 flow-root lg:ml-6">
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
