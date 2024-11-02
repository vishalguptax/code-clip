import { CodeForm } from "@/components/shared/CodeForm";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <CodeForm />
    </Suspense>
  );
}
