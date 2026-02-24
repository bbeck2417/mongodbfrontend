addEventListener("DOMContentLoaded", async () => {
  document.querySelector("#addBtn").addEventListener("click", addSong);
});

// add song to database.. it has to be async function

async function addSong() {
  // create a song object to from the form to make inserting into database easier
  const song = {
    title: document.querySelector("#title").value,
    artist: document.querySelector("#artist").value,
    releaseDate: document.querySelector("#released").value,
    popularity: document.querySelector("#popularity").value,
    genre: document.querySelector("#genre").value
      ? document.querySelector("#genre").value.split(",")
      : [],
  };

  const response = await fetch("https://mongodbbackend-evmy.onrender.com/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  if (response.ok) {
    const results = await response.json();
    alert("added song with ID of " + results._id);

    //reset form after song is successfully added
    document.querySelector("form").reset();
  } else {
    document.querySelector("#error").innerHTML = "Cannot added song";
  }
}
