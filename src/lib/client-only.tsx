"use client";

import { useState, useEffect } from "react";

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasMounted(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!hasMounted) return null;

  return children;
}
