const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: "sa",
  password: "12345",
  server: "localhost",
  database: "admin-drb",
  options: {
    enableArithAbort: true,
    encrypt: false 
  },
};

let pool;

const connectSQL = async () => {
  try {
    pool = await sql.connect(config);
    console.log("Connected to SQL Server database.");
  } catch (err) {
    console.error("Error connecting to SQL Server:", err);
  }
};

connectSQL();

const checkSQLConnection = (req, res, next) => {
  if (!pool) {
    return res.status(500).json({ message: 'SQL Server connection not established' });
  }
  next();
};

app.get("/data", checkSQLConnection, async (req, res) => {
  try {
    const result = await pool.request().query("SELECT * FROM tblmhe");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send(err);
  }
});

app.post('/register', checkSQLConnection, async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const checkUser = await pool.request().query`SELECT * FROM users WHERE username = ${username}`;
    if (checkUser.recordset.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword)
      .input('role', sql.VarChar, role)
      .query`
        INSERT INTO users (username, password, role)
        VALUES (@username, @password, @role)
      `;

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post("/api/data", checkSQLConnection, (req, res) => {
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

  // Check if mahang already exists
  const checkQuery = "SELECT COUNT(*) AS count FROM tblmhe WHERE mahang = @mahang";

  const checkRequest = pool.request();
  checkRequest.input('mahang', sql.Int, mahang);

  checkRequest.query(checkQuery, (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking mahang existence:', checkErr);
      return res.status(500).send(checkErr);
    }

    const { count } = checkResult.recordset[0];

    if (count > 0) {
      // mahang already exists, return error
      return res.status(400).json({ message: `Mahang '${mahang}' already exists` });
    } else {
      // mahang does not exist, proceed with INSERT
      const insertQuery =
        "INSERT INTO tblmhe (mahang, name, quycachloithep, khuonlodie, khuonsoiholder, sosoi, pitch, tieuchuan, thucte, doday, soi1, soi2, sodaycatduoc, chieudaicatlon, chieudaicatnho, tocdomaydun, tocdokeo) " +
        "VALUES (@mahang, @name, @quycachloithep, @khuonlodie, @khuonsoiholder, @sosoi, @pitch, @tieuchuan, @thucte, @doday, @soi1, @soi2, @sodaycatduoc, @chieudaicatlon, @chieudaicatnho, @tocdomaydun, @tocdokeo)";

      const insertRequest = pool.request();
      insertRequest.input('mahang', sql.Int, mahang);
      insertRequest.input('name', sql.VarChar, name);
      insertRequest.input('quycachloithep', sql.VarChar, quycachloithep);
      insertRequest.input('khuonlodie', sql.VarChar, khuonlodie);
      insertRequest.input('khuonsoiholder', sql.VarChar, khuonsoiholder);
      insertRequest.input('sosoi', sql.Int, sosoi);
      insertRequest.input('pitch', sql.VarChar, pitch);
      insertRequest.input('tieuchuan', sql.VarChar, tieuchuan);
      insertRequest.input('thucte', sql.VarChar, thucte);
      insertRequest.input('doday', sql.VarChar, doday);
      insertRequest.input('soi1', sql.VarChar, soi1);
      insertRequest.input('soi2', sql.VarChar, soi2);
      insertRequest.input('sodaycatduoc', sql.VarChar, sodaycatduoc);
      insertRequest.input('chieudaicatlon', sql.VarChar, chieudaicatlon);
      insertRequest.input('chieudaicatnho', sql.VarChar, chieudaicatnho);
      insertRequest.input('tocdomaydun', sql.VarChar, tocdomaydun);
      insertRequest.input('tocdokeo', sql.VarChar, tocdokeo);

      insertRequest.query(insertQuery, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).send(err);
        }
        if (result && result.rowsAffected > 0) {
          res.json({
            message: "Data inserted successfully",
            id: result.insertId
          });
        } else {
          res.status(500).json({ message: "Data inserted but no ID returned" });
        }
      });
    }
  });
});


app.delete("/api/data/:id", checkSQLConnection, async (req, res) => {
  const { id } = req.params;

  try {
    const request = pool.request();
    const result = await request.query`DELETE FROM tblmhe WHERE id = ${id}`;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).send(err);
  }
});

app.put("/api/data/:id", async (req, res) => {
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

  try {
    await sql.connect(config);

    const result = await sql.query`
      UPDATE tblmhe 
      SET 
        mahang = ${mahang},
        name = ${name},
        quycachloithep = ${quycachloithep},
        khuonlodie = ${khuonlodie},
        khuonsoiholder = ${khuonsoiholder},
        sosoi = ${sosoi},
        pitch = ${pitch},
        tieuchuan = ${tieuchuan},
        thucte = ${thucte},
        doday = ${doday},
        soi1 = ${soi1},
        soi2 = ${soi2},
        sodaycatduoc = ${sodaycatduoc},
        chieudaicatlon = ${chieudaicatlon},
        chieudaicatnho = ${chieudaicatnho},
        tocdomaydun = ${tocdomaydun},
        tocdokeo = ${tocdokeo}
      WHERE id = ${id}
    `;

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json({ message: "Data updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating data");
  }
});
app.post('/login', checkSQLConnection, async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.request().query`SELECT * FROM users WHERE username = ${username}`;
    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      'your_jwt_secret',
      { expiresIn: '1y' }
    );

    res.json({
      message: `Logged in as ${user.role}`,
      role: user.role,
      token: token
    });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
