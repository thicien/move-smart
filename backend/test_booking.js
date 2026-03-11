async function run() {
  const fetchApi = async (url, method, body, token) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`http://localhost:5000/api${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
    return data;
  };

  try {
    console.log('--- Auth ---');
    const adminRes = await fetchApi('/auth/login', 'POST', { email: 'admin@gov.rw', password: 'password' });
    const adminToken = adminRes.token;

    const compRes = await fetchApi('/auth/login', 'POST', { email: 'admin@gmail.com', password: 'password' });
    const compToken = compRes.token;
    const compId = compRes.user.id;

    const passRes = await fetchApi('/auth/login', 'POST', { email: 'mugishathicien@gmail.com', password: 'password' });
    const passToken = passRes.token;

    console.log('--- Admin setup route ---');
    let route;
    try {
      await fetchApi('/admin/routes', 'POST', {
        code: 'TEST-' + Date.now(),
        name: 'Test Route',
        origin: 'Kigali',
        destination: 'Huye',
        distance: 100,
        estimated_duration: 120,
        base_fare: 3000,
        min_fare: 2000,
        max_fare: 4000,
        tax_percentage: 5
      }, adminToken);
    } catch(e) { console.log('Route create err:', e.message); }

    const routes = await fetchApi('/admin/routes', 'GET', null, adminToken);
    route = routes[0];

    console.log('--- Company setup bus & schedule ---');
    let busRes;
    try {
      busRes = await fetchApi('/companies/buses', 'POST', {
        company_id: compId,
        license_plate: 'RAB' + Date.now(),
        capacity: 30,
        route_id: route.id,
        seat_price: 3500
      }, compToken);
    } catch(e) { console.log('Bus creation error:', e.message); }

    const schedRes = await fetchApi('/companies/schedules', 'POST', {
      bus_id: busRes?.bus?.id || 1,
      route_id: route.id,
      departure_time: new Date(Date.now() + 86400000),
      arrival_time: new Date(Date.now() + 86400000 + 7200000),
      price: 3500,
      available_seats: 30
    }, compToken);
    const schedule = schedRes.schedule;

    console.log('--- Passenger booking ---');
    const bookRes = await fetchApi('/bookings', 'POST', {
      schedule_id: schedule.id,
      seat_number: '1, 2, 3',
      amount: 10500,
      method: 'momo'
    }, passToken);
    
    console.log('Booking successful. Tax amount:', bookRes.payment.tax_amount);

    console.log('--- Checking Dashboards ---');
    const adminStats = await fetchApi('/admin/dashboard-stats', 'GET', null, adminToken);
    console.log('Admin Stats:', adminStats);

    const compStats = await fetchApi(`/companies/${compId}/dashboard-stats`, 'GET', null, compToken);
    console.log('Company Stats:', compStats);

    console.log('TEST PASSED!');
  } catch (error) {
    console.error('TEST FAILED:', error.message);
  }
}

run();
