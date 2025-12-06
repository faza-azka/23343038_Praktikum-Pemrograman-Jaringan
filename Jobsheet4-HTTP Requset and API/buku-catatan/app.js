const fs = require("fs");
const chalk = require("chalk").default; // Tambahkan .default
const validator = require("validator");
const catatan = require("./catatan.js");

// 1. Operasi File System
//fs.writeFileSync("catatan.txt", "Nama Saya Randi Proska");
fs.appendFileSync("catatan.txt", " Saya tinggal di Padang");

// 2. Menggunakan modul custom catatan.js
const pesan = catatan();
console.log(pesan);

// 3. Validasi URL dengan validator
console.log(validator.isURL("https://proska.com"));

// 4. Penggunaan chalk untuk warna
console.log(chalk.blue("print warna biru sukses"));

// Contoh variasi warna lain
console.log(chalk.red("Teks merah"));
console.log(chalk.green.bold("Teks hijau tebal"));
console.log(chalk.yellow.bgBlue("Teks kuning dengan background biru"));
