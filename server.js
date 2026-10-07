const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Đổi sang createPool để không bao giờ bị đứt kết nối trên Vercel
const db = mysql.createPool({
    host: 'brffs6egugzwtsf7pebj-mysql.services.clever-cloud.com',
    user: 'uq69gxzodybxdek4',
    password: 'o2T1GiAjT6DD1SiQiIBu',
    database: 'brffs6egugzwtsf7pebj',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ==========================================
// 1. API QUẢN LÝ THỰC ĐƠN (DISHES)
// ==========================================
app.get('/api/dishes', (req, res) => {
    db.query('SELECT * FROM dishes ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/dishes', (req, res) => {
    const { name, price, category, image, description } = req.body;
    const sql = 'INSERT INTO dishes (name, price, category, image, description) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, price, category, image, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Thêm món thành công', id: result.insertId });
    });
});

app.put('/api/dishes/:id', (req, res) => {
    const { name, price, category, image, description } = req.body;
    const sql = 'UPDATE dishes SET name=?, price=?, category=?, image=?, description=? WHERE id=?';
    db.query(sql, [name, price, category, image, description, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Cập nhật món thành công' });
    });
});

app.put('/api/reservations/:id/status', (req, res) => {
    const { status } = req.body;
    const sql = 'UPDATE reservations SET status = ? WHERE id = ?';
    db.query(sql, [status, req.params.id], (err, result) => {
        if (err) {
            console.error("Lỗi cập nhật trạng thái:", err);
            return res.status(500).json({ error: 'Lỗi CSDL' });
        }
        res.json({ message: 'Đã cập nhật trạng thái đơn' });
    });
});

app.delete('/api/dishes/:id', (req, res) => {
    db.query('DELETE FROM dishes WHERE id=?', [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Đã xóa món ăn' });
    });
});

// ==========================================
// 2. API QUẢN LÝ ĐẶT BÀN (RESERVATIONS)
// ==========================================
app.get('/api/reservations', (req, res) => {
    db.query('SELECT * FROM reservations ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/reservations', (req, res) => {
    const { fullname, phone, booking_date, booking_time, guests, note, total_amount, cartItems } = req.body;
    const cartItemsJson = cartItems ? JSON.stringify(cartItems) : '[]';
    
    const sql = 'INSERT INTO reservations (fullname, phone, booking_date, booking_time, guests, note, total_amount, cart_items) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [fullname, phone, booking_date, booking_time, guests, note, total_amount || 0, cartItemsJson], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Đặt bàn thành công', id: result.insertId });
    });
});

app.delete('/api/reservations/:id', (req, res) => {
    db.query('DELETE FROM reservations WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error("Lỗi xóa đơn:", err);
            return res.status(500).json({ error: 'Lỗi cơ sở dữ liệu khi xóa' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy đơn đặt bàn này' });
        }
        res.json({ message: 'Đã xóa đơn đặt bàn thành công' });
    });
});

// ==========================================
// CẤU HÌNH SERVERLESS CHO VERCEL
// ==========================================
module.exports = app;