"use client";

import { Dialog } from "@/app/components/Dialog";
import { VerySlowComponent } from "@/app/components/very-slow-component";
import React, { useMemo, useState } from "react";

const Example = () => {
  // "use no memo";
  const [isOpen, setIsOpen] = useState(false);

  const data = useMemo(() => [{ id: "random" }], []);
  const onSubmit = () => {};

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>toggle dialog</button>
      {isOpen && <Dialog />}

      {/* You will see a delay when using without the React Compiler */}
      <VerySlowComponent onSubmit={onSubmit} data={data} />
    </div>
  );
};

export default Example;
