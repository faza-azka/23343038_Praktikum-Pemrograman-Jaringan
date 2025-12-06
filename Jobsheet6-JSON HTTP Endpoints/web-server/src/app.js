const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/prediksiCuaca");

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

// Route infoCuaca dengan integrasi API
app.get("/infoCuaca", (req, res) => {
  console.log("Query parameters:", req.query); // DEBUG

  if (!req.query.address) {
    return res.send({
      error: "Kamu harus memasukan lokasi yang ingin dicari",
    });
  }

  console.log("Mencari lokasi:", req.query.address);

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        console.log("Geocode error:", error); // DEBUG
        return res.send({ error });
      }

      console.log("Geocode success:", { latitude, longitude, location }); // DEBUG

      forecast(latitude, longitude, (error, dataPrediksi) => {
        if (error) {
          console.log("Forecast error:", error); // DEBUG
          return res.send({ error });
        }

        console.log("Forecast success:", dataPrediksi); // DEBUG

        res.send({
          prediksiCuaca: dataPrediksi,
          lokasi: location,
          address: req.query.address,
        });
      });
    }
  );
});

// Handle 404 - harus di paling akhir
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
