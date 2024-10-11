const signupFormHandler = async (event) => {
  event.preventDefault();

  // get values from the signup inputs
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // if both fields have values, send POST request to API endpoint (save user data)
  if (username && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
      // if request is successful, redirect to the blogs page ("Home")
      document.location.replace('/blogs'); //res.render('blogs') ?
    } else {
      alert(response.statusText);
    }
  } else {
    alert('Please enter information in all fields');
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
