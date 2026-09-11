import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import "../globals.css"; // Adjust dot nesting depending on file location depth

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} className="w-full min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
