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
    <div dir={dir} className="w-full min-h-screen">
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
