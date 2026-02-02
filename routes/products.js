var express = require('express');
var router = express.Router();

// Bộ dữ liệu gốc từ dự án của bạn
let data = [
  { "id": 3, "title": "Classic Heather Gray Hoodie", "slug": "classic-heather-gray-hoodie", "price": 69, "description": "Stay cozy and stylish with our Classic Heather Gray Hoodie...", "category": { "id": 1, "name": "Clothes" }, "images": ["https://i.imgur.com/cHddUCu.jpeg"] },
  { "id": 6, "title": "Classic Comfort Fit Joggers", "slug": "classic-comfort-fit-joggers", "price": 25, "description": "Discover the perfect blend of style and comfort...", "category": { "id": 1, "name": "Clothes" }, "images": ["https://i.imgur.com/ZKGofuB.jpeg"] },
  { "id": 7, "title": "Classic Comfort Drawstring Joggers", "slug": "classic-comfort-drawstring-joggers", "price": 79, "description": "Experience the perfect blend of comfort and style...", "category": { "id": 1, "name": "Clothes" }, "images": ["https://i.imgur.com/mp3rUty.jpeg"] },
  { "id": 8, "title": "Classic Red Jogger Sweatpants", "slug": "classic-red-jogger-sweatpants", "price": 98, "description": "Experience ultimate comfort with our red jogger sweatpants...", "category": { "id": 1, "name": "Clothes" }, "images": ["https://i.imgur.com/9LFjwpI.jpeg"] },
  { "id": 9, "title": "Classic Navy Blue Baseball Cap", "slug": "classic-navy-blue-baseball-cap", "price": 61, "description": "Step out in style with this sleek navy blue baseball cap...", "category": { "id": 1, "name": "Clothes" }, "images": ["https://i.imgur.com/R3iobJA.jpeg"] },
  { "id": 10, "title": "Classic Blue Baseball Cap", "slug": "classic-blue-baseball-cap", "price": 86, "description": "Top off your casual look with our Classic Blue Baseball Cap...", "category": { "id": 1, "name": "Clothes" }, "images": ["https://i.imgur.com/wXuQ7bm.jpeg"] },
  { "id": 11, "title": "Classic Red Baseball Cap", "slug": "classic-red-baseball-cap", "price": 35, "description": "Elevate your casual wardrobe with this timeless red baseball cap...", "category": { "id": 1, "name": "Clothes" }, "images": ["https://i.imgur.com/cBuLvBi.jpeg"] },
  { "id": 12, "title": "Classic Black Baseball Cap", "slug": "classic-black-baseball-cap", "price": 58, "description": "Elevate your casual wear with this timeless black baseball cap...", "category": { "id": 1, "name": "Clothes" }, "images": ["https://i.imgur.com/KeqG6r4.jpeg"] },
  { "id": 18, "title": "Sleek White & Orange Wireless Gaming Controller", "slug": "sleek-white-orange-wireless-gaming-controller", "price": 69, "description": "Elevate your gaming experience...", "category": { "id": 2, "name": "Electronics" }, "images": ["https://i.imgur.com/ZANVnHE.jpeg"] },
  { "id": 70, "title": "Iphone 18 Pro Max", "slug": "iphone-18-pro-max", "price": 1299, "description": "Add new IPhone product", "category": { "id": 2, "name": "Electronics" }, "images": ["https://api.escuelajs.co/api/v1/files/410c.jpg"] }
  // ... (Bạn có thể dán tiếp các phần tử còn lại vào đây)
];

/* 1. GET products listing với query: title, maxPrice, minPrice, slug */
// Ví dụ: http://localhost:3000/api/v1/products?title=Classic&minPrice=50&maxPrice=100
router.get('/', function(req, res, next) {
  const { title, maxPrice, minPrice, slug } = req.query;
  let filteredData = [...data];

  // title (includes): tìm kiếm chứa chuỗi, không phân biệt hoa thường
  if (title) {
    filteredData = filteredData.filter(item => 
      item.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  // maxPrice: lọc sản phẩm có giá <= maxPrice
  if (maxPrice) {
    filteredData = filteredData.filter(item => item.price <= Number(maxPrice));
  }

  // minPrice: lọc sản phẩm có giá >= minPrice
  if (minPrice) {
    filteredData = filteredData.filter(item => item.price >= Number(minPrice));
  }

  // slug (equal): lọc sản phẩm có slug khớp chính xác 100%
  if (slug) {
    filteredData = filteredData.filter(item => item.slug === slug);
  }

  res.json({
    success: true,
    count: filteredData.length,
    data: filteredData
  });
});

/* 2. GET product by ID */
// Ví dụ: http://localhost:3000/api/v1/products/18
router.get('/:id', function(req, res, next) {
  const id = Number(req.params.id);
  const product = data.find(item => item.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Không tìm thấy sản phẩm với id này"
    });
  }

  res.json({
    success: true,
    data: product
  });
});

module.exports = router;