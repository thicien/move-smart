async function test() {
  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'MUGISHA',
        email: 'mugishathicien@gmail.com',
        phone: '0793331557',
        role: 'passenger',
        password: 'password'
      })
    });
    
    if (!res.ok) {
      const data = await res.json();
      console.log('Response error:', res.status, data);
    } else {
      const data = await res.json();
      console.log('Success:', data);
    }
  } catch (err) {
    console.log('Network error:', err.message);
  }
}
test();
