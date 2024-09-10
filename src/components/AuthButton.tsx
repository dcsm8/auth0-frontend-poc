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
      console.log(data);
      setMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error fetching protected message:", error);
      setMessage("Error fetching protected message");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    const sessionInfo = {
      ...session,
      expires: session.expires,
    };

    return (
      <div className="space-y-4">
        <div>Signed in as {session.user?.email}</div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchProtectedMessage}
        >
          Fetch Protected Message
        </button>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Session Information:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(sessionInfo, null, 2)}
          </pre>
        </div>
        {message && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Protected Message:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {message}
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      Not signed in <br />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
