// "use no memo";


import React, { useEffect } from "react";

export const wait = (ms: number) => {
  const start = Date.now();
  let now = start;

  while (now - start < ms) now = Date.now();
};

export const VerySlowComponent = ({onSubmit, data}:any) => {
  wait(1500);
  useEffect(() => {
    console.log("re-render slow component");
  });

  return <div className="text-base my-4">Slow component</div>;
};
