import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/",
});

const systemPrompt = `You are a helpful and professional AI assistant for "Amazon Clone," an e-commerce project. 
Your primary goal is to assist users with their shopping experience.
Your knowledge is based on the products available in this specific store.
- Be friendly, concise, and helpful.
- When a user asks about products, assume they are asking about products available on the Amazon Clone website.
- If you don't know the answer or if a query is outside the scope of an e-commerce assistant (e.g., personal advice, complex non-product questions), politely state that you can only help with questions about products and shopping on this site.
- Do not invent products or details. If you lack information, say so.
- You cannot process orders, manage accounts, or handle payments. You are an informational assistant only.
- The data about the products is in the following format, answer the question based on the data:

[
    {
      "name": "Samsung Galaxy S25 Ultra",
      "title": "SAMSUNG Galaxy S25 Ultra Cell Phone, 256GB AI Smartphone, Unlocked Android, AI Camera, Fast Processor, Long Battery Life, 2025, US 1 Yr Manufacturer Warranty, Titanium Whitesilver",
      "description": "MULTIPLE TASKS WITH ONE ASK: Streamline your day with an assistant that gets you. Ask it to Google search for a pet-friendly vegan restaurant nearby and text it to your friend— your Galaxy S25 Ultra handles multiple tasks with a single ask.\n\nSTART THE DAY SMARTER: Stay one step ahead with a phone that gives you the info you need before you even know you need it with Now Brief.\n\nREDUCE THE NOISE. REVEAL THE MAGIC: AI Camera with Audio Eraser lets you capture vibrant videos in low light and minimize unwanted noises so you can relive your favorite moments with fewer distractions.\n\nBRING OUT THE BEST IN EVERY FACE: Capture every portrait with clarity and confidence on the Galaxy S25 Ultra. The advanced portrait features adjust skin tones and preserve natural textures, giving every shot a polished, professional look.\n\nSWITCHING IS QUICK & EASY: With Smart Switch, you can move your pics, videos, music, apps, contacts and convos to their new home, safely and securely, in just a few simple steps.",
      "price": 1098.00,
      "category": ["Electronics", "Smartphone"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747155585/samsung-s25-ultra_htojhn.jpg",
        "https://res.cloudinary.com/durienvba/image/upload/v1747157520/samsung-s25-ultra-variants_b8llfl.jpg"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327232/t-1_szox3x.jpg",
      "brand": "Samsung",
      "attributes": {
        "screen": "6.9 inches QHD+ Dynamic AMOLED 2X",
        "resolution": "2960 x 1440 pixels",
        "cpuModel": "Snapdragon 8 Gen 4",
        "cpuSpeed": "3.3 GHz",
        "ram": "12GB",
        "storage": "256 GB",
        "os": "Android 15, One UI 7",
        "battery": "5000mAh",
        "rearCamera": "200MP Wide, 50MP UW, 10MP Tele",
        "frontCamera": "12MP",
        "charging": "45W Wired, 15W Wireless",
        "dimensions": "6.41 x 3.06 x 0.32 inches",
        "weight": "7.69 Ounces",
        "color": "Titanium Whitesilver"
      },
      "stock": 500,
      "ratings": {
        "avg": 4.5,
        "count": 810
      },
      "id": 1,
      "sales": 200,
      "keywords": [
        "Samsung",
        "Galaxy S25 Ultra",
        "Smartphone",
        "Android Phone",
        "S25",
        "Galaxy",
        "Mobile",
        "Phone",
        "New",
        "2025"
      ],
      "offer": {
        "status": true,
        "percentage": 16
      }
    },
    {
      "name": "iPhone 16 Pro Case",
      "title": "TORRAS Magnetic [Military Grade Drop Protection] for iPhone 16 Pro Case, [Stronger Magnets 2000N Force] Compatible with MagSafe Accessories, Translucent Matte Back, Slim Phone Cover 6.1 inch, Space Black",
      "description": "Compatibility: Designed for iPhone 16 Pro 6.1 inch.  Please check your phone model before purchasing.\nStronger Magnets:  Built-in stronger magnets with 2000N force, ensuring a secure connection with all MagSafe accessories.  Experience reliable wireless charging and easy attachment to wallets, stands, and other MagSafe products.\nMilitary-Grade Protection:  Certified by SGS, this case provides superior protection against drops and impacts. The 360° airbags and 4-ply cushioning structure disperse shock, safeguarding your device from accidental damage.\nSlim Profile & Comfortable Grip:  Despite its robust protection, the case maintains a slim and lightweight design. The ergonomic design and skin-friendly material offer a comfortable grip and prevent slips.\nTranslucent Matte Back: The translucent matte back showcases the beauty of your iPhone while resisting fingerprints and scratches.  The nano-coating keeps the case clean and pristine.",
      "price": 29.99,
      "category": ["Electronics", "Accessories", "Cell Phone Cases"],
      "images": [
        "https://m.media-amazon.com/images/I/61COLrdpX0L.AC_SX569.jpg",
        "https://m.media-amazon.com/images/I/71XGK8qGdBL.AC_SX679.jpg"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327231/t-2_xxztss.jpg",
      "brand": "TORRAS",
      "attributes": {
        "compatiblePhoneModels": "iPhone 16 Pro",
        "specialFeature": "Magnetic, Anti-Fingerprint, Wireless Charging Compatible",
        "material": "Thermoplastic Polyurethane",
        "color": "Space Black"
      },
      "stock": 1200,
      "ratings": {
        "avg": 4.8,
        "count": 2500
      },
      "id": 2,
      "sales": 950,
      "keywords": [
        "iPhone 16 Pro case",
        "MagSafe case",
        "protective case",
        "slim case",
        "magnetic case"
      ],
      "offer": {
        "status": true,
        "percentage": 10
      }
    },
    {
      "name": "Google Pixel 9 Pro XL",
      "title": "Google Pixel 9 Pro XL - Unlocked Android Smartphone - 128GB - Obsidian",
      "description": "The all-new Pixel 9 Pro XL.  It's everything you love about Pixel, and more. It has a powerful new processor, an even better camera, and all-day battery life.\n\nCamera: Capture stunning photos and videos with the Pixel 9 Pro XL's advanced camera system.  It features a 50MP main sensor, a 48MP telephoto lens, and a 12MP ultrawide lens.\n\nDisplay: The Pixel 9 Pro XL has a beautiful 6.7-inch LTPO OLED display with a 120Hz adaptive refresh rate.\n\nProcessor: The Pixel 9 Pro XL is powered by the Google Tensor G4 processor, which delivers incredible performance and efficiency.\n\nBattery: The Pixel 9 Pro XL has an all-day battery that can last up to 24 hours on a single charge.",
      "price": 999.00,
      "category": ["Electronics", "Smartphone"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747162405/google-pixel-9-pro-xl_qjn89q.jpg"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327232/t-3_tv54rw.jpg",
      "brand": "Google",
      "attributes": {
        "screen": "6.7-inch LTPO OLED",
        "resolution": "3120 x 1440 pixels",
        "cpuModel": "Google Tensor G4",
        "cpuSpeed": "2.8 GHz",
        "ram": "12GB",
        "storage": "128GB",
        "os": "Android 15",
        "battery": "5000mAh",
        "rearCamera": "50MP Wide, 48MP Telephoto, 12MP Ultrawide",
        "frontCamera": "12MP",
        "charging": "23W Wired, 23W Wireless",
        "dimensions": "6.4 x 3.0 x 0.35 inches",
        "weight": "7.4 ounces",
        "color": "Obsidian"
      },
      "stock": 300,
      "ratings": {
        "avg": 4.7,
        "count": 620
      },
      "id": 3,
      "sales": 180,
      "keywords": [
        "Google",
        "Pixel 9 Pro XL",
        "Smartphone",
        "Android Phone",
        "Pixel",
        "Google Phone"
      ],
      "offer": {
        "status": false,
        "percentage": 0
      }
    },
    {
      "name": "iPhone 12",
      "title": "Apple iPhone 12, 64GB, Black - Fully Unlocked (Renewed)",
      "description": "This product is inspected, tested, and cleaned, as necessary to be fully functional according to the Amazon Renewed standards. This product is in 'Excellent condition'. The screen has no blemishes. Cosmetically, this product has very light blemishes that are only noticeable when held less than 12 inches away. This product will be packaged with a generic charger and a SIM removal tool. Product may come in the original box.",
      "price": 279.00,
      "category": ["Electronics", "Smartphone"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747162527/iphone-12_ocv3tr.jpg",
        "https://res.cloudinary.com/durienvba/image/upload/v1747162528/iphone-12-variants_t6kser.jpg"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327232/t-4_yzcvhd.jpg",
      "brand": "Apple",
      "attributes": {
        "screen": "6.1-inch Super Retina XDR display",
        "resolution": "2532 x 1170 pixels",
        "cpuModel": "Apple A14 Bionic",
        "ram": "4GB",
        "storage": "64GB",
        "os": "iOS 17",
        "battery": "Up to 17 hours video playback",
        "rearCamera": "12MP Wide, 12MP Ultrawide",
        "frontCamera": "12MP",
        "charging": "20W Wired, 15W MagSafe wireless",
        "dimensions": "5.78 x 2.82 x 0.29 inches",
        "weight": "5.78 ounces",
        "color": "Black"
      },
      "stock": 2000,
      "ratings": {
        "avg": 4.5,
        "count": 7430
      },
      "id": 4,
      "sales": 1500,
      "keywords": [
        "Apple",
        "iPhone 12",
        "Smartphone",
        "iOS Phone",
        "iPhone"
      ],
      "offer": {
        "status": false,
        "percentage": 0
      }
    },
    {
      "name": "Samsung A16 5G",
      "title": "Samsung Galaxy A16 5G, 64GB, Black (Unlocked)",
      "description": "Upgrade your view to the 6.6-inch Infinity-V display of Galaxy A16 5G and see what you've been missing. Thanks to FHD+ technology, your everyday content looks sharp, crisp and clear.\n\nCombine Octa-core processing power with up to 4GB of memory for performance that doesn't quit. And save all you want with 64GB of internal storage.\n\nThe Galaxy A16 5G features a 50MP Main Camera for high-resolution photos. Expand the viewing angle with Ultra Wide Camera. Customize focus with Depth Camera, or get closer to the details with Macro Camera.\n\nA 5,000mAh battery lets you keep doing what you do, for hours on end.",
      "price": 249.99,
      "category": ["Electronics", "Smartphone"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747162782/samsung-a16-5g_ksb87m.jpg",
        "https://res.cloudinary.com/durienvba/image/upload/v1747162783/samsung-a16-5g-display_bwe9f3.jpg",
        "https://res.cloudinary.com/durienvba/image/upload/v1747162784/samsung-a16-5g-details_lyhmbg.jpg"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327232/t-5_gyf2he.jpg",
      "brand": "Samsung",
      "attributes": {
        "screen": "6.6-inch Infinity-V Display",
        "resolution": "1080 x 2408 pixels",
        "cpuModel": "Octa-core",
        "ram": "4GB",
        "storage": "64GB",
        "os": "Android 14",
        "battery": "5000mAh",
        "rearCamera": "50MP Main, 5MP Ultrawide, 2MP Depth",
        "frontCamera": "8MP",
        "charging": "15W Wired",
        "dimensions": "6.5 x 3.0 x 0.35 inches",
        "weight": "7.05 ounces",
        "color": "Black"
      },
      "stock": 1800,
      "ratings": {
        "avg": 4.3,
        "count": 920
      },
      "id": 5,
      "sales": 750,
      "keywords": [
        "Samsung",
        "Galaxy A16 5G",
        "Smartphone",
        "Android Phone",
        "A16",
        "5G Phone"
      ],
      "offer": {
        "status": true,
        "percentage": 5
      }
    },
    {
      "name": "Samsung Galaxy Z Fold 6",
      "title": "Samsung Galaxy Z Fold 6 5G, 256GB, Phantom Black, Unlocked",
      "description": "The most immersive smartphone experience yet. Unfold a bigger, more immersive screen that fits in your pocket. With a cover screen and an unfolded main screen, the Galaxy Z Fold 6 gives you two phones in one.\n\nMulti-task like never before.  Open up to three apps at once and use them side-by-side.  Drag and drop content between apps with ease.\n\nThe Galaxy Z Fold 6 has a powerful processor, plenty of storage, and long-lasting battery life to handle all your needs.",
      "price": 1799.99,
      "category": ["Electronics", "Smartphone"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747163283/samsung-galaxy-z-fold_sgwpfb.jpg",
        "https://res.cloudinary.com/durienvba/image/upload/v1747163283/samsung-galaxy-z-fold-6-variants_gngrcv.jpg"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327232/t-6_nycxdr.jpg",
      "brand": "Samsung",
      "attributes": {
        "screen": "7.6-inch Dynamic AMOLED 2X (Main), 6.2-inch (Cover)",
        "resolution": "2176 x 1812 (Main), 2316 x 904 (Cover)",
        "cpuModel": "Snapdragon 8 Gen 3",
        "cpuSpeed": "3.2 GHz",
        "ram": "12GB",
        "storage": "256GB",
        "os": "Android 15, One UI 7",
        "battery": "4400mAh",
        "rearCamera": "50MP Wide, 10MP Telephoto, 12MP Ultrawide",
        "frontCamera": "10MP (Cover), 4MP (Under Display)",
        "charging": "25W Wired, 15W Wireless",
        "dimensions": "6.11 x 2.64 x 0.63 inches (folded), 6.11 x 5.11 x 0.24 inches (unfolded)",
        "weight": "9.28 ounces",
        "color": "Phantom Black"
      },
      "stock": 250,
      "ratings": {
        "avg": 4.6,
        "count": 480
      },
      "id": 6,
      "sales": 120,
      "keywords": [
        "Samsung",
        "Galaxy Z Fold 6",
        "Foldable Phone",
        "Smartphone",
        "Android Phone",
        "Z Fold 6"
      ],
      "offer": {
        "status": true,
        "percentage": 12
      }
    },
    {
      "name": "iPhone 16 Pro",
      "title": "Apple iPhone 16 Pro, 256GB, Space Black, Unlocked",
      "description": "The iPhone 16 Pro.  It's the most advanced iPhone ever. It has a powerful new A18 Pro chip, a stunning Super Retina XDR display, and a Pro camera system that takes your photos and videos to the next level.\n\nDisplay: The iPhone 16 Pro has a beautiful 6.1-inch Super Retina XDR display with ProMotion technology and an always-on display.\n\nCamera: The Pro camera system on the iPhone 16 Pro includes a 48MP Main camera, a 12MP Telephoto camera, and a 12MP Ultra Wide camera.\n\nA18 Pro Chip: The A18 Pro chip delivers incredible performance and efficiency, powering everything from the advanced camera features to the immersive augmented reality experiences.",
      "price": 1199.00,
      "category": ["Electronics", "Smartphone"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747164483/iphone-16-pro_jill6t.jpg",
        "https://res.cloudinary.com/durienvba/image/upload/v1747164483/iphone-16-pro-variants_xnqm58.jpg"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747164483/iphone-16-pro_jill6t.jpg",
      "brand": "Apple",
      "attributes": {
        "screen": "6.1-inch Super Retina XDR display",
        "resolution": "2556 x 1179 pixels",
        "cpuModel": "Apple A18 Pro",
        "ram": "8GB",
        "storage": "256GB",
        "os": "iOS 18",
        "battery": "Up to 29 hours video playback",
        "rearCamera": "48MP Main, 12MP Telephoto, 12MP Ultra Wide",
        "frontCamera": "12MP TrueDepth",
        "charging": "20W Wired, 15W MagSafe wireless",
        "dimensions": "5.77 x 2.81 x 0.32 inches",
        "weight": "7.81 ounces",
        "color": "Space Black"
      },
      "stock": 400,
      "ratings": {
        "avg": 4.8,
        "count": 975
      },
      "id": 7,
      "sales": 320,
      "keywords": [
        "Apple",
        "iPhone 16 Pro",
        "Smartphone",
        "iOS Phone",
        "iPhone"
      ],
      "offer": {
        "status": true,
        "percentage": 8
      }
    },
    {
      "name": "MacBook Air",
      "title": "Apple 15-inch MacBook Air with M3 chip - Space Gray",
      "description": "Supercharged by the M3 chip, the 15-inch MacBook Air combines incredible performance and up to 18 hours of battery life into a remarkably thin and light design.  The stunning Liquid Retina display supports a billion colors, and immersive audio from six speakers completes the experience.",
      "price": 1299.00,
      "category": ["Electronics", "Computers", "Laptops"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747164701/mac-book-air_wkwze8.png",
        "https://res.cloudinary.com/durienvba/image/upload/v1747164700/mac-book-air-variants_u3zoyl.png"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747164701/mac-book-air_wkwze8.png",
      "brand": "Apple",
      "attributes": {
        "screen": "15.3-inch Liquid Retina display",
        "resolution": "2880 x 1864 pixels",
        "cpuModel": "Apple M3 chip",
        "ram": "8GB",
        "storage": "256GB SSD",
        "graphics": "8-core GPU",
        "os": "macOS Sonoma",
        "battery": "Up to 18 hours",
        "dimensions": "13.40 x 9.35 x 0.45 inches",
        "weight": "3.3 pounds",
        "color": "Space Gray"
      },
      "stock": 350,
      "ratings": {
        "avg": 4.9,
        "count": 790
      },
      "id": 8,
      "sales": 280,
      "keywords": [
        "Apple",
        "MacBook Air",
        "Laptop",
        "M3 chip",
        "macOS",
        "Slim Laptop"
      ],
      "offer": {
        "status": false,
        "percentage": 0
      }
    },
    {
      "name": "Xiaomi Redmi Buds 6 Pro",
      "title": "Xiaomi Redmi Buds 6 Pro, Wireless Earbuds, Black",
      "description": "Redmi Buds 6 Pro. Immerse yourself in rich, detailed sound with these wireless earbuds.  Featuring advanced audio technology, active noise cancellation, and a comfortable fit, Redmi Buds 6 Pro are perfect for music, calls, and more.\n\nHi-Res Audio: Enjoy studio-quality sound with Hi-Res Audio certification.\n\nActive Noise Cancellation (ANC): Block out distractions and focus on your audio with powerful ANC.\n\nLong Battery Life: Get up to 9 hours of listening time on a single charge, and up to 36 hours with the charging case.",
      "price": 79.99,
      "category": ["Electronics", "Audio", "Headphones"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747164935/xiaomi-redmi-buds-6-pro_bl8xak.jpg"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327232/t-7_lv7zh2.jpg",
      "brand": "Xiaomi",
      "attributes": {
        "connectivity": "Bluetooth 5.4",
        "sound": "Hi-Res Audio",
        "noiseCancellation": "Active Noise Cancellation (ANC)",
        "waterResistance": "IP54",
        "batteryLife": "Up to 9 hours (earbuds), up to 36 hours (with case)",
        "charging": "USB-C"
      },
      "stock": 1000,
      "ratings": {
        "avg": 4.6,
        "count": 1200
      },
      "id": 9,
      "sales": 600,
      "keywords": [
        "Xiaomi",
        "Redmi Buds 6 Pro",
        "Wireless Earbuds",
        "Bluetooth Earbuds",
        "ANC Earbuds",
        "Hi-Res Audio"
      ],
      "offer": {
        "status": true,
        "percentage": 20
      }
    },
    {
      "name": "Xiaomi Redmi Watch 5 Active Smartwatch",
      "title": "Xiaomi Redmi Watch 5 Active Smartwatch, Black",
      "description": "The Redmi Watch 5 Active helps you track your fitness and stay connected. It features a large display, built-in GPS, heart rate monitoring, and a long-lasting battery.\n\nLarge Display: See your stats and notifications clearly on the vibrant 1.95\" display.\n\nBuilt-in GPS: Track your outdoor workouts accurately without your phone.\n\n24/7 Health Monitoring: Monitor your heart rate, sleep, and blood oxygen levels.\n\nLong Battery Life: Get up to 14 days of battery life on a single charge.",
      "price": 99.00,
      "category": ["Electronics", "Wearable Technology", "Smartwatches"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747165101/xiaomi-redmi-watch-5_wl0los.jpg",
        "https://res.cloudinary.com/durienvba/image/upload/v1747165102/xiaomi-redmi-watch-5-details_n3ipqt.jpg",
  "https://m.media-amazon.com/images/I/71t3tmleFAL.AC_SX425.jpg"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327233/t-8_zagt2k.jpg",
      "brand": "Xiaomi",
      "attributes": {
        "display": "1.95\" TFT display",
        "resolution": "320 x 384 pixels",
        "gps": "Built-in GPS",
        "heartRateMonitoring": "24/7 Heart Rate Monitoring",
        "sleepTracking": "Sleep Quality Analysis",
        "waterResistance": "5ATM",
        "batteryLife": "Up to 14 days",
        "connectivity": "Bluetooth 5.3"
      },
      "stock": 800,
      "ratings": {
        "avg": 4.4,
        "count": 950
      },
      "id": 10,
      "sales": 500,
      "keywords": [
        "Xiaomi",
        "Redmi Watch 5 Active",
        "Smartwatch",
        "Fitness Tracker",
        "GPS Watch",
        "Wearable"
      ],
      "offer": {
        "status": true,
        "percentage": 15
      }
    },
    {
      "name": "Gaming PC",
      "title": "Alarco Gaming PC Desktop Computer | AMD Ryzen 5 5600G | NVIDIA GeForce RTX 3050 | 16GB DDR4 3200MHz | 500GB NVMe SSD | WiFi | Windows 11",
      "description": "This Alarco gaming PC is designed for immersive gaming experiences. It features a powerful AMD Ryzen 5 5600G processor, NVIDIA GeForce RTX 3050 graphics card, and 16GB of fast DDR4 memory. The 500GB NVMe SSD provides lightning-fast storage, and the system comes with Windows 11 pre-installed.",
      "price": 799.99,
      "category": ["Electronics", "Computers", "Desktops"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747165358/gaming-pc_tvtcpk.webp"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327233/t-9_dgfjhs.jpg",
      "brand": "Alarco",
      "attributes": {
        "cpu": "AMD Ryzen 5 5600G",
        "graphics": "NVIDIA GeForce RTX 3050",
        "ram": "16GB DDR4 3200MHz",
        "storage": "500GB NVMe SSD",
        "operatingSystem": "Windows 11",
        "connectivity": "WiFi",
        "case": "Black Gaming Case"
      },
      "stock": 200,
      "ratings": {
        "avg": 4.3,
        "count": 320
      },
      "id": 11,
      "sales": 100,
      "keywords": [
        "Gaming PC",
        "Desktop Computer",
        "AMD Ryzen",
        "NVIDIA GeForce RTX",
        "Gaming Desktop",
        "Windows 11"
      ],
      "offer": {
        "status": true,
        "percentage": 10
      }
    },
    {
        "name": "Wireless Gaming Headset",
        "title": "Logitech G733 LIGHTSPEED Wireless Gaming Headset - Black",
        "description": "The Logitech G733 LIGHTSPEED Wireless Gaming Headset is designed for comfort and performance.  LIGHTSPEED wireless technology gives you pro-grade performance with up to 29 hours of battery life.  Soft dual-layer memory foam conforms to your head and contours around your face, reducing stress points and delivering long-lasting comfort.  Advanced features like LIGHTSYNC RGB lighting and Blue VO!CE microphone technology let you customize your look and sound amazing.",
        "price": 129.99,
        "category": ["Electronics", "Audio", "Headphones", "Gaming Headsets"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747165578/wireless-gaming-headset_dpli7n.webp"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327233/t-10_ge8nfo.jpg",
        "brand": "Logitech G",
        "attributes": {
            "connectivity": "LIGHTSPEED Wireless, 3.5 mm",
            "audio": "7.1 Surround Sound",
            "microphone": "Blue VO!CE",
            "batteryLife": "Up to 29 hours",
            "comfort": "Lightweight, Memory Foam Earcups",
            "lighting": "LIGHTSYNC RGB"
        },
        "stock": 400,
        "ratings": {
            "avg": 4.5,
            "count": 670
        },
        "id": 12,
        "sales": 250,
        "keywords": ["Wireless Gaming Headset", "Logitech G733", "Gaming Headset", "Wireless Headphones", "RGB Headset", "7.1 Surround Sound"],
        "offer": {
            "status": true,
            "percentage": 18
        }
    },
    {
        "name": "Amazon Echo Pop (new model)",
        "title": "Amazon Echo Pop | Full sound compact smart speaker with Alexa | Glacier White",
        "description": "Meet Echo Pop, a compact smart speaker with Alexa.  Small enough to fit in tight spaces, but powerful enough to deliver rich sound. Control your smart home with your voice and ask Alexa for help with anything from setting timers to playing music.",
        "price": 39.99,
        "category": ["Electronics", "Smart Speakers"],
        "images": ["https://m.media-amazon.com/images/I/71NiE-BNlFL.AC_SX425.jpg", "https://m.media-amazon.com/images/I/51BZYfCLNtL.AC_SX425.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327234/t-11_hwkfda.jpg",
        "brand": "Amazon",
        "attributes": {
            "voiceControl": "Alexa",
            "connectivity": "Wi-Fi, Bluetooth",
            "sound": "Full Sound",
            "smartHomeControl": "Yes",
            "size": "Compact"
        },
        "stock": 1500,
        "ratings": {
            "avg": 4.6,
            "count": 2800
        },
        "id": 13,
        "sales": 1200,
        "keywords": ["Amazon Echo Pop", "Echo Pop", "Smart Speaker", "Alexa Speaker", "Voice Control", "Smart Home"],
        "offer": {
            "status": true,
            "percentage": 25
        }
    },
    {
        "name": "PS5 Controller",
        "title": "Sony PlayStation 5 DualSense Wireless Controller - White",
        "description": "The DualSense wireless controller for PS5 offers immersive haptic feedback, dynamic adaptive triggers and a built-in microphone, all integrated into an iconic comfortable design.",
        "price": 74.99,
        "category": ["Electronics", "Video Games", "Accessories"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747165980/ps5-controller_deba0e.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327240/t-12_gelwkh.jpg",
        "brand": "Sony",
        "attributes": {
            "hapticFeedback": "Yes",
            "adaptiveTriggers": "Yes",
            "builtInMicrophone": "Yes",
            "connectivity": "Wireless, Bluetooth",
            "compatiblePlatform": "PlayStation 5"
        },
        "stock": 600,
        "ratings": {
            "avg": 4.7,
            "count": 1950
        },
        "id": 14,
        "sales": 800,
        "keywords": ["PS5 Controller", "DualSense Controller", "PlayStation 5", "Gaming Controller", "Wireless Controller"],
        "offer": {
            "status": false,
            "percentage": 0
        }
    },
    {
        "name": "Fossil Mens Nate Quartz Stainless Steel Chronograph",
        "title": "Fossil Men's Nate Quartz Stainless Steel Chronograph Watch, Color: Smoke",
        "description": "Bold, oversized design with a masculine edge. The Nate chronograph watch features a black dial with stick indices, three subdials and a smoke-tone stainless steel case and bracelet.",
        "price": 179.00,
        "category": ["Clothing, Shoes & Jewelry", "Watches", "Men's Watches"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747166112/fossil-mens-nate-quartz_tnh40q.jpg", "https://res.cloudinary.com/durienvba/image/upload/v1747166110/fossil-mens-close-lookup_skwz59.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327241/t-13_rdabpi.jpg",
        "brand": "Fossil",
        "attributes": {
            "caseSize": "50mm",
            "caseMaterial": "Stainless Steel",
            "bandMaterial": "Stainless Steel",
            "movement": "Quartz Chronograph",
            "waterResistance": "50 meters",
            "dialColor": "Black"
        },
        "stock": 300,
        "ratings": {
            "avg": 4.5,
            "count": 520
        },
        "id": 15,
        "sales": 150,
        "keywords": ["Fossil Watch", "Men's Watch", "Chronograph Watch", "Stainless Steel Watch", "Fossil Nate"],
         "offer": {
            "status": true,
            "percentage": 22
        }
    },
    {
      "name": "Gaming Laptop",
      "title": "ASUS ROG Strix SCAR 18 Gaming Laptop, 18\" Nebula Display, NVIDIA GeForce RTX 4090, Intel Core i9-14900HX, 32GB DDR5, 1TB SSD, Windows 11",
      "description": "The ROG Strix SCAR 18 is a powerful gaming laptop designed for high-performance gaming. It features an 18-inch Nebula display, an NVIDIA GeForce RTX 4090 graphics card, and an Intel Core i9 processor.",
      "price": 2999.00,
      "category": ["Electronics", "Computers", "Laptops", "Gaming Laptops"],
      "images": [
        "https://res.cloudinary.com/durienvba/image/upload/v1747166567/gaming-laptop_s0ehty.jpg"
      ],
      "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327241/t-14_pvwbne.jpg",
      "brand": "ASUS",
      "attributes": {
        "screen": "18-inch Nebula Display",
        "graphics": "NVIDIA GeForce RTX 4090",
        "cpu": "Intel Core i9-14900HX",
        "ram": "32GB DDR5",
        "storage": "1TB SSD",
        "os": "Windows 11"
      },
      "stock": 150,
      "ratings": {
        "avg": 4.9,
        "count": 270
      },
      "id": 16,
      "sales": 90,
      "keywords": [
        "Gaming Laptop",
        "ASUS ROG Strix SCAR 18",
        "RTX 4090 Laptop",
        "Intel i9 Laptop",
        "18 inch Laptop"
      ],
      "offer": {
        "status": true,
        "percentage": 15
      }
    },
    {
        "name": "Samsung Odyssey G9 Gaming Monitor",
        "title": "Samsung 49-Inch Odyssey G9 Gaming Monitor | Curved | Dual QHD | 240Hz | G-SYNC & FreeSync | LC49G95TSSNXZA",
        "description": "The Samsung Odyssey G9 gaming monitor is an ultra-wide, curved monitor designed for immersive gaming.  It features a 49-inch display with Dual QHD resolution, a 240Hz refresh rate, and support for both NVIDIA G-SYNC and AMD FreeSync.",
        "price": 1499.99,
        "category": ["Electronics", "Monitors"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747166567/samsung-odyssey-g9-gaming-monitor_rcjhay.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327241/t-15_gbaqtp.jpg",
        "brand": "Samsung",
        "attributes": {
            "screenSize": "49 inches",
            "resolution": "5120 x 1440 (Dual QHD)",
            "refreshRate": "240Hz",
            "responseTime": "1ms",
            "curveRadius": "1000R",
            "syncTechnology": "NVIDIA G-SYNC Compatible, AMD FreeSync Premium Pro",
            "panelType": "QLED"
        },
        "stock": 120,
        "ratings": {
            "avg": 4.6,
            "count": 210
        },
        "id": 17,
        "sales": 60,
        "keywords": ["Samsung Odyssey G9", "Gaming Monitor", "49 Inch Monitor", "Curved Monitor", "240Hz Monitor", "Dual QHD Monitor"],
        "offer": {
            "status": true,
            "percentage": 12
        }
    },
    {
        "name": "Longinnes Watch",
        "title": "Longines Spirit Automatic Chronometer 40mm, Blue Dial, Stainless Steel",
        "description": "The Longines Spirit collection celebrates the pioneering spirit of legendary aviators and explorers. This 40mm automatic chronometer watch features a blue dial, a stainless steel case, and a stainless steel bracelet.",
        "price": 3250.00,
        "category": ["Clothing, Shoes & Jewelry", "Watches", "Men's Watches"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747166872/longines-watch_l5vcde.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327242/t-16_ptilyj.jpg",
        "brand": "Longines",
        "attributes": {
            "caseSize": "40mm",
            "caseMaterial": "Stainless Steel",
            "bandMaterial": "Stainless Steel",
            "movement": "Automatic Chronometer",
            "dialColor": "Blue",
            "waterResistance": "100 meters"
        },
        "stock": 60,
        "ratings": {
            "avg": 4.8,
            "count": 95
        },
        "id": 18,
        "sales": 20,
        "keywords": ["Longines Watch", "Men's Watch", "Automatic Watch", "Chronometer Watch", "Luxury Watch", "Swiss Watch"],
        "offer": {
            "status": false,
            "percentage": 0
        }
    },
    {
        "name": "Longinnes Presence Automatic watch",
        "title": "Longines Presence Automatic 38.5mm, Silver Dial, Leather Strap",
        "description": "The Longines Presence collection embodies timeless elegance and classic design. This 38.5mm automatic watch features a silver dial, a stainless steel case, and a black leather strap.",
        "price": 2200.00,
        "category": ["Clothing, Shoes & Jewelry", "Watches", "Men's Watches"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747166871/longines-automatic-watch_knluzd.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327242/t-17_xgde6d.jpg",
        "brand": "Longines",
        "attributes": {
            "caseSize": "38.5mm",
            "caseMaterial": "Stainless Steel",
            "bandMaterial": "Leather",
            "movement": "Automatic",
            "dialColor": "Silver",
            "waterResistance": "30 meters"
        },
        "stock": 50,
        "ratings": {
            "avg": 4.7,
            "count": 80
        },
        "id": 19,
        "sales": 15,
        "keywords": ["Longines Watch", "Men's Watch", "Automatic Watch", "Leather Strap Watch", "Classic Watch", "Swiss Watch"],
        "offer": {
            "status": false,
            "percentage": 0
        }
    },
    {
        "name": "Mens Jeans",
        "title": "Levi's Men's 501 Original Fit Jeans",
        "description": "The original blue jeans since 1873. The Levi's 501 Original Fit Jeans are a classic, straight-leg style made from durable cotton denim. They sit at the waist and are regular through the thigh with a straight leg.",
        "price": 69.99,
        "category": ["Clothing, Shoes & Jewelry", "Clothing", "Men's Clothing", "Jeans"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747167267/mens-jeans_nsuil3.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327243/t-18_sefoqv.jpg",
        "brand": "Levi's",
        "attributes": {
            "fit": "Original Fit",
            "legStyle": "Straight Leg",
            "material": "100% Cotton",
            "rise": "Mid Rise",
            "closure": "Button Fly",
            "careInstructions": "Machine Wash"
        },
        "stock": 1000,
        "ratings": {
            "avg": 4.6,
            "count": 2300
        },
        "id": 20,
        "sales": 900,
        "keywords": ["Levi's Jeans", "Men's Jeans", "501 Jeans", "Original Fit Jeans", "Straight Leg Jeans", "Denim Jeans"],
        "offer": {
            "status": true,
            "percentage": 10
        }
    },
    {
        "name": "Women jeans",
        "title": "Levi's Women's 721 High Rise Skinny Jeans",
        "description": "The Levi's 721 High Rise Skinny Jeans are designed to flatter your figure with a sleek, skinny fit and a high rise that sits at the waist.  Made from soft and stretchy denim for all-day comfort.",
        "price": 59.99,
        "category": ["Clothing, Shoes & Jewelry", "Clothing", "Women's Clothing", "Jeans"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747167267/women-jeans_yw4kzi.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327247/t-19_xljcnu.jpg",
        "brand": "Levi's",
        "attributes": {
            "fit": "Skinny Fit",
            "rise": "High Rise",
            "material": "Various (see product description)",
             "legStyle": "Skinny Leg",
            "closure": "Zipper with button closure",
            "careInstructions": "Machine Wash"
        },
        "stock": 850,
        "ratings": {
            "avg": 4.4,
            "count": 1800
        },
        "id": 21,
        "sales": 700,
        "keywords": ["Levi's Jeans", "Women's Jeans", "721 Jeans", "High Rise Jeans", "Skinny Jeans", "Denim Jeans"],
        "offer": {
            "status": true,
            "percentage": 12
        }
    },
    {
        "name": "Women Shoes",
        "title": "Nike Revolution 6 Women's Running Shoes",
        "description": "The Nike Revolution 6 is all about versatility.  Designed with plush foam, it's great for walking and casual wear. Its lightweight knit material wraps your foot in breathable comfort.",
        "price": 65.00,
        "category": ["Clothing, Shoes & Jewelry", "Shoes", "Women's Shoes", "Athletic"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747167534/women-shoes_avvq55.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327248/t-20_whyv2k.jpg",
        "brand": "Nike",
        "attributes": {
            "style": "Running Shoe",
            "material": "Knit Upper, Rubber Sole",
            "closure": "Lace-Up",
            "cushioning": "Plush Foam",
            "activity": "Running, Walking"
        },
        "stock": 600,
        "ratings": {
            "avg": 4.5,
            "count": 1200
        },
        "id": 22,
        "sales": 500,
        "keywords": ["Nike Shoes", "Women's Running Shoes", "Running Shoes", "Athletic Shoes", "Nike Revolution 6"],
        "offer": {
            "status": false,
            "percentage": 0
        }
    },
    {
        "name": "Women Sketchers Shoes",
        "title": "Skechers Women's Go Walk Joy Walking Shoe",
        "description": "Get the ultimate in walking comfort with the Skechers GO WALK Joy. Features lightweight, responsive cushioning and a soft, breathable mesh upper.",
        "price": 55.00,
        "category": ["Clothing, Shoes & Jewelry", "Shoes", "Women's Shoes", "Walking Shoes"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747167532/women-sketchers_hheywp.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327248/t-21_xmwl5a.jpg",
        "brand": "Skechers",
        "attributes": {
            "style": "Walking Shoe",
            "material": "Mesh Upper, Synthetic Sole",
            "closure": "Slip-On",
             "cushioning": "Responsive 5Gen Cushioning",
            "activity": "Walking"
        },
        "stock": 750,
        "ratings": {
            "avg": 4.7,
            "count": 1500
        },
        "id": 23,
        "sales": 620,
        "keywords": ["Skechers Shoes", "Women's Walking Shoes", "Walking Shoes", "Comfort Shoes", "Skechers GO WALK"],
        "offer": {
            "status": true,
            "percentage": 18
        }
    },
    {
        "name": "Candle Warmer lamp",
        "title": "Candle Warmer Lamp, Black",
        "description": "This candle warmer lamp melts your favorite candles from the top down, releasing their fragrance without a flame.  It features an adjustable height and a sleek design.",
        "price": 39.99,
        "category": ["Kitchen", "Home", "Candle Accessories"],
        "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747167795/lamp_a3ttcm.jpg"],
        "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327248/t-22_ifdlbu.jpg",
        "brand": "Generic",
        "attributes": {
            "type": "Table Lamp",
            "material": "Metal",
            "color": "Black",
            "adjustableHeight": "Yes",
            "powerSource": "Electric"
        },
        "stock": 400,
        "ratings": {
            "avg": 4.4,
            "count": 820
        },
        "id": 24,
        "sales": 300,
        "keywords": ["Candle Warmer Lamp", "Candle Warmer", "Table Lamp", "Home Decor", "Candle Melting Lamp"],
        "offer": {
            "status": true,
            "percentage": 20
        }
    },
    {
          "name": "Knife Set",
          "title": "Cuisinart C77SS-15PK 15-Piece Stainless Steel Hollow Handle Block Set",
          "description": "This Cuisinart knife set includes a variety of high-quality stainless steel knives for all your kitchen needs.  The set comes with a stylish block for convenient storage.",
          "price": 79.99,
          "category": ["Kitchen", "Kitchen & Dining", "Home", "Knife Sets"],
          "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747168044/knife-set_wg8rcm.jpg"],
          "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327249/t-23_kclhkc.jpg",
          "brand": "Cuisinart",
          "attributes": {
              "material": "Stainless Steel",
              "pieces": "15",
              "handleType": "Hollow Handle",
              "blockMaterial": "Wood",
              "setIncludes": ["8\" Chef Knife", "8\" Slicing Knife", "5\" Santoku Knife", "5.5\" Serrated Utility Knife", "3.5\" Paring Knife", "Six 4.5\" Steak Knives", "8\" Sharpening Steel", "All-Purpose Household Shears"]
          },
          "stock": 300,
          "ratings": {
              "avg": 4.7,
              "count": 650
          },
          "id": 25,
          "sales": 250,
          "keywords": ["Cuisinart Knife Set", "Stainless Steel Knife Set", "15 Piece Knife Set", "Kitchen Knife Set", "Knife Block Set"],
          "offer": {
              "status": true,
              "percentage": 15
          }
      },
      {
          "name": "Home Bedding",
          "title": "Amazon Basics Microfiber Sheet Set, Queen, White",
          "description": "TheseAmazon Basics microfiber sheets offer a soft, comfortable, and affordable bedding solution.  The set includes a flat sheet, fitted sheet, and two pillowcases.",
          "price": 24.99,
          "category": ["Home", "Sheets & Pillowcases"],
          "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747168043/home-bedding_tmgf2j.jpg"],
          "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327252/t-24_ryrsdj.jpg",
          "brand": "Amazon Basics",
          "attributes": {
              "size": "Queen",
              "material": "100% Polyester Microfiber",
              "color": "White",
              "setIncludes": ["Flat Sheet", "Fitted Sheet", "2 Pillowcases"],
              "threadCount": "Not specified"
          },
          "stock": 2000,
          "ratings": {
              "avg": 4.4,
              "count": 3800
          },
          "id": 26,
          "sales": 1800,
          "keywords": ["Amazon Basics Sheets", "Microfiber Sheets", "Queen Sheet Set", "Bedding Set", "White Sheets"],
          "offer": {
              "status": false,
              "percentage": 0
          }
      },
      {
          "name": "Instant Pot Duo 7 (Cooker)",
          "title": "Instant Pot Duo 7-in-1 Electric Pressure Cooker, Slow Cooker, Steamer, Sauté, Yogurt Maker, Warmer, and Sterilizer, 6 Quart",
          "description": "The Instant Pot Duo is a versatile 7-in-1 kitchen appliance that functions as a pressure cooker, slow cooker, steamer, sauté pan, yogurt maker, warmer, and sterilizer.  This 6-quart model is perfect for families.",
          "price": 99.99,
          "category": ["Kitchen", "Kitchen & Dining", "Small Appliances", "Pressure Cookers"],
          "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747168380/cooker_o6uhly.jpg"],
          "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327252/t-25_gmnzdd.jpg",
          "brand": "Instant Pot",
          "attributes": {
              "capacity": "6 Quart",
              "functions": ["Pressure Cooker", "Slow Cooker", "Steamer", "Sauté", "Yogurt Maker", "Warmer", "Sterilizer"],
              "power": "1000 Watts",
              "material": "Stainless Steel",
              "controlMethod": "Digital"
          },
          "stock": 500,
          "ratings": {
              "avg": 4.8,
              "count": 1100
          },
          "id": 27,
          "sales": 420,
          "keywords": ["Instant Pot", "Pressure Cooker", "Multi Cooker", "7 in 1 Cooker", "Electric Pressure Cooker", "6 Quart Instant Pot"],
          "offer": {
              "status": true,
              "percentage": 10
          }
      },
      {
          "name": "Dinner set",
          "title": "Amazon Basics 16-Piece Kitchen Dinnerware Set, Service for 4, White",
          "description": "This Amazon Basics 16-piece dinnerware set provides service for four and includes dinner plates, salad plates, bowls, and mugs.  The classic white design complements any kitchen décor.",
          "price": 34.99,
          "category": ["Kitchen", "Kitchen & Dining", "Dinnerware & Serveware", "Dinnerware Sets"],
          "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747168377/dinner-set_vxnj9e.jpg"],
          "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327253/t-26_vmfgwd.jpg",
          "brand": "Amazon Basics",
          "attributes": {
              "pieces": "16",
              "serviceSize": "4",
              "color": "White",
              "material": "AB-Grade Porcelain",
              "dishwasherSafe": "Yes",
              "microwaveSafe": "Yes",
              "setIncludes": ["4 Dinner Plates", "4 Salad Plates", "4 Bowls", "4 Mugs"]
          },
          "stock": 800,
          "ratings": {
              "avg": 4.5,
              "count": 1600
          },
          "id": 28,
          "sales": 700,
          "keywords": ["Dinnerware Set", "16 Piece Dinnerware Set", "White Dinnerware Set", "Porcelain Dinnerware", "Amazon Basics Dinnerware"],
          "offer": {
              "status": false,
              "percentage": 0
          }
      },
      {
          "name": "Coffee Machine",
          "title": "Keurig K-Elite Coffee Maker, Single Serve K-Cup Pod Coffee Brewer, Brushed Slate",
          "description": "The Keurig K-Elite coffee maker brews single-serve K-Cup pods in under a minute. It features strong brew control, iced setting, and a large 75oz water reservoir.",
          "price": 189.99,
          "category": ["Kitchen", "Kitchen & Dining", "Coffee, Tea & Espresso", "Single-Serve Brewers"],
          "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747168381/coffee-machine_agddox.jpg"],
          "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327253/t-27_tpft6w.jpg",
          "brand": "Keurig",
          "attributes": {
              "type": "Single Serve Coffee Maker",
              "podCompatibility": "K-Cup Pods",
              "waterReservoirSize": "75 oz",
              "brewSizes": ["4 oz", "6 oz", "8 oz", "10 oz", "12 oz"],
              "specialFeatures": ["Strong Brew", "Iced Setting", "Hot Water On Demand"]
          },
          "stock": 250,
          "ratings": {
              "avg": 4.6,
              "count": 480
          },
          "id": 29,
          "sales": 200,
          "keywords": ["Keurig Coffee Maker", "Single Serve Coffee Maker", "K-Cup Brewer", "Coffee Machine", "Single Cup Coffee Maker"],
          "offer": {
              "status": true,
              "percentage": 8
          }
      },
      {
          "name": "Cisily Black Sponge Holder for Kitchen Sink",
          "title": "Cisily Black Sponge Holder for Kitchen Sink, 304 Stainless Steel Kitchen Sink Caddy",
          "description": "The Cisily sponge holder is a convenient and durable kitchen sink caddy made from 304 stainless steel. It provides a space-saving solution for storing your sponge, dish brush, and other sink essentials.",
          "price": 9.99,
          "category": ["Kitchen", "Kitchen & Dining", "Kitchen Storage & Organization", "Sink Organizers"],
          "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747168655/sponge-holder_o6xecj.jpg"],
          "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327253/t-28_eafvxv.jpg",
          "brand": "Cisily",
          "attributes": {
              "material": "304 Stainless Steel",
              "color": "Black",
              "mountingType": "Adhesive",
              "capacity": "Sponge, Brush, Dishcloth",
              "rustproof": "Yes"
          },
          "stock": 1200,
          "ratings": {
              "avg": 4.5,
              "count": 2100
          },
          "id": 30,
          "sales": 1000,
          "keywords": ["Sponge Holder", "Kitchen Sink Caddy", "Sink Organizer", "Stainless Steel Sponge Holder", "Dish Sponge Holder"],
          "offer": {
              "status": true,
              "percentage": 25
          }
      },
      {
          "name": "Kitchen Mats",
          "title": "Gorilla Grip Original Durable Anti-Fatigue Cushioned Comfort Mat, 2 Size Options, As Seen on TV, Extra Thick 3/4 Inch, Black",
          "description": "The Gorilla Grip anti-fatigue kitchen mat provides comfortable support while you stand.  Its durable construction and extra-thick cushioning help reduce fatigue and discomfort.  Available in multiple sizes and colors.",
          "price": 49.99,
          "category": ["Kitchen", "Kitchen & Dining", "Kitchen Rugs"],
          "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747168658/kitchen-mats_homnuo.jpg"],
          "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327253/t-29_opxbst.jpg",
          "brand": "Gorilla Grip",
          "attributes": {
              "material": "Foam",
              "thickness": "3/4 Inch",
              "sizeOptions":  ["20x32 Inch", "20x39 Inch"],
              "color": "Black",
              "antiSlip": "Yes",
              "waterResistant": "Yes"
          },
          "stock": 600,
          "ratings": {
              "avg": 4.6,
              "count": 1300
          },
          "id": 31,
          "sales": 550,
          "keywords": ["Kitchen Mat", "Anti-Fatigue Mat", "Comfort Mat", "Standing Mat", "Cushioned Kitchen Mat"],
          "offer": {
              "status": true,
              "percentage": 18
          }
      },
      {
          "name": "Under Eye Mask",
          "title": "16 Pairs Under Eye Mask for Dark Circles and Puffiness, 24K Gold Under Eye Patches",
          "description": "These 24K gold under eye masks help reduce the appearance of dark circles, puffiness, and wrinkles.  They are formulated with collagen and other nourishing ingredients to hydrate and rejuvenate the delicate skin under your eyes.",
          "price": 12.99,
          "category": ["Beauty", "Skin Care", "Eye Treatments", "Eye Masks"],
          "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747168848/eye-mask_p6n3kl.jpg"],
          "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327258/t-30_biym4q.jpg",
          "brand": "Generic",
          "attributes": {
              "quantity": "16 Pairs",
              "keyIngredients": ["24K Gold", "Collagen", "Hyaluronic Acid"],
              "skinType": "All Skin Types",
              "benefits": ["Reduce Dark Circles", "Reduce Puffiness", "Hydrating", "Anti-Wrinkle"]
          },
          "stock": 2000,
          "ratings": {
              "avg": 4.3,
              "count": 3200
          },
          "id": 32,
          "sales": 1700,
          "keywords": ["Under Eye Mask", "Eye Mask", "Gold Under Eye Mask", "Dark Circles Treatment", "Puffiness Treatment", "Eye Patches"],
          "offer": {
              "status": true,
              "percentage": 30
          }
      },
      {
          "name": "Mighty Patch pimple patch remover",
          "title": "Mighty Patch Original from Hero Cosmetics - Hydrocolloid Acne Pimple Patch for Covering Zits and Blemishes, Spot Treatment, Vegan and Cruelty Free",
          "description": "Mighty Patch is a hydrocolloid patch that visibly flattens pimples overnight.  It absorbs gunk and helps protect blemishes for faster healing. Drug-free, vegan, and cruelty-free.",
          "price": 12.99,
          "category": ["Beauty", "Skin Care", "Acne Treatments", "Pore Strips"],
          "images": ["https://res.cloudinary.com/durienvba/image/upload/v1747168846/mighty-patch_u93qbf.jpg"],
          "thumbnail": "https://res.cloudinary.com/durienvba/image/upload/v1747327231/t-31_o0qd0u.jpg",
          "brand": "Hero Cosmetics",
          "attributes": {
              "count": "36 Patches",
              "material": "Hydrocolloid",
              "skinType": "All Skin Types",
              "benefits": ["Pimple Spot Treatment", "Blemish Covering", "Absorbs Gunk"],
              "drugFree": "Yes",
              "vegan": "Yes",
              "crueltyFree": "Yes"
          },
          "stock": 1500,
          "ratings": {
              "avg": 4.6,
              "count": 2700
          },
          "id": 33,
          "sales": 1300,
          "keywords": ["Mighty Patch", "Pimple Patch", "Acne Patch", "Hydrocolloid Patch", "Zit Patch", "Blemish Patch"],
          "offer": {
              "status": true,
              "percentage": 20
          }
      }
  ]
  
`;

export const handleChat = async (req, res) => {
  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: "Messages are required" });
  }

  try {
    const systemMessage = {
      role: "system",
      content: systemPrompt,
    };

    // Prepend the system message to the conversation history
    const fullMessages = [systemMessage, ...messages];

    const stream = await openai.chat.completions.create({
      model: "gemini-2.0-flash-lite",
      messages: fullMessages,
      stream: true,
    });

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Stream the response
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(content);
      }
    }
    res.end();
  } catch (error) {
    console.error("Chatbot API Error:", error.message);
    res.status(500).end();
  }
};