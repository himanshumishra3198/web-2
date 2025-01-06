import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";

export function SideBar() {
  return (
    <div className="h-screen w-72 pt-4 pl-4">
      <div className="flex gap-4 text-2xl">
        <div className="text-purple-600">
          <Logo />
        </div>
        <div>ThoughtSpace</div>
      </div>
      <div className="pl-4 pt-6">
        <SideBarItem text="#youtube" icon={<YoutubeIcon />} />
        <SideBarItem text="#twitter" icon={<TwitterIcon />} />
      </div>
    </div>
  );
}
