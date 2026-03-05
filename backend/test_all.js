async function test() {
  const email = `test_${Date.now()}@example.com`;
  const password = 'mypassword';

  try {
    console.log('--- Registering ---');
    const regRes = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email,
        phone: '00000000',
        role: 'passenger',
        password
      })
    });
    
    const regData = await regRes.json();
    console.log(`Register status: ${regRes.status}`);
    console.log('Register response:', regData);

    console.log('\n--- Logging in ---');
    const logRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    });

    const logData = await logRes.json();
    console.log(`Login status: ${logRes.status}`);
    console.log('Login response:', logData);
  } catch (err) {
    console.log('Network error:', err.message);
  }
}
test();
