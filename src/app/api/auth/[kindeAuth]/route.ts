import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { options } from "./options";

const handler = handleAuth(options);

export { handler as GET }


