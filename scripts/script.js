addEventListener("DOMContentLoaded", async () => {

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }


  const response = await fetch(
    "https://mongodbbackend-evmy.onrender.com/api/songs",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  const songs = await response.json();
  let html = ``;
  for (let song of songs) {
    let songID = song._id;
    html += `<li>${song.title} - ${song.artist} - <a href="details.html?id=${songID}">Details</a> - <a href="edit.html?id=${songID}">Edit Song</a></li>`;
  }
  document.querySelector("#songs").innerHTML = html;
});
