addEventListener("DOMContentLoaded", async () => {
  // 1. Added the # selector for the ID
  document.querySelector("#updateBtn").addEventListener("click", updateSong);

  const urlparam = new URLSearchParams(window.location.search);
  const songID = urlparam.get("id");

  const response = await fetch("https://mongodbbackend-evmy.onrender.com/api/songs/" + songID);

  if (response.ok) {
    let song = await response.json();
    document.querySelector("#songId").value = song._id;
    document.querySelector("#title").value = song.title;
    document.querySelector("#artist").value = song.artist;

    // 2. Fixed the property name from releasedDate to releaseDate
    document.querySelector("#released").value = song.releaseDate.substring(
      0,
      10,
    );

    document.querySelector("#popularity").value = song.popularity;
    document.querySelector("#genre").value = song.genre;
  }
});

addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:3100/api/songs");
  const songs = await response.json();

  let html = ``;
  for (let song of songs) {
    let songID = song._id;
    html += `<li>${song.title} - ${song.artist} - <a href="details.html?id=${songID}">Details</a> - <a href="edit.html?id=${songID}">Edit Song</a></li>`;
  }

  document.querySelector("#songs").innerHTML = html;
});

async function updateSong(event) {
  // 1. Grab the ID from the form field so we know which song to update
  const songId = document.querySelector("#songId").value;

  // 2. Create an object with the newly edited data from the form
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
    const response = await fetch(`http://localhost:3100/api/songs/${songId}`, {
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
      document.querySelector("#error").innerHTML =
        "Cannot update song. Please check your inputs.";
    }
  } catch (error) {
    console.error("Failed to fetch:", error);
    document.querySelector("#error").innerHTML =
      "Network error. Is the server running?";
  }
}
