document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm");
  const errorDiv = document.querySelector("#error");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.querySelector("#username").value;
      const password = document.querySelector("#password").value;

      try {
        const response = await fetch(
          "https://mongodbbackend-evmy.onrender.com/api/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          },
        );

        if (response.ok) {
          const data = await response.json();
          // Store the token for future requests
          localStorage.setItem("token", data.token);
          window.location.href = "index.html";
        } else {
          errorDiv.textContent = "Invalid username or password.";
        }
      } catch (err) {
        errorDiv.textContent = "Server connection failed.";
      }
    });
  }
});
