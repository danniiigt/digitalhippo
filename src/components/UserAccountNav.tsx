"use client";

import { User } from "@/payload-types";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Icons } from "./ui/icons";

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-hidden">
        <Button variant="ghost" size="sm" className="relative">
          Mi cuenta
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/sell"
            className="flex items-center gap-x-3 cursor-pointer"
          >
            <Icons.dashboard className="h-4 w-4" strokeWidth={1.5} />
            <span>Panel de control</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={signOut}
          className="cursor-pointer flex items-center gap-x-3"
        >
          <Icons.logout className="h-4 w-4" strokeWidth={1.5} />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
