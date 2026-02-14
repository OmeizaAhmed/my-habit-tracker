import { getUserDetails } from "@/app/actions/actions";
import { Suspense } from "react";
import LoginButton from "./login-button";
import { ThemeSwitcher } from "./theme-switcher";
export default function Header() {
  async function IsUserLogin(){

    const userInfo = await getUserDetails()
    if(userInfo) return
    return <LoginButton />
  }
  return (
    <nav className="w-full py-8 absolute top-1 right-1 z-30">
      <div className="w-9/10 md:w-4/5 mx-auto flex justify-between items-center">
        <h1 className="tracking-wide text-xl md:text-2xl font-bold text-white">
          Habit Tracker
        </h1>
        <ul className="flex justify-between gap-5 items-center border rounded-2xl  px-4">
          <li>habit stats</li>
          <li>settings</li>
        </ul>
        <ul className="flex">
          <li><Suspense><IsUserLogin /></Suspense></li>
          <li><ThemeSwitcher /></li>
        </ul>
      </div>
    </nav>
  );
}
