import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constant/url";
import getLoggedInUser from "@/lib/get-user";
import Link from "next/link";
import { redirect } from "next/navigation";

const PreDashboard = async () => {
    const user = await getLoggedInUser()
    if (!user) {
        redirect(`${BASE_URL}/register`)
    }

    return (
        <main className="flex justify-center mt-24">
            <Button className="p-6">
                <Link href={`/dashboard/${user.email}`}>
                    Go to my tickets
                </Link>
            </Button>
        </main>
    )
}

export default PreDashboard;