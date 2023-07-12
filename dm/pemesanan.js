// Get the required elements
const diamondItems = document.querySelectorAll('.menu-item[data-price]');
const metodeItems = document.querySelectorAll('.menu-item[data-metode]');
const totalBayarInput = document.getElementById('totalbayar');

// Function to calculate the total payment
function calculateTotalPayment() {
  // Get the selected diamond price
  const selectedDiamond = document.querySelector('.menu-item.diamond.selected');
  const diamondPrice = selectedDiamond ? Number(selectedDiamond.getAttribute('data-price')) : 0;

  // Get the selected payment method fee
  const selectedMetode = document.querySelector('.menu-item[data-metode].selected');
  const metodeFee = selectedMetode ? Number(selectedMetode.getAttribute(`data-fee${selectedMetode.dataset.metode}`)) : 0;

  // Calculate the total payment
  const totalPayment = diamondPrice + metodeFee;

  // Update the total payment input value
  totalBayarInput.value = `Rp.${totalPayment}`;
}

// Add click event listeners to diamond items
diamondItems.forEach((item) => {
  item.addEventListener('click', () => {
    // Remove the 'selected' class from all diamond items
    diamondItems.forEach((item) => {
      item.classList.remove('selected');
    });

    // Add the 'selected' class to the clicked diamond item
    item.classList.add('selected');

    // Recalculate the total payment
    calculateTotalPayment();
  });
});

// Add click event listeners to payment method items
metodeItems.forEach((item) => {
  item.addEventListener('click', () => {
    // Remove the 'selected' class from all payment method items
    metodeItems.forEach((item) => {
      item.classList.remove('selected');
    });

    // Add the 'selected' class to the clicked payment method item
    item.classList.add('selected');

    // Recalculate the total payment
    calculateTotalPayment();
  });
});

function generateID() {
  // Get the current time
  const currentTime = new Date();

  // Get the required time components
  const year = currentTime.getFullYear().toString();
  const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
  const day = currentTime.getDate().toString().padStart(2, '0');
  const hour = currentTime.getHours().toString().padStart(2, '0');
  const minute = currentTime.getMinutes().toString().padStart(2, '0');
  const second = currentTime.getSeconds().toString().padStart(2, '0');

  // Generate the order ID with the time format and a random number
  const randomNum = Math.floor(Math.random() * 1000);
  const orderID = year + month + day + hour + minute + second + randomNum;

  return orderID;
}

function placeOrder() {
  // Get the input values
  const orderID = generateID();
  const userID = document.getElementById('userid').value;
  const zoneID = document.getElementById('zoneid').value;
  const nickname = document.getElementById('nickname').value;
  const nominalElement = document.querySelector('.menu-item.diamond.selected');
  const nominal = nominalElement ? nominalElement.getAttribute('data-name') : '';
  const harga = document.getElementById('totalbayar').value;
  const nomorWA = document.getElementById('nomorwa').value;
  const layanan = document.querySelector('.Layanan').innerText;
  const metodePembayaran = document.querySelector('.menu-item[data-metode].selected').getAttribute('data-metode');

  // Build the WhatsApp message with the retrieved data
  let message = '*NEW ORDER*:\n\n';
  message += 'Invoice: ' + orderID + '\n';
  message += 'Kategori: ' + layanan + '\n';
  message += 'User ID: ' + userID + '\n';
  message += 'Zone ID: ' + zoneID + '\n';
  message += 'Nickname: ' + nickname + '\n';
  message += 'Layanan: ' + nominal + '\n';
  message += 'Harga: Rp.' + harga + '\n';
  message += 'WhatsApp: ' + nomorWA + '\n';
  message += 'Via Pembayaran: ' + metodePembayaran;

  // Encode special characters for the URL
  message = encodeURIComponent(message);

  // Open WhatsApp with the built message
  window.open('https://wa.me/6282285152993?text=' + message);
}
// Mendapatkan referensi elemen-elemen yang dibutuhkan
var buyButton = document.querySelector('.buy-button');
var userIdInput = document.getElementById('userid');
var zoneIdInput = document.getElementById('zoneid');
var nicknameInput = document.getElementById('nickname');
var layanan = document.querySelector('.Layanan').innerText;
var nominalInput = document.querySelector('.menu-list');
var nomorWaInput = document.getElementById('nomorwa');
var hargaInput = document.getElementById('totalbayar');

// Menambahkan event listener untuk tombol "Beli"
buyButton.addEventListener('click', function() {
  // Mengambil nilai dari input yang diisi pengguna
  var userId = userIdInput.value;
  var zoneId = zoneIdInput.value;
  var nickname = nicknameInput.value;
  var Layanan = layananinput.value;
  var nominal = nominalInput.value;
  var nomorWa = nomorWaInput.value;
  var harga = hargaInput.value;

  // Membuat objek data pemesanan
  var orderData = {
    userId: userId,
    zoneId: zoneId,
    nickname: nickname,
    Layanan : layanan,
    nominal: nominal,
    nomorWa: nomorWa,
    harga: harga
  };

// Menyimpan data pemesanan ke Local Storage
localStorage.setItem('orderData', JSON.stringify(orderData));
  // Mengirimkan data pemesanan ke dashboard.html
sendOrderData(orderData, '../Dashboard /dashboard.html');

});

// Fungsi untuk mengirimkan data pemesanan ke dashboard.html
function sendOrderData(orderData) {
  // Menggunakan metode seperti AJAX atau mengirim data melalui URL
  // Misalnya, dengan menggunakan URL query string
  var dashboardUrl = '../Dashboard/dashboard.html';
  var queryString = '?userId=' + orderData.userId +
                    '&zoneId=' + orderData.zoneId +
                    '&nickname=' + orderData.nickname +
                    '&Layanan=' + orderData. layanan +
                    '&nominal=' + orderData.nominal +
                    '&nomorWa=' + orderData.nomorWa +
                    '&harga=' + orderData.harga;

  // Mengarahkan ke dashboard.html dengan URL query string
  window.location.href = dashboardUrl + queryString;
}
