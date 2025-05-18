export default function PriceDisplay({ product, context }) {
  //  Determine discount and listPrice based on product.offer
  let discountPercentage = 0;
  let calculatedListPrice = null;

  if (product.offer && product.offer.status && product.offer.percentage > 0) {
    discountPercentage = product.offer.percentage;
    // Calculate original list price: Price / (1 - DiscountPercentage/100)
    calculatedListPrice = product.price / (1 - product.offer.percentage / 100);
  } else if (product.listPrice) {
    // Fallback if offer is not present but listPrice is (for backward compatibility or other scenarios)
    if (product.price < product.listPrice) {
      discountPercentage = Math.round(
        ((product.listPrice - product.price) / product.listPrice) * 100,
      );
      calculatedListPrice = product.listPrice;
    }
  }

  let dollarSignSize = "text-sm";
  let priceSize = "text-2xl";
  let centsSize = "text-sm";
  let discountTextSize = "text-lg";
  let listPriceTextSize = "text-xs";

  if (context === "mobile") {
    dollarSignSize = "text-base";
    priceSize = "text-2xl";
    centsSize = "text-base";
    discountTextSize = "text-xl";
    listPriceTextSize = "text-sm";
  } else if (context === "desktop-info") {
    dollarSignSize = "text-xl";
    priceSize = "text-3xl";
    centsSize = "text-xl";
    discountTextSize = "text-2xl";
    listPriceTextSize = "text-sm";
  }

  return (
    <div className="mb-1">
      {/* Show discount percentage and current price */}
      {context !== "desktop-action" && discountPercentage > 0 && (
        <div className="flex items-baseline gap-2">
          <span className={`${discountTextSize} font-medium text-red-600`}>
            -{discountPercentage}%
          </span>
          <span className={`${priceSize} font-bold text-gray-900`}>
            <sup
              className={`${dollarSignSize} font-normal relative -top-0.5em`}
            >
              $
            </sup>
            {Math.floor(product.price)}
            <sup className={`${centsSize} font-normal relative -top-0.5em`}>
              {(product.price % 1).toFixed(2).substring(2)}
            </sup>
          </span>
        </div>
      )}

      {/* Show only current price (if no discount or in desktop-action context) */}
      {(context === "desktop-action" ||
        !(discountPercentage > 0 && context !== "desktop-action")) && (
        <span className={`${priceSize} font-bold text-gray-900`}>
          <sup className={`${dollarSignSize} font-normal relative -top-0.5em`}>
            $
          </sup>
          {Math.floor(product.price)}
          <sup className={`${centsSize} font-normal relative -top-0.5em`}>
            {(product.price % 1).toFixed(2).substring(2)}
          </sup>
        </span>
      )}

      {/* Show List Price if applicable */}
      {context !== "desktop-action" && calculatedListPrice && (
        <div className={`${listPriceTextSize} text-gray-500 mt-0.5`}>
          List Price:{" "}
          <span className="line-through">
            ${calculatedListPrice.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
}
