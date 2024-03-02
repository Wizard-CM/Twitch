import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="p-1 bg-white rounded-full">
        <Image
          src={"/spooky.svg"}
          alt="gamehub"
          width={80}
          height={80}
        ></Image>
      </div>
      <div className="flex flex-col items-center mb-5">
        <h3 className="text-xl font-semibold">TWITCH</h3>
        <p className="text-sm text-muted-foreground">Let&apos;s play</p>
      </div>
    </div>
  );
};
