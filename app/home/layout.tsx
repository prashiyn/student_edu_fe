import { MainNav } from "@/components/home/main-nav";
import { SiteFooter } from "@/components/home/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <MainNav />
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
} 