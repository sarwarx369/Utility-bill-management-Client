import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import API from "../api/Api";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ status: "all", type: "all", q: "" });
  const [refreshKey, setRefreshKey] = useState(0); // trigger refetch

  useEffect(() => {
    fetchBills();
    // eslint-disable-next-line
  }, [refreshKey]);

  async function fetchBills() {
    try {
      setLoading(true);
      setError(null);

      // build query params from filter
      const params = {};
      if (filter.status !== "all") params.status = filter.status;
      if (filter.type !== "all") params.type = filter.type;
      if (filter.q && filter.q.trim() !== "") params.search = filter.q.trim();

      // axios helper `api.get('/bills', { params })` expected
      const data = await API.get("/bills", { params });
      setBills(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this bill?")) return;
    try {
      await API.delete(`/bills/${id}`);
      // remove locally
      setBills((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  }

  function applyFilter(changes) {
    setFilter((f) => ({ ...f, ...changes }));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Bills</h2>
        <div className="flex gap-2">
          <Link
            to="/bills/new"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Add Bill
          </Link>
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="px-3 py-1 bg-slate-200 rounded"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* filters */}
      <div className="bg-white p-3 rounded shadow mb-4 flex flex-wrap gap-3 items-center">
        <select
          value={filter.status}
          onChange={(e) => applyFilter({ status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="all">All Status</option>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>

        <select
          value={filter.type}
          onChange={(e) => applyFilter({ type: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="all">All Types</option>
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
          <option value="water">Water</option>
          <option value="internet">Internet</option>
        </select>

        <input
          placeholder="Search notes or month..."
          value={filter.q}
          onChange={(e) => applyFilter({ q: e.target.value })}
          className="p-2 border rounded flex-1 min-w-[200px]"
        />

        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="px-3 py-2 bg-green-600 text-white rounded"
        >
          Apply
        </button>
      </div>

      {/* list */}
      {loading ? (
        <div>Loading bills...</div>
      ) : error ? (
        <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
      ) : bills.length === 0 ? (
        <div className="p-3 bg-white rounded text-slate-600">
          No bills found. Click "Add Bill" to create one.
        </div>
      ) : (
        <div className="grid gap-3">
          {bills.map((b) => (
            <div
              key={b._id}
              className="p-3 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">
                  {b.type} — ৳{b.amount}
                </div>
                <div className="text-sm text-slate-500">
                  {b.month} {b.year} • {b.status}
                </div>
                {b.notes && <div className="text-sm mt-1">{b.notes}</div>}
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/bills/edit/${b._id}`}
                  className="px-3 py-1 bg-yellow-400 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(b._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
