import { userDetails } from "@/app/actions/getUser";
import { Suspense } from "react";
import LoginButton from "./login-button";
import { ThemeSwitcher } from "./theme-switcher";
export default function Header() {
  async function IsUserLogin(){

    const userInfo = await userDetails()
    if(userInfo) return
    return <LoginButton />
  }
  return (
    <nav className="w-full py-8">
      <div className="w-9/10 md:w-4/5 mx-auto flex justify-between items-center">
        <h1 className="tracking-wide text-xl md:text-2xl font-bold">
          Habit Tracker
        </h1>
        <ul className="flex justify-between gap-5 items-center">
          <li>habit stats</li>
          <li>settings</li>
          <li><Suspense><IsUserLogin /></Suspense></li>
          <li><ThemeSwitcher /></li>
        </ul>
      </div>
    </nav>
  );
}
