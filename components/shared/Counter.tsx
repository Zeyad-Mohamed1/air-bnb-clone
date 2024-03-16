"use client";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const Counter = ({ name }: { name: string }) => {
  const [count, setCount] = useState(1);

  function handleIncrement() {
    setCount(count + 1);
  }
  function handleDecrement() {
    if (count === 1) return;
    setCount(count - 1);
  }

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={count} />
      <Button
        onClick={handleDecrement}
        variant={"outline"}
        size="icon"
        type="button"
      >
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p className="text-lg font-medium">{count}</p>
      <Button
        onClick={handleIncrement}
        variant={"outline"}
        size="icon"
        type="button"
      >
        <Plus className="h-4 w-4 text-primary" />
      </Button>
    </div>
  );
};

export default Counter;
