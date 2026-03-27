import { viewport } from "next-sanity/studio";
import type { Metadata } from "next";

export { viewport };

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
