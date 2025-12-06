const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths
const direktoriPublic = path.join(__dirname, "../public");
const direktoriViews = path.join(__dirname, "../templates/views");
const direktoriPartials = path.join(__dirname, "../templates/partials");

// Setup handlebars
app.set("view engine", "hbs");
app.set("views", direktoriViews);
hbs.registerPartials(direktoriPartials);

// Setup static directory
app.use(express.static(direktoriPublic));

// Routes
app.get("", (req, res) => {
  res.render("index", {
    judul: "Aplikasi Cek Cuaca",
    nama: "Faza Azka M.",
  });
});

app.get("/tentang", (req, res) => {
  res.render("tentang", {
    judul: "Tentang Saya",
    nama: "Faza Azka M.",
  });
});

app.get("/bantuan", (req, res) => {
  res.render("bantuan", {
    judul: "Bantuan",
    nama: "Faza Azka M.",
    teksBantuan: "Ini adalah teks bantuan",
  });
});

app.get("/infoCuaca", (req, res) => {
  res.send({
    prediksiCuaca: "cuaca berpotensi hujan",
    lokasi: "Padang",
  });
});

// ALTERNATIF: Handle 404 dengan app.use (lebih aman dari wildcard)
app.use((req, res) => {
  res.status(404).render("404", {
    judul: "404",
    nama: "Faza Azka M.",
    pesankesalahan: "Halaman tidak ditemukan.",
  });
});

app.listen(4000, () => {
  console.log("Server berjalan pada port 4000.");
});
