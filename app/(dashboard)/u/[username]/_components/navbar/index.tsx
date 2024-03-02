import { Actions } from "./actions";
import { Logo } from "./logo";

export const Navbar = async () => {
  return (
    <div className="flex justify-between h-[5rem] items-center bg-[#252731] px-6 fixed top-0 w-full z-[50] border-b border-[#6a6b6c] ">
      <Logo />
      <Actions />
    </div>
  );
};
