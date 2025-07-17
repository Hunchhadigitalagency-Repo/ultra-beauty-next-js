"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";



export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || !email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return;
    try {
      setStatus("loading");
      setTimeout(() => setStatus("done"), 1000); // simulate delay
    } catch {
      setStatus("error");
    }
  };

  return (

    <div className=" w-full flex flex-col  ">
      <div className="text-start sm:text-left space-y-1 bg-inherit">
        <h2 className="text-[18px] sm:text-2xl font-playfair font-semibold text-white">
          Subscribe to Get Offers and News
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col w-full mt-2">
        <div className="flex flex-row w-full gap-2">
          <Input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Eg: youremail@gmail.com"
            required
            className="bg-white text-black placeholder:text-gray-500 h-[35px] md:h-[45px] px-4 py-2 flex-1 w-full"
            style={{ borderRadius: "4px" }}
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="bg-primary text-white hover:bg-orange-500 h-[35px] md:h-[45px] px-2 py-1 w-[100px] gap-0"
            style={{ borderRadius: "4px" }}
          >
            {status === "loading" ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                Subscribing...
              </>
            ) : (
              <>
                <span className="text-[12px]">Subscribe</span> <Megaphone className="!w-6 !h-6   ml-1 text-white" />
              </>
            )}
          </Button>
        </div>

        <label className="flex items-start gap-2 text-xs text-white mt-4">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 shrink-0 rounded border-slate-300 text-primary focus:ring-primary"
          />
          Yes! I would like to receive communication by email.
        </label>
      </form>

      {status === "done" && (
        <p className="text-sm font-medium text-emerald-600">
          🎉 Subscribed! Check your inbox for a confirmation email.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-600">
          Something went wrong — please try again.
        </p>
      )}
    </div>
  );
}
