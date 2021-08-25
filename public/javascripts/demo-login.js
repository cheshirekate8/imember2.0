window.addEventListener('DOMContentLoaded', (event) => {
  const demo = document.getElementById('demo')
  const password = document.getElementById('password')
  const email = document.getElementById('email')

  demo.addEventListener('click', (event) => {
    email.value = 'test@email.com'
    password.value = 'password'
  })
})
