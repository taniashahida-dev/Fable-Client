import { redirect } from "next/navigation";

export default function EditEbookFallbackPage() {
    redirect("/dashboard/writer/my-ebooks");
}