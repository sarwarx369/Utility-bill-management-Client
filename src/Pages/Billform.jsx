import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";

export default function BillForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    type: "electricity",
    amount: "",
    month: "",
    year: new Date().getFullYear(),
    status: "unpaid",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchBill();
    }
    // eslint-disable-next-line
  }, [id]);

  async function fetchBill() {
    try {
      setLoading(true);
      const data = await api.get(`/bills/${id}`);
      setForm(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEdit) {
        await api.put(`/bills/${id}`, form);
        alert("Bill updated successfully!");
      } else {
        await api.post("/bills", form);
        alert("Bill created successfully!");
      }
      navigate("/bills");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Bill" : "Add New Bill"}
      </h2>

      {error && <div className="p-2 bg-red-100 text-red-700 mb-3">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
          <option value="water">Water</option>
          <option value="internet">Internet</option>
        </select>

        <input
          type="number"
          placeholder="Amount (৳)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <input
          placeholder="Month (e.g. January)"
          value={form.month}
          onChange={(e) => setForm({ ...form, month: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>

        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Saving..." : isEdit ? "Update Bill" : "Save Bill"}
        </button>
      </form>
    </div>
  );
}
