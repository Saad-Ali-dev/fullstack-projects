import HeroSlider from "../components/home/HeroSlider";
import ProductBox from "../components/home/ProductBox";
import data from "../components/home/ProductProps.js";
import ProductCarousel from "../components/home/ProductCarousel.jsx";
import shoeImg1 from "../assets/shoe-img1.jpg";
import shoeImg2 from "../assets/shoe-img2.jpg";
import shoeImg3 from "../assets/shoe-img3.jpg";
import shoeImg4 from "../assets/shoe-img4.jpg";
import shoeImg5 from "../assets/shoe-img5.jpg";
import shoeImg6 from "../assets/shoe-img6.jpg";
import shoeImg7 from "../assets/shoe-img7.jpg";

const shoeProducts = [
  { id: "s1", imageUrl: shoeImg1, altText: "Elegant White Sneaker" },
  { id: "s2", imageUrl: shoeImg2, altText: "Sporty Running Shoe" },
  { id: "s3", imageUrl: shoeImg3, altText: "Casual Loafer" },
  { id: "s4", imageUrl: shoeImg4, altText: "Hiking Boot" },
  { id: "s5", imageUrl: shoeImg5, altText: "Classic Oxford" },
  { id: "s6", imageUrl: shoeImg6, altText: "Summer Sandal" },
  { id: "s7", imageUrl: shoeImg7, altText: "High Heel" },
];

export default function HomePage() {
  return (
    <>
      <div>
        <HeroSlider />
      </div>
      <div className="relative z-10 -mt-40 sm:-mt-48 md:-mt-72 lg:-mt-88">
        <div className="grid grid-cols-1 custom-grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-screen-xl mx-auto">
          {data.map((section) => (
            <ProductBox
              key={section.id}
              title={section.title}
              items={section.items}
              discoverMoreText={section.discoverMoreText}
              discoverMoreUrl={section.discoverMoreUrl}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <ProductCarousel
            title="Additional items to explore"
            items={shoeProducts}
            seeMoreLink="/shoes/all"
          />
        </div>
      </div>
    </>
  );
}
