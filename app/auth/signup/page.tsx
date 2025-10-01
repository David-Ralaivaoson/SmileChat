

import LogoSmile from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/utils/dark-mode-toogle";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import SignUpForm from "@/components/form/SignUpForm";

export default function Home() {



  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="relative z-10 flex justify-center items-center h-full px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex justify-center gap-6 items-center mb-6">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
                <LogoSmile/>
            </div>
            <ModeToggle/>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg text-center">
            Capturing Moments, Creating Memories
          </p>
          <SignUpForm/>
        </div>
      </div>
    </div>
  );
}
