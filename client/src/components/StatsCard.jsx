function StatsCard({ title, value, status, trend, icon, color = "primary" }) {
  // Determine icon class based on trend
  const trendIcon = trend === "up" 
    ? "ri-arrow-up-line" 
    : trend === "down" 
      ? "ri-arrow-down-line" 
      : "ri-arrow-right-line";
  
  // Determine text color based on trend
  const trendColor = trend === "up" 
    ? "text-red-500" 
    : trend === "down" 
      ? "text-green-500" 
      : `text-${color}-500`;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 border-l-4 border-${color}-500`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-neutral-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold font-montserrat">{value}</h3>
          <p className={`text-sm ${trendColor}`}>
            <span className="flex items-center">
              <i className={`${trendIcon} mr-1`}></i> {status}
            </span>
          </p>
        </div>
        <div className={`h-16 w-16 flex items-center justify-center bg-${color}-50 rounded-full`}>
          <i className={`${icon} text-2xl text-${color}-500`}></i>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
