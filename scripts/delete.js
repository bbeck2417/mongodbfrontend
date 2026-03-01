const getBaseUrl = () => {
  return window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
    ? "http://localhost:3100/api"
    : "https://mongodbbackend-evmy.onrender.com/api";
};
async function deleteSong() {
  const token = localStorage.getItem("token"); // Retrieve the stored token
  const dropdown = document.querySelector("#songs");
  const id = dropdown.value;

  if (!id) {
    alert("Please select a song to delete.");
    return;
  }

  // Security check: redirect if token is missing
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(
      `${getBaseUrl()}/songs/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the DELETE request
        },
      },
    );

    if (response.ok) {
      alert("Song deleted successfully!");
      window.location.href = "index.html";
    } else if (response.status === 401) {
      alert("Session expired. Please log in again.");
      window.location.href = "login.html";
    } else {
      document.querySelector("#error").innerHTML =
        "Cannot delete song. You may not have permission.";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    document.querySelector("#error").innerHTML = "Server connection failed.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  // Guard clause: prevent access if not logged in
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const deleteBtn = document.querySelector("#deleteBtn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", deleteSong);
  }

  getAllSongs();
});

async function getAllSongs() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${getBaseUrl()}/songs`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Authorized GET request
        },
      },
    );

    if (response.ok) {
      const songs = await response.json();
      const urlparam = new URLSearchParams(window.location.search);
      const selectedID = urlparam.get("id"); // Get the ID from the URL

      const html = songs
        .map(
          (song) =>
            `<option value="${song._id}" ${song._id === selectedID ? "selected" : ""}>
          ${song.title} by ${song.artist}
        </option>`,
        )
        .join("");

      document.querySelector("#songs").innerHTML = html;
    } else if (response.status === 401) {
      window.location.href = "login.html";
    } else {
      document.querySelector("#error").innerHTML = "Cannot fetch songs";
    }
  } catch (error) {
    document.querySelector("#error").innerHTML = "Error connecting to API";
  }
}
