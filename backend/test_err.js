const axios = require('axios');
async function test() {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/bookings/schedules/search');
    console.log("Success", res.data);
  } catch (err) {
    console.error("Error from API:", err.response ? err.response.data : err.message);
  }
}
test();
