const db = require("../config/db");


// ===============================
// CREATE USER
// ===============================
exports.createUser = (name, email, password, callback) => {
  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    callback
  );
};


// ===============================
// FIND USER BY EMAIL
// ===============================
exports.findUserByEmail = (email, callback) => {
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    callback
  );
};


// ===============================
// UPDATE NAME
// ===============================
exports.updateName = (id, name, callback) => {
  db.query(
    "UPDATE users SET name = ? WHERE id = ?",
    [name, id],
    callback
  );
};


// ===============================
// UPDATE PASSWORD
// ===============================
exports.updatePassword = (id, password, callback) => {
  db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [password, id],
    callback
  );
};


// ===============================
// DELETE USER
// ===============================
exports.deleteUser = (id, callback) => {
  db.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    callback
  );
};
