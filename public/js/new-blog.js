const newBlogFormHandler = async (event) => {
  event.preventDefault();

  // get values from the signup inputs
  const destination = document.querySelector("#destination").value.trim();
  const trip_rating = document.querySelector("#rating").value.trim();
  const budget = document.querySelector("#budget").value.trim();
  const lodging = document.querySelector("#lodging").value.trim();
  const activities = document.querySelector("#activities").value.trim();
  const experience = document.querySelector("#experience").value.trim();

  // if both fields have values, send POST request to API endpoint (save user data)
  if (
    destination &&
    trip_rating &&
    budget &&
    lodging &&
    activities &&
    experience
  ) {
    const response = await fetch("/api/blogs/", {
      method: "POST",
      body: JSON.stringify({
        destination,
        trip_rating,
        budget,
        lodging,
        activities,
        experience,
      }),
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      // if request is successful, redirect to the blogs page ("Home")
      document.location.replace("/blogs");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Please enter information in all fields");
  }
};

document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newBlogFormHandler);
