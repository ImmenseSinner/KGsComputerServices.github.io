// Replace all your fetch calls with this
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const submitEnquiry = async (data: any) => {
  const res = await fetch(`${API_URL}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed");
  return res.json();
};