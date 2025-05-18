import { IoMdStar, IoMdStarOutline, IoMdStarHalf } from "react-icons/io";

export default function Rating({ stars, size = 20 }) {
  const ratingValue = Number(stars);

  // Calculate the number of full stars
  const fullStars = Math.floor(ratingValue);

  // A half star is needed if the decimal part is 0.5 or more
  const hasHalfStar = ratingValue - fullStars >= 0.5;

  // Calculate the number of empty (outline) stars needed
  // Total stars = 5
  // Number of stars rendered so far = fullStars + (hasHalfStar ? 1 : 0)
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Create an array to hold the star icons
  const starIcons = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starIcons.push(
      <IoMdStar
        key={`full-${i}`}
        style={{ fontSize: `${size}px` }}
        className="text-orange-400"
      />,
    );
  }

  // Add half star if needed
  if (hasHalfStar) {
    starIcons.push(
      <IoMdStarHalf
        key="half"
        style={{ fontSize: `${size}px` }}
        className="text-orange-400"
      />,
    );
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starIcons.push(
      <IoMdStarOutline
        key={`outline-${i}`}
        style={{ fontSize: `${size}px` }}
        className="text-orange-400"
      />,
    );
  }

  return <div className="flex items-center">{starIcons}</div>;
}
