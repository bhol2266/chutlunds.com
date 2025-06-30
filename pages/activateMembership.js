import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { getDocs, collection, query, where } from "firebase/firestore";
import db from "../firebase";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { calculateDaysLeft, isMembershipActive } from "../config/utils";
import videosContext from '../context/videos/videosContext';


export default function ActivateMembership() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoActivating, setAutoActivating] = useState(true); // Start as true
  const [message, setMessage] = useState("🔄 Activating membership...");
  const [error, setError] = useState("");


  const context = useContext(videosContext);
  const { daysLeft, setDaysLeft, isMember, setIsMember } = context;


  useEffect(() => {

    if (!router.isReady) return;


    if (router.query.email == "undefined") {
      setAutoActivating(false);
    }

    const { email: queryEmail, code: queryCode } = router.query;
    if (queryEmail && queryCode) {
      setEmail(queryEmail);
      setActivationCode(queryCode);
      activateMembership(queryEmail, queryCode, true);
    } else {
      // No activation params, stop auto spinner and show form
      setAutoActivating(false);
    }
  }, [router.query]);



  const activateMembership = async (email, code, isAuto = false) => {
    setError("");
    setLoading(true);

    try {
      const q = query(
        collection(db, "memberships"),
        where("email", "==", email),
        where("activationCode", "==", code)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("❌ Invalid email or activation code.");
        setMessage("");
        setAutoActivating(false);
        setLoading(false);
        return;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      const now = new Date();
      const expiry = new Date(data.expiryDate);

      if (now > expiry) {
        setError("❌ Your membership has expired. Please purchase again.");
        setMessage("");
        setAutoActivating(false);
        setLoading(false);
        return;
      }

      // Set cookies
      setCookie("Membership", "true", { expires: expiry });
      setCookie("MemberEmail", data.email, { expires: expiry });
      setCookie("MemberName", data.name || "", { expires: expiry });
      setCookie("MembershipExpires", expiry.toISOString(), { expires: expiry });

      setMessage("✅ Membership activated successfully.");
      if (!isAuto) alert("✅ Your membership is successfully activated.");
      setDaysLeft(calculateDaysLeft());
      setIsMember(true)
      router.push("/");
    } catch (err) {
      console.error("Activation error:", err);
      setError("⚠️ An error occurred. Please try again later.");
      setMessage("");
      setAutoActivating(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    activateMembership(email, activationCode, true);
    setAutoActivating(true);

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Activate Membership</h1>

        {/* Spinner */}
        {autoActivating && (
          <div className="text-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-blue-600 font-medium">{message}</p>
          </div>
        )}

        {/* Show form only when auto activation is not running */}
        {!autoActivating && (
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
        )}

        {/* Show membership link if expired */}
        {!autoActivating &&
          error === "❌ Your membership has expired. Please purchase again." && (
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
