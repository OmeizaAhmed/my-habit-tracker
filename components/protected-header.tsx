import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
export default function ProtectedHeader() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link
            href={"/protected"}
            className="tracking-wide text-xl md:text-2xl font-bold"
          >
            HABIT TRACKER
          </Link>
        </div>
        <ul className="flex justify-between gap-5 items-center border rounded-2xl  px-4">
          <Link href={"/log"}>Log</Link>
          <Link href={"/progress"}>Progress</Link>
        </ul>
        {!hasEnvVars ? (
          <EnvVarWarning />
        ) : (
          <Suspense>
            <AuthButton />
          </Suspense>
        )}
        
      </div>
    </nav>
  );
}
