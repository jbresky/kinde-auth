'use client'

import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const RegisterComponentLink = () => {
    return (
            <RegisterLink>
                <Button className="p-6">
                    Sign Up for free
                </Button>
            </RegisterLink>
    );
}

export default RegisterComponentLink;