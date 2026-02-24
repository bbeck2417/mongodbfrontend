addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("https://mongodbbackend-evmy.onrender.com/api/songs");
  const songs = await response.json();

  let html = ``;
  for (let song of songs) {
    let songID = song._id;
    // Added the 'id' right after the question mark on the edit link
    html += `<li>${song.title} - ${song.artist} - <a href="details.html?id=${songID}">Details</a> - <a href="edit.html?id=${songID}">Edit Song</a></li>`;
  }

  document.querySelector("#songs").innerHTML = html;
});
