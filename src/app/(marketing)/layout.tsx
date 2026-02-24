import ConvexClientProvider from "@/components/ConvexClientProvider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
