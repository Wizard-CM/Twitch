import { Navigation } from "./navigation";
import Toggle from "./toggler";
import { Wrapper } from "./wrapper";

export const Sidebar = async () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  );
};

export const SidebarSkeleton = async () => {
  return;
};
