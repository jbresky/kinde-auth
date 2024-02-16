'use client'

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";

const NavDrawer = ({ userPhoto }: { userPhoto: string }) => {
    return (
        <Drawer>
            <DrawerTrigger>
                <Image
                    className="rounded-full"
                    width={40}
                    height={40}
                    src={userPhoto}
                    alt="user profile avatar"
                    referrerPolicy="no-referrer"
                />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <Link href='/dashboard'>
                        <DrawerTitle className="pl-4">
                            Dashboard
                        </DrawerTitle>
                    </Link>
                    <LogoutLink>
                        <DrawerTitle className="pl-4">
                            Log out
                        </DrawerTitle>
                    </LogoutLink>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>

    )

}

export default NavDrawer;