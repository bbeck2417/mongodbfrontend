addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "login.html";

  document.querySelector("#updateBtn").addEventListener("click", updateSong);

  const urlparam = new URLSearchParams(window.location.search);
  const songID = urlparam.get("id");

  const response = await fetch(
    "https://mongodbbackend-evmy.onrender.com/api/songs/" + songID,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (response.ok) {
    let song = await response.json();
    document.querySelector("#songId").value = song._id;
    document.querySelector("#title").value = song.title;
    document.querySelector("#artist").value = song.artist;
    document.querySelector("#release").value = song.releaseDate.substring(
      0,
      10,
    );
    document.querySelector("#popularity").value = song.popularity;
    document.querySelector("#genre").value = song.genre;
  }
});

async function updateSong() {
  const token = localStorage.getItem("token");
  const songId = document.querySelector("#songId").value;
  const updatedSong = {
    title: document.querySelector("#title").value,
    artist: document.querySelector("#artist").value,
    releaseDate: document.querySelector("#release").value,
    popularity: document.querySelector("#popularity").value,
    genre: document.querySelector("#genre").value
      ? document.querySelector("#genre").value.split(",")
      : [],
  };

  const response = await fetch(
    `https://mongodbbackend-evmy.onrender.com/api/songs/${songId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedSong),
    },
  );

  if (response.ok) {
    alert("Song updated successfully!");
    window.location.href = "index.html";
  } else {
    document.querySelector("#error").innerHTML = "Update failed.";
  }
}
