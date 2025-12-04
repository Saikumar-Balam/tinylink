"use client";
import React from "react";

export default function DashboardTable({ links = [], onDelete, loading }) {
  return (
    <div className="overflow-x-auto bg-purple-50 rounded-xl shadow p-2">
      <table className="min-w-full">
        <thead className="bg-purple-100 text-purple-700">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-medium">Short Code</th>
            <th className="py-3 px-4 text-left text-sm font-medium">Target URL</th>
            <th className="py-3 px-4 text-left text-sm font-medium">Clicks</th>
            <th className="py-3 px-4 text-left text-sm font-medium">Last Clicked</th>
            <th className="py-3 px-4 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-sm text-gray-500">Loading...</td>
            </tr>
          ) : links.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-sm text-gray-500">No links yet.</td>
            </tr>
          ) : (
            links.map((link) => (
              <tr key={link.code} className="border-b hover:bg-purple-100">
                <td className="px-4 py-3 text-sm font-medium text-black">{link.code}</td>

                <td className="px-4 py-3 text-sm truncate max-w-xs text-black" title={link.target}>
                  <a href={link.target} target="_blank" rel="noreferrer" className="underline">
                    {link.target} 
                  </a>
                </td>

                <td className="px-4 py-3 text-sm text-black">{link.clicks ?? 0}</td>

                <td className="px-4 py-3 text-sm text-black">{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "-"}</td>

                <td className="px-4 py-3 text-sm space-x-2">
                  <button onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(`${window.location.origin}/${link.code}`);
                      alert("Copied: " + `${window.location.origin}/${link.code}`);
                    } catch (e) {
                      alert("Clipboard error");
                    }
                  }} className="px-3 py-1 bg-purple-600 text-white rounded text-xs">Copy</button>

                  <button onClick={() => { if (confirm(`Delete ${link.code}?`)) onDelete(link.code); }} className="px-3 py-1 bg-red-500 text-white rounded text-xs">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
