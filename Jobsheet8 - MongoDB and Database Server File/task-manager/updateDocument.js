const { MongoClient, ObjectId } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const namaDatabase = "task-manager";

async function main() {
  try {
    await client.connect();
    console.log("Berhasil terhubung ke MongoDB database server");
    const db = client.db(namaDatabase);

    // ===== UPDATE ONE =====
    // GANTI ObjectId dengan ID Anda
    const updateOneResult = await db.collection("pengguna").updateOne(
      { _id: new ObjectId("69413272a72310946b5274c4") },
      { $set: { nama: "Randikun" } }
      // { $inc: { usia: 1 } } // Alternatif: tambah usia 1
    );
    console.log("Update One Result:", updateOneResult);

    // ===== UPDATE MANY =====
    // Uncomment kode di bawah untuk update many
    /*
        const updateManyResult = await db.collection('tugas').updateMany(
            { StatusPenyelesaian: false },
            { $set: { StatusPenyelesaian: true } }
        );
        console.log('Update Many Result - Modified Count:', updateManyResult.modifiedCount);
        */
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main();
