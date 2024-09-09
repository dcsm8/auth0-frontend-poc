"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<string | null>(null);

  const fetchProtectedMessage = async () => {
    try {
      const response = await fetch("/api/protected-message");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setMessage(JSON.stringify(data.user));
    } catch (error) {
      console.error("Error fetching protected message:", error);
      setMessage("Error fetching protected message");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <>
        <div>Signed in as {session.user?.email}</div>
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={fetchProtectedMessage}>Fetch Protected Message</button>
        {message && <div>Protected Message: {message}</div>}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
