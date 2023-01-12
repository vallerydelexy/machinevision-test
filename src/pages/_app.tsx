import React from "react";
import MobileSidebar from "../components/MobileSidebar";
import StaticSidebar from "../components/staticSidebar";
import { navigation } from "../components/NavigationItems";
import MenuButton from "../components/MenuButton";
import Notification from "../components/notification";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen flex overflow-hidden bg-gray-100">
      <MobileSidebar navigation={navigation} />
      <StaticSidebar navigation={navigation} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <MenuButton />
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">{children}</main>
      </div>
<Notification />
      
    </section>
  );
}
