import { redirect } from "next/navigation";

/** Stary URL — przekierowanie na /login */
export default function PanelLoginRedirect() {
  redirect("/login");
}
