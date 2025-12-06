// Hapus semua kode yang ada dan ganti dengan ini:

console.log("JavaScript loaded successfully!");

// Tunggu sampai DOM selesai load
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  const weatherForm = document.querySelector("form");
  const search = document.querySelector("input");
  const pesanSatu = document.querySelector("#pesan-1");
  const pesanDua = document.querySelector("#pesan-2");

  console.log("Elements found:", {
    weatherForm: weatherForm,
    search: search,
    pesanSatu: pesanSatu,
    pesanDua: pesanDua,
  });

  // Cek jika element ada
  if (!weatherForm) {
    console.error("Form element not found!");
    return;
  }

  weatherForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted!");

    const location = search.value.trim();
    console.log("Location entered:", location);

    // Validasi input kosong
    if (!location) {
      console.log("Empty location");
      pesanSatu.textContent = "Silakan masukkan lokasi terlebih dahulu";
      pesanDua.textContent = "";
      return;
    }

    pesanSatu.textContent = "Sedang mencari lokasi ...";
    pesanDua.textContent = "";
    console.log("Fetching data for:", location);

    // Encode URI untuk handle spasi dan karakter khusus
    const encodedLocation = encodeURIComponent(location);
    const url = "/infoCuaca?address=" + encodedLocation;

    console.log("Fetch URL:", url);

    fetch(url)
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data.error) {
          pesanSatu.textContent = data.error;
          pesanDua.textContent = "";
        } else {
          pesanSatu.textContent = data.lokasi;
          pesanDua.textContent = data.prediksiCuaca;
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        pesanSatu.textContent = "Terjadi kesalahan saat mengambil data";
        pesanDua.textContent = error.message;
      });
  });

  console.log("Event listener attached successfully");
});
