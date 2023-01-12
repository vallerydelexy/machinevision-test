import { FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/outline";
export const navigation = [
    { name: "", href: "/", icon: HomeIcon, current: true },
    { name: "User", href: "/user", icon: UsersIcon, current: false },
    { name: "Post", href: "/post", icon: FolderIcon, current: false },
  ];