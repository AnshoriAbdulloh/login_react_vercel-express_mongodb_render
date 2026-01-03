import mongoose from "mongoose"; // MongoDB adalah ODM (Object Data Modeling) mirip ORM di SQL

// file ini adalah MODEL (Blueprint) data user di MongoDB
// jika di Mysql punya table users dan kolom username, email, password
// di MongoDB + Mongoose collection users dan Schema sebagai aturan bentuk dokumen

// sebab MongoDB itu schema-less (bebas isi apa aja)
// Mongoose dipakai supaya ada aturan struktur data, validasi otomatis dan query lebih rapi

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// sehingga jika data tidak memenuhi schema diatas maka akan error

// export model bernama User berdasarkan userSchema
export default mongoose.model("User", userSchema);
