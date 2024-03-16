"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const ReservationButtons = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button size={"lg"} className="w-full" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size={"lg"} className="w-full">
          Make Reservation
        </Button>
      )}
    </>
  );
};

export default ReservationButtons;
