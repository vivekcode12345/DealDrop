import Image from "next/image";
export default function Home() {
  return (
    <main>
      <header>
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/deal-drop-logo.png"
              alt="Deal Drop Logo"
              width={600}
              height={200}
              className="h-10 w-auto"
            />
          </div>
        </div>
      </header>
    </main>
  );
}
