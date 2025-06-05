// /pages/activateMembership.js
import { useState } from "react";
import { useRouter } from "next/router";
import { getDocs, collection, query, where } from "firebase/firestore";
import db from "../firebase";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { isMembershipActive } from "../config/utils";
import { useEffect } from "react";

export default function ActivateMembership() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const isActive = isMembershipActive();
    if (isActive) {
      router.push("/"); // Redirect to home or another page
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const q = query(
        collection(db, "memberships"),
        where("email", "==", email),
        where("activationCode", "==", activationCode)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid email or activation code.");
        setLoading(false);
        return;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      const now = new Date();
      const expiry = new Date(data.expiryDate);

      if (now > expiry) {
        setError("Your membership has expired. Please purchase again.");
        setLoading(false);
        return;
      }

      // Set cookies
      setCookie("Membership", "true", { expires: expiry });
      setCookie("MemberEmail", data.email, { expires: expiry });
      setCookie("MemberName", data.name || "", { expires: expiry });
      setCookie("MembershipExpires", expiry.toISOString(), { expires: expiry }); // 👈 Add this line


      alert("✅ Your membership is successfully activated.");
      router.reload();
    } catch (err) {
      console.error("Activation error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Activate Membership</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Activation Code</label>
            <input
              type="text"
              value={activationCode}
              onChange={(e) => setActivationCode(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Activating..." : "Activate"}
          </button>
        </form>

        {error === "Your membership has expired. Please purchase again." && (
          <div className="text-center mt-4">
            <p className="text-sm">Need a new membership?</p>
            <Link href="/membership" className="text-blue-600 underline">
              Go to Membership Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
