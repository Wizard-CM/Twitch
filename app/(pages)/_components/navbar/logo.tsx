import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Logo = () => {
  return (
    <Link href="/" className=" gap-x-2 hidden lg:flex cursor-pointer">
      <div className="p-2 bg-white rounded-full flex justify-center items-center">
        <Image
          src={"/spooky.svg"}
          alt="logo"
          height={35}
          width={35}
          className="object-cover"
        />
      </div>
      <div className={cn(font.style)}>
        <h3 className="font-bold text-xl">GameHub</h3>
        <p className="text-sm text-muted-foreground">Let&apos;s play</p>
      </div>
    </Link>
  );
};
