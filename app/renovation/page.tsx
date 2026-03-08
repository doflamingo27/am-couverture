import { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { config } from "./config";

export const metadata: Metadata = {
  title: config.meta.title,
  description: config.meta.description,
};

export default function Page() {
  return <LandingPage config={config} />;
}
