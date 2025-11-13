import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/Api";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // optional: fetch latest profile from API (/users/me)
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await API.get("/users/me"); // ✅ get response
        setProfile(res.data); // ✅ use res.data
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="p-2 bg-red-100 text-red-700 mb-3">{error}</div>
      ) : (
        <>
          <div className="mb-3">
            <div className="text-sm text-slate-500">Name</div>
            <div className="font-medium">{profile?.name || "—"}</div>
          </div>

          <div className="mb-3">
            <div className="text-sm text-slate-500">Email</div>
            <div className="font-medium">{profile?.email || "—"}</div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={logout}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
