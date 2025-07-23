import techImg1 from "../../assets/tech-box-img1.jpg";
import techImg2 from "../../assets/tech-box-img2.jpg";
import techImg3 from "../../assets/tech-box-img3.jpg";
import techImg4 from "../../assets/tech-box-img4.jpg";
import homeImg1 from "../../assets/home-box-img1.jpg";
import homeImg2 from "../../assets/home-box-img2.jpg";
import homeImg3 from "../../assets/home-box-img3.jpg";
import homeImg4 from "../../assets/home-box-img4.jpg";
import kitchenImg1 from "../../assets/kitchen-box-img1.jpg";
import kitchenImg2 from "../../assets/kitchen-box-img2.jpg";
import kitchenImg3 from "../../assets/kitchen-box-img3.jpg";
import kitchenImg4 from "../../assets/kitchen-box-img4.jpg";
import gameBoxImg from "../../assets/Game-box.jpg";
import dressImg1 from "../../assets/dress-box-img1.jpg";
import dressImg2 from "../../assets/dress-box-img2.jpg";
import dressImg3 from "../../assets/dress-box-img3.jpg";
import dressImg4 from "../../assets/dress-box-img4.jpg";
import beautyImg1 from "../../assets/beauty-box-img1.jpg";
import beautyImg2 from "../../assets/beauty-box-img2.jpg";
import beautyImg3 from "../../assets/beauty-box-img3.jpg";
import beautyImg4 from "../../assets/beauty-box-img4.jpg";
import dadGiftBoxImg from "../../assets/dad-gift-box-img.jpg";
import accessoriesImg1 from "../../assets/accessories-img1.webp";
import accessoriesImg2 from "../../assets/accessories-img2.webp";
import accessoriesImg3 from "../../assets/accessories-img3.webp";
import accessoriesImg4 from "../../assets/accessories-img4.webp";

const data = [
  {
    id: 1,
    title: "Level up your beauty routine",
    items: [
      {
        id: 1,
        imageUrl: beautyImg1,
        caption: "Makeup",
        itemUrl: "/products/category/beauty",
      },
      {
        id: 2,
        imageUrl: beautyImg2,
        caption: "Grooming",
        itemUrl: "/products/category/beauty",
      },
      {
        id: 3,
        imageUrl: beautyImg3,
        caption: "Mirrors",
        itemUrl: "/products/category/beauty",
      },
      {
        id: 4,
        imageUrl: beautyImg4,
        caption: "Handbags",
        itemUrl: "/products/category/beauty",
      },
    ],
    discoverMoreText: "See more",
    discoverMoreUrl: "/products/category/beauty",
  },
  {
    id: 2,
    title: "Shop for your home essentials",
    items: [
      {
        id: 5,
        imageUrl: homeImg1,
        caption: "Home",
        itemUrl: "/products/category/home",
      },
      {
        id: 6,
        imageUrl: homeImg2,
        caption: "Dining",
        itemUrl: "/products/category/home",
      },
      {
        id: 7,
        imageUrl: homeImg3,
        caption: "Kitchen",
        itemUrl: "/products/category/home",
      },
      {
        id: 8,
        imageUrl: homeImg4,
        caption: "Home Storage",
        itemUrl: "/products/category/home",
      },
    ],
    discoverMoreText: "Discover more in Home",
    discoverMoreUrl: "/products/category/home",
  },
  {
    id: 3,
    title: "Top categories in Kitchen appliances",
    items: [
      {
        id: 9,
        imageUrl: kitchenImg1,
        caption: "Kitchen Cleaning",
        itemUrl: "/products/category/kitchen",
      },
      {
        id: 10,
        imageUrl: kitchenImg2,
        caption: "Cooker",
        itemUrl: "/products/category/kitchen",
      },
      {
        id: 11,
        imageUrl: kitchenImg3,
        caption: "Home Decor",
        itemUrl: "/products/category/kitchen",
      },
      {
        id: 12,
        imageUrl: kitchenImg4,
        caption: "Bedding",
        itemUrl: "/products/category/kitchen",
      },
    ],
    discoverMoreText: "Explore all products in Kitchen",
    discoverMoreUrl: "/products/category/kitchen",
  },
  {
    id: 4,
    title: "Get your game on",
    items: [
      {
        id: 13,
        imageUrl: gameBoxImg,
        caption: "Gaming",
        itemUrl: "/products/category/electronics",
      },
    ],
    discoverMoreText: "Shop Gaming",
    discoverMoreUrl: "/products/category/electronics",
  },
  {
    id: 6,
    title: "Mobile Accessories",
    items: [
      {
        id: 18,
        imageUrl: accessoriesImg1,
        caption: "Speakers",
        itemUrl: "/products/category/electronics",
      },
      {
        id: 19,
        imageUrl: accessoriesImg2,
        caption: "Earphones",
        itemUrl: "/products/category/electronics",
      },
      {
        id: 20,
        imageUrl: accessoriesImg3,
        caption: "Headphones",
        itemUrl: "/products/category/electronics",
      },
      {
        id: 21,
        imageUrl: accessoriesImg4,
        caption: "Mobiles",
        itemUrl: "/products/category/electronics",
      },
    ],
    discoverMoreText: "Shop Accessories",
    discoverMoreUrl: "/products/category/electronics",
  },
  {
    id: 5,
    title: "Shop deals in Fashion",
    items: [
      {
        id: 14,
        imageUrl: dressImg1,
        caption: "Jeans under $50",
        itemUrl: "/products/category/clothing",
      },
      {
        id: 15,
        imageUrl: dressImg2,
        caption: "Tops under $25",
        itemUrl: "/products/category/clothing",
      },
      {
        id: 16,
        imageUrl: dressImg3,
        caption: "Dresses under $30",
        itemUrl: "/products/category/clothing",
      },
      {
        id: 17,
        imageUrl: dressImg4,
        caption: "Shoes under $50",
        itemUrl: "/products/category/clothing",
      },
    ],
    discoverMoreText: "See all deals",
    discoverMoreUrl: "/products/category/clothing",
  },

  {
    id: 7,
    title: "Best Gifts for Dad",
    items: [
      {
        id: 22,
        imageUrl: dadGiftBoxImg,
        caption: "Gifts",
        itemUrl: "/products/category/electronics",
      },
    ],
    discoverMoreText: "See more",
    discoverMoreUrl: "/products/category/electronics",
  },
  {
    id: 8,
    title: "Elevate Your Electronics",
    items: [
      {
        id: 23,
        imageUrl: techImg1,
        caption: "Smartphones",
        itemUrl: "/products/category/electronics",
      },
      {
        id: 24,
        imageUrl: techImg2,
        caption: "Tablets",
        itemUrl: "/products/category/electronics",
      },
      {
        id: 25,
        imageUrl: techImg3,
        caption: "Gaming",
        itemUrl: "/products/category/electronics",
      },
      {
        id: 26,
        imageUrl: techImg4,
        caption: "Watches",
        itemUrl: "/products/category/electronics",
      },
    ],
    discoverMoreText: "Discover more",
    discoverMoreUrl: "/products/category/electronics",
  },
];

export default data;
