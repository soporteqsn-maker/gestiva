async function login() {
  const usuario = document.getElementById('usuario').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorBox = document.getElementById('loginError');

  errorBox.textContent = '';

  if (!usuario || !password) {
    errorBox.textContent = 'Ingrese usuario y contraseña';
    return;
  }

  try {
    const response = await fetch('api/auth/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, password })
    });

    const data = await response.json();

    if (!response.ok) {
      errorBox.textContent = data.error || 'Error de autenticación';
      return;
    }

    // Login correcto
    window.location.href = 'index.html';

  } catch (err) {
    errorBox.textContent = 'Error de conexión con el servidor';
  }
}
