// handler from Finola's Challenge 14
const loginFormHandler = async (event) => {
  event.preventDefault();

  // get values from the login inputs
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  // console.log(username, password); //correct data is retrieved

  // if both fields have values, send POST request to API endpoint
  if (username && password) {
    try {
      const response = await fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-type": "application/json" },
      });

      if (response.ok) {
        // if request is successful, redirect to the "Blogs" page
        document.location.replace("/blogs");
      } else {
        alert(
          "Login failed. Please check your spelling, or sign up to Whirlwind."
        );
        console.error(response);
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
      console.error(err);
    }
  } else {
    alert("Please enter both a username and password");
    console.error("Username or password missing");
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);