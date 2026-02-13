"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export default function LoginButton() {
    const navigate = useRouter()
  function handleLogin() {
    navigate.push("/auth/login");
  }

  return (
    <Button variant="outline" onClick={handleLogin}>
      Login
    </Button>
  );
}
