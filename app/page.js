"use client";
import React, { useEffect, useState } from "react";
import CreateLinkForm from "./components/CreateLinkForm";
import DashboardTable from "./components/DashboardTable";

export default function DashboardPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/links");
      if (!res.ok) {
        console.error("API error", res.status, await res.text());
        setLinks([]);
      } else {
        const data = await res.json();
        setLinks(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Fetch error", err);
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLinks(); }, []);

  const handleCreate = (newLink) => {
    // newLink from POST response; refresh or optimistically update
    fetchLinks();
  };

  const handleDelete = async (code) => {
    try {
      const res = await fetch(`/api/links/${encodeURIComponent(code)}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Delete failed");
        return;
      }
      setLinks(prev => prev.filter(l => l.code !== code));
    } catch (err) {
      console.error(err);
      alert("Delete error");
    }
  };

  return (
    <main className="min-h-screen bg-purple-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-700">TinyLink Dashboard</h1>
          <div>
            <button onClick={fetchLinks} className="px-4 py-2 bg-black border rounded">Refresh</button>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <CreateLinkForm onCreated={handleCreate} />
          <div className="bg-slate-200 p-4 rounded-lg shadow">
            <h2 className="font-semibold">Quick Info</h2>
            <p className="text-sm text-slate-600 mt-2">Create short links with optional custom codes. Codes must be 6-8 alphanumeric characters.</p>
          </div>
        </div>

        <DashboardTable links={links} loading={loading} onDelete={handleDelete} />
      </div>
    </main>
  );
}
