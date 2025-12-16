const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const namaDatabase = "task-manager";

async function main() {
  try {
    await client.connect();
    console.log("Berhasil terhubung ke MongoDB database server");
    const db = client.db(namaDatabase);

    // PERBAIKAN: Hapus kurung siku [] pada 'Randi'
    const byNama = await db.collection("pengguna").findOne({ nama: "Faza" });

    // GANTI ObjectId dengan ID Anda dari MongoDB Compass
    const byObjectID = await db.collection("pengguna").findOne({
      _id: new ObjectId("6941341704cd5503a931272b"),
    });

    // GANTI usia dengan data yang ingin dicari
    const toArray = await db
      .collection("pengguna")
      .find({ usia: 20 })
      .toArray();

    // PERBAIKAN: Kondisi if yang benar
    if (byNama || byObjectID || toArray.length > 0) {
      console.log("Data Pengguna ditemukan (berdasarkan nama):", byNama);
      console.log(
        "Data Pengguna ditemukan (berdasarkan ID Objek):",
        byObjectID
      );
      console.log("Data Pengguna ditemukan (dalam format Array):", toArray);
    } else {
      console.log("Data Pengguna tidak ditemukan");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
