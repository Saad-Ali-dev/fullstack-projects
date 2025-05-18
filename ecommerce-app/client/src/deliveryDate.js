const currentDate = new Date();

// Calculate Delivery Date (Current Date + 7 days)
const deliveryDate = new Date(currentDate.getTime());
deliveryDate.setDate(currentDate.getDate() + 7);

// Calculate Fastest Delivery Date (Current Date + 3 days)
const fastestDeliveryDate = new Date(currentDate.getTime());
fastestDeliveryDate.setDate(currentDate.getDate() + 3);

// Format Dates
const options = { weekday: "short", month: "short", day: "numeric" };
const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", options);
const formattedFastestDeliveryDate = fastestDeliveryDate.toLocaleDateString(
  "en-US",
  options,
);

export { formattedDeliveryDate, formattedFastestDeliveryDate };
