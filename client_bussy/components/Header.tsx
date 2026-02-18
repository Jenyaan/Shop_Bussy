import Image from "next/image";

interface HeaderProps {
    auth: true;
}

export default function MyComponent({auth}: HeaderProps) {
  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-[33px] leading-[90px] font-bold">
        Bussy
        </h1>


        <div className="flex items-center gap-8">

          <button className="flex items-center gap-2 text-base font-medium hover:opacity-70 transition">
            <Image
              src="/help.svg"
              alt="Support"
              width={24}
              height={24}
            />
            Підтримка
          </button>

          <button className="flex items-center gap-2 text-base font-medium hover:opacity-70 transition">
            <Image
              src="/profile.svg"
              alt="Profile"
              width={24}
              height={24}
            />
            Профіль
          </button>

        </div>
      </div>
    </header>
  );
}
