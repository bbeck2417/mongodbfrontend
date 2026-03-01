addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "login.html";

  const urlparam = new URLSearchParams(window.location.search);
  const songID = urlparam.get("id");

  const response = await fetch(
    "https://mongodbbackend-evmy.onrender.com/api/songs/" + songID,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (response.ok) {
    const song = await response.json();
    document.querySelector("h1").innerHTML = song.title;
    document.querySelector("div").innerHTML = `
      <h2>Title - ${song.title}</h2>
      <h2>Artist - ${song.artist}</h2>
      <h2>Release Date - ${song.releaseDate}</h2>
      <h2>Popularity - ${song.popularity}</h2>
    `;
  }
});
