import { notFound } from "next/navigation";

export default async function StatsPage(props) {
  // ✅ MUST unwrap params like this
  const { code } = await props.params;

  if (!code) return notFound();

  const res = await fetch(`http://localhost:3000/api/links/${code}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const data = await res.json();

  return (
    <div style={{ padding: 20 }}>
      <h1>Stats for: {data.code}</h1>
      <p>Target: {data.target}</p>
      <p>Clicks: {data.clicks}</p>
    </div>
  );
}
