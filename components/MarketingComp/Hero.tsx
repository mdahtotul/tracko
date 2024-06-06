import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex items-center">
      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
        <Image
          src="/hero_1.png"
          alt="hero image"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
