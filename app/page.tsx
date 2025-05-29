"use client";

import RecentParagraphs from "@/components/recent-paragraphs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="my-10">
      <div className="flex flex-col items-center justify-center space-y-7">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center">
          Make your English {" "}
          <span className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-light">eloquent</span>
        </h1>
        <p className="text-xs md:text-base lg:text-lg text-center max-w-4xl text-gray-600">
          A free and open-source tool to help you improve your English writing skills by constantly writing and rewriting in your personal digital notebook
        </p>
        <div className="flex items-center justify-center">
          <Button
            className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 text-lg font-light p-6 rounded shadow-lg transition duration-300 ease-in-out cursor-pointer"
            onClick={() => router.push("/add-paragraph")}
          >
            Get Started 
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            variant={"secondary"}
            className="ml-4 flex items-center justify-center text-lg font-light p-6 rounded shadow-lg transition duration-300 ease-in-out cursor-pointer"
            onClick={() => router.push("/about")}
          >
            Learn More
          </Button>
        </div>
      </div>

      <div>
        <RecentParagraphs />
      </div>
    </div>
  );
}
