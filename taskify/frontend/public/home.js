let registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Make the fetch request
    let response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      console.log(await response.json());
    } else {
      console.log("User already exists");
    }
    // console.log(response.json().message);
  } catch (error) {
    console.error("Error:", error);
  }
});
