import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function getLoggedInUser() {
    const { getUser } = getKindeServerSession()
    return await getUser()
}