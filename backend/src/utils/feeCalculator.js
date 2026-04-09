exports.calculateFees = (totalAmount) => {
  if (!totalAmount || isNaN(totalAmount)) return { systemRevenue: 0, companyShare: 0 };
  
  const SystemRevenue = totalAmount * 0.05;
  const CompanyShare = totalAmount - SystemRevenue;
  
  return {
    systemRevenue: SystemRevenue,
    companyShare: CompanyShare
  };
};
