const { TariffSetting } = require('../models');

/**
 * Calculates the maximum legally permitted fare for a route based on RURA tariff configurations.
 * 
 * @param {string} routeType - The type of route ('Intracity', 'Intercity', 'Secondary')
 * @param {number} distanceKm - The distance in kilometers 
 * @returns {number} The maximum allowable fare rounded to nearest 50 RWF
 */
async function calculateMaxRuraFare(routeType, distanceKm) {
  if (!distanceKm || distanceKm <= 0) return 0;

  // Map route logic to Tariff Setting Categories
  let category = 'INTERCITY';
  if (routeType === 'Intracity') category = 'URBAN_KIGALI';
  if (routeType === 'Secondary') category = 'SECONDARY';

  let tariff = await TariffSetting.findOne({ where: { category } });
  
  if (!tariff) {
    // Fallback constants if db missing (to avoid breaking during migration)
    if (category === 'URBAN_KIGALI') tariff = { rate_per_km: 59.28, minimum_fare: 200 };
    else tariff = { rate_per_km: 41.58, minimum_fare: 0 };
  }

  // Base Calculation
  let calculatedFare = distanceKm * tariff.rate_per_km;

  // Urban flat minimum fare exception logic
  if (category === 'URBAN_KIGALI' && calculatedFare < tariff.minimum_fare) {
    calculatedFare = tariff.minimum_fare;
  }

  // Rounding Logic - RURA standard is rounding to nearest 50 RWF increment
  const finalFare = Math.round(calculatedFare / 50) * 50;

  return finalFare;
}

module.exports = { calculateMaxRuraFare };
