import React, { useEffect } from "react";
import { SignUp } from "@clerk/nextjs";
import { GetServerSideProps } from "next";
import EmailForm from "../../components/EmailForm";
import Link from "next/link";
import { useRouter } from "next/router";

const OPEN = JSON.parse(process?.env?.NEXT_PUBLIC_FREE_ACCESS ?? "true");

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    if (OPEN) {
      router.replace("/");
    }
  }, []);

  if (OPEN) {
    return <></>;
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] h-full w-full flex items-center justify-center">
      <div className="w-full max-w-3xl mx-4 md:mx-10 lg:mx-0">
        <div className="flex flex-col w-full p-4 text-sm border rounded-lg shadow-md md:px-10 md:py-10 md:pb-8 bg-th-post border-th-border2 gap-y-4">
          <p>
            You can find more information or stay up to date with Everything
            development at{" "}
            <a
              target={"_blank"}
              rel={"noreferrer"}
              href="https://reddit.com/r/everything_gripe"
              className="text-th-link hover:text-th-linkHover hover:underline"
            >
              r/everything_gripe
            </a>
            .
          </p>
          <div className="pt-2 sm:py-6 sm:pb-2 md:py-10 md:pb-8">
            <EmailForm />
          </div>
          <Link
            className="w-full text-xs text-center md:text-sm text-th-textLight group "
            href="/sign-in"
          >
            Already have an account?{" "}
            <span className=" text-th-linkHover group-hover:text-th-link group-hover:underline">
              Sign in here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
