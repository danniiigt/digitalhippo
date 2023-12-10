"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";

const AddToCartButton = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const tiemout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => {
      clearTimeout(tiemout);
    };
  }, [isSuccess]);

  return (
    <Button onClick={() => setIsSuccess(true)} className="mt-4 w-full">
      {!isSuccess && (
        <>
          Añadir <Icons.shoppingCart className="ml-2 h-4 w-4" />
        </>
      )}
      {isSuccess && <>Producto añadido</>}
    </Button>
  );
};

export default AddToCartButton;
