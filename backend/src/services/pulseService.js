const cron = require('node-cron');
const { Bus, Booking, Alert, NationalMetric } = require('../models');

class PulseService {
  start() {
    // Run every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
      console.log('[Pulse Aggregator] Running national overview metrics calculation...');
      try {
        await this.calculateMetrics();
      } catch (error) {
        console.error('[Pulse Aggregator] Error calculating metrics:', error);
      }
    });
    
    // Also run once immediately on startup for testing/initialization
    setTimeout(() => {
      this.calculateMetrics().catch(err => console.error('[Pulse Aggregator] Initial run error:', err));
    }, 5000);
  }

  async calculateMetrics() {
    try {
      const activeBuses = await Bus.count({
        where: { status: 'active' }
      });

      const ticketsSold = await Booking.count();

      const activeHighAlerts = await Alert.count({
        where: {
          severity: 'High',
          status: 'active'
        }
      });

      const metric = await NationalMetric.create({
        total_active_buses: activeBuses,
        total_tickets_sold: ticketsSold,
        active_high_alerts: activeHighAlerts,
        timestamp: new Date()
      });

      console.log(`[Pulse Aggregator] Saved new metrics: Buses=${activeBuses}, Tickets=${ticketsSold}, Alerts=${activeHighAlerts}`);
      return metric;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PulseService();
