const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin-drb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// Endpoint lấy dữ liệu từ bảng tblmhe
app.get("/data", (req, res) => {
  const sql = "SELECT * FROM tblmhe";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint thêm dữ liệu vào bảng tblmhe
app.post("/api/data", (req, res) => {
  const {
    mahang,
    name,
    quycachloithep,
    khuonlodie,
    khuonsoiholder,
    sosoi,
    pitch,
    tieuchuan,
    thucte,
    doday,
    soi1,
    soi2,
    sodaycatduoc,
    chieudaicatlon,
    chieudaicatnho,
    tocdomaydun,
    tocdokeo,
  } = req.body;

  const sql =
    "INSERT INTO tblmhe (mahang, name, quycachloithep, khuonlodie, khuonsoiholder, sosoi, pitch, tieuchuan, thucte, doday, soi1, soi2, sodaycatduoc, chieudaicatlon, chieudaicatnho, tocdomaydun, tocdokeo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      mahang,
      name,
      quycachloithep,
      khuonlodie,
      khuonsoiholder,
      sosoi,
      pitch,
      tieuchuan,
      thucte,
      doday,
      soi1,
      soi2,
      sodaycatduoc,
      chieudaicatlon,
      chieudaicatnho,
      tocdomaydun,
      tocdokeo,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result && result.insertId) {
        res.json({
          message: "Data inserted successfully",
          id: result.insertId,
        });
      } else {
        res.status(500).json({ message: "Data inserted but no ID returned" });
      }
    }
  );
});

// Endpoint sửa dữ liệu trong bảng tblmhe bằng id
app.put("/api/data/:id", (req, res) => {
  const { id } = req.params;
  const {
    mahang,
    name,
    quycachloithep,
    khuonlodie,
    khuonsoiholder,
    sosoi,
    pitch,
    tieuchuan,
    thucte,
    doday,
    soi1,
    soi2,
    sodaycatduoc,
    chieudaicatlon,
    chieudaicatnho,
    tocdomaydun,
    tocdokeo,
  } = req.body;

  const sql =
    "UPDATE tblmhe SET mahang=?, name=?, quycachloithep=?, khuonlodie=?, khuonsoiholder=?, sosoi=?, pitch=?, tieuchuan=?, thucte=?, doday=?, soi1=?, soi2=?, sodaycatduoc=?, chieudaicatlon=?, chieudaicatnho=?, tocdomaydun=?, tocdokeo=? WHERE id = ?";

  db.query(
    sql,
    [
      mahang,
      name,
      quycachloithep,
      khuonlodie,
      khuonsoiholder,
      sosoi,
      pitch,
      tieuchuan,
      thucte,
      doday,
      soi1,
      soi2,
      sodaycatduoc,
      chieudaicatlon,
      chieudaicatnho,
      tocdomaydun,
      tocdokeo,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Data not found" });
      }
      res.json({ message: "Data updated successfully" });
    }
  );
});

// Endpoint xóa dữ liệu từ bảng tblmhe bằng id
app.delete("/api/data/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM tblmhe WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json({ message: "Data deleted successfully" });
  });
});

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  // Mã hóa mật khẩu bằng bcrypt
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Số lượt lặp để tạo salt

    // Thực hiện câu lệnh INSERT với hashedPassword
    const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    const values = [username, hashedPassword, role];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Error registering user" });
        return;
      }
      console.log("User registered successfully");
      res.status(200).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        "your_jwt_secret",
        { expiresIn: "1y" }
      );

      res.json({
        message: `Bạn đăng nhập bằng quyền ${user.role}`,
        role: user.role,
      });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
