// PERBAIKAN: Import yang benar
const { MongoClient, ObjectId } = require("mongodb");

// URL koneksi MongoDB
const url = "mongodb://127.0.0.1:27017";

// Instance client
const client = new MongoClient(url);

// Nama database - GANTI jadi 'task-manager' sesuai instruksi
const namaDatabase = "task-manager";

// Buat ObjectId
const id = new ObjectId();

// Cetak informasi ObjectId
console.log("ObjectId:", id);
console.log("Hex ID:", id.id);
console.log("Panjang Hex ID:", id.id.length);
console.log("Timestamp:", id.getTimestamp());
console.log("Panjang Hex String:", id.toHexString().length);

// Fungsi utama
async function main() {
  try {
    // Koneksi ke MongoDB
    await client.connect();
    console.log("Berhasil terhubung ke MongoDB database server");

    // Pilih database
    const db = client.db(namaDatabase);

    // Pilih koleksi
    const clPengguna = db.collection("pengguna");
    const clTugas = db.collection("tugas");

    // INSERT SATU DATA (pengguna)
    const insertPengguna = await clPengguna.insertOne({
      _id: id,
      nama: "Faza",
      usia: 20,
    });
    console.log("Memasukkan data Pengguna ke koleksi =>", insertPengguna);

    // INSERT BANYAK DATA (tugas) - PERBAIKI syntax
    const insertTugas = await clTugas.insertMany([
      {
        Deskripsi: "Membersihkan rumah",
        StatusPenyelesaian: true,
      },
      {
        Deskripsi: "Mengerjakan tugas kuliah",
        StatusPenyelesaian: false,
      },
      {
        Deskripsi: "Memberikan bimbingan",
        StatusPenyelesaian: false,
      },
    ]);
    console.log("Memasukkan data Tugas ke koleksi =>", insertTugas);

    return "Data selesai dimasukkan.";
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

// Jalankan fungsi
main().then(console.log).catch(console.error);
