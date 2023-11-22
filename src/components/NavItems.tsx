"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const navItems = [];

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={navRef} className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, index: number) => {
        const handleOpen = () => {
          if (activeIndex === index) setActiveIndex(null);
          else setActiveIndex(index);
        };

        const isOpen = activeIndex === index;

        return (
          <NavItem
            key={index}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={activeIndex !== null}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
