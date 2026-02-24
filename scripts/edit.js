addEventListener("DOMContentLoaded", async () => {
  // Bind the button click
  document.querySelector("#updateBtn").addEventListener("click", updateSong);

  const urlparam = new URLSearchParams(window.location.search);
  const songID = urlparam.get("id");

  // Fetch the specific song from RENDER
  const response = await fetch("https://mongodbbackend-evmy.onrender.com/api/songs/" + songID);

  if (response.ok) {
    let song = await response.json();
    document.querySelector("#songId").value = song._id;
    document.querySelector("#title").value = song.title;
    document.querySelector("#artist").value = song.artist;

    // Fixed selector to match your HTML (no 'd' on #release)
    document.querySelector("#release").value = song.releaseDate.substring(0, 10);

    document.querySelector("#popularity").value = song.popularity;
    document.querySelector("#genre").value = song.genre;
  }
});

async function updateSong(event) {
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

  try {
    // FIXED: Now pointing to RENDER instead of localhost
    const response = await fetch(`https://mongodbbackend-evmy.onrender.com/api/songs/${songId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSong),
    });

    if (response.ok) {
      alert("Song updated successfully!");
      window.location.href = "index.html";
    } else {
      document.querySelector("#error").innerHTML = "Cannot update song. Please check your inputs.";
    }
  } catch (error) {
    console.error("Failed to fetch:", error);
    document.querySelector("#error").innerHTML = "Network error. Is the server running?";
  }
}
