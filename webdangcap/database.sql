-- Khởi tạo Database
CREATE DATABASE IF NOT EXISTS veganfry_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE veganfry_db;

-- Bảng Món Ăn (dishes)
CREATE TABLE IF NOT EXISTS dishes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    image TEXT,
    description TEXT
);

-- Bảng Đơn Đặt Bàn (reservations)
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    guests VARCHAR(50) NOT NULL,
    note TEXT,
    total_amount INT DEFAULT 0,
    items_summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dữ liệu món ăn mẫu để test
INSERT INTO dishes (name, price, category, image, description) VALUES
('Pizza Hải Sản Phô Mai', 180000, 'snack', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop', 'Pizza đế giòn cùng tôm, mực tươi và phô mai Mozzarella.'),
('Salad Rau Củ Trộn', 85000, 'snack', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop', 'Rau củ hữu cơ thanh mát kèm sốt chanh dây chua ngọt tươi ngon.'),
('Cơm Chiên Thuần Chay', 95000, 'main', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop', 'Cơm chiên hạt ngọc thơm ngon phối hợp nấm và rau củ tươi.'),
('Trà Trái Cây Nhiệt Đới', 45000, 'drink', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop', 'Trà hoa quả giải nhiệt tự nhiên ngọt thanh sảng khoái.');
