addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "login.html";

  document.querySelector("#addBtn").addEventListener("click", addSong);
});

async function addSong() {
  const token = localStorage.getItem("token");
  const song = {
    title: document.querySelector("#title").value,
    artist: document.querySelector("#artist").value,
    releaseDate: document.querySelector("#released").value,
    popularity: document.querySelector("#popularity").value,
    genre: document.querySelector("#genre").value
      ? document.querySelector("#genre").value.split(",")
      : [],
  };

  const response = await fetch(
    "https://mongodbbackend-evmy.onrender.com/api/songs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(song),
    },
  );

  if (response.ok) {
    const results = await response.json();
    alert("Added song with ID: " + results._id);
    document.querySelector("form").reset();
  } else {
    document.querySelector("#error").innerHTML =
      "Unauthorized or invalid data.";
  }
}
