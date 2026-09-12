import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import BackToTop from "@/components/Layout/BackToTop";
import "../globals.css";

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
    <div
      dir={dir}
      className="flex min-h-screen w-full flex-col justify-between"
    >
      <Navbar />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />

      <BackToTop />
    </div>
  );
}