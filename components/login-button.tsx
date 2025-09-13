import { signIn } from "@/auth";
import { FaG } from "react-icons/fa6";

export const LoginGoogleButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        className="flex items-center justify-center gap-2 w-full bg-blue-700 text-white font-md py-3 px-6 text-base rounded-sm hover:bg-blue-600 cursor-pointer"
        type="button"
      >
        <FaG className="size-6" />
        Sign in with Google
      </button>
    </form>
  );
};
