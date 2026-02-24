import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-dark">
      <SignIn
        forceRedirectUrl="/studio"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-charcoal border border-charcoal-light",
          },
        }}
      />
    </div>
  );
}
