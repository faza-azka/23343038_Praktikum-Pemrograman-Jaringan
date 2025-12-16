const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const namaDatabase = "task-manager";

async function main() {
  try {
    await client.connect();
    console.log("Berhasil terhubung ke MongoDB database server");
    const db = client.db(namaDatabase);

    // OPTION 1: Hapus berdasarkan usia 25 (data Randi)
    console.log("Menghapus data dengan usia 25...");
    const deleteResult = await db.collection("pengguna").deleteMany({
      usia: 25, // ← Akan menghapus data Randi
    });
    console.log("Delete Result:", deleteResult);

    // OPTION 2: Atau hapus berdasarkan usia 20 (data Faza)
    /*
        console.log('Menghapus data dengan usia 20...');
        const deleteResult = await db.collection('pengguna').deleteMany({
            usia: 20  // ← Akan menghapus data Faza
        });
        console.log('Delete Result:', deleteResult);
        */

    // OPTION 3: Atau hapus berdasarkan nama
    /*
        console.log('Menghapus data dengan nama Randi...');
        const deleteResult = await db.collection('pengguna').deleteMany({
            nama: 'Randi'
        });
        console.log('Delete Result:', deleteResult);
        */
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main();
