"use client";
import { useState } from "react";

export default function CreateLinkForm({ onCreated }) {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: url, code: alias || undefined })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Create failed");
      } else {
        setUrl("");
        setAlias("");
        onCreated && onCreated(data);
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-purple-200 p-4 rounded-lg shadow">
      <div className="mb-3">
        <label className="block text-sm text-black font-medium">Original URL</label>
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded text-black"
          placeholder="https://example.com/very/long/path"
        />
      </div>

      <div className="mb-3">
        <label className=" text-black block text-sm font-medium">Custom code (optional)</label>
        <input
          type="text"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded text-black"
          placeholder="abc123 (6-8 chars, letters & numbers)"
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-60">
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
}
