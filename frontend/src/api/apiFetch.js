export async function apiFetch(url, options = {}) {
  let accessToken = localStorage.getItem("accessToken");

  // REQUEST PERTAMA
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: `include`,
  });

  // 👇 INI LETAK IDEAL LOGIC REFRESH LOCAL STORAGE
  // if (res.status === 401) {
  //   const refreshToken = localStorage.getItem("refreshToken");

  //   console.log(refreshToken);

  //   const refreshRes = await fetch("http://localhost:5001/refresh", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ refreshToken }),
  //   });

  //   // refresh gagal → logout
  //   if (!refreshRes.ok) {
  //     localStorage.clear();
  //     console.log(`kembali ke login`);

  //     window.location.href = "/login";
  //     return;
  //   }

  //   const data = await refreshRes.json();
  //   localStorage.setItem("accessToken", data.accessToken);

  //   // 🔁 ULANG REQUEST AWAL
  //   res = await fetch(url, {
  //     ...options,
  //     headers: {
  //       ...options.headers,
  //       Authorization: `Bearer ${data.accessToken}`,
  //     },
  //   });
  // }

  if (res.status === 401) {
    const refreshRes = await fetch("http://localhost:5001/refresh", {
      method: "POST",
      credentials: "include",
    });

    // refresh gagal → logout
    if (!refreshRes.ok) {
      // localStorage.clear();
      localStorage.removeItem(`accessToken`);
      console.log(`kembali ke login`);
      // window.location.href = "/login";
      throw new Error("Session expired");
      // return;
    }

    const data = await refreshRes.json();
    localStorage.setItem("accessToken", data.accessToken);

    // 🔁 ULANG REQUEST AWAL
    res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${data.accessToken}`,
        credentials: "include",
      },
    });
  }

  return res;
}
