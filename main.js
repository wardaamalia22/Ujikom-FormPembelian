const hargaProduk = {
    laptop: 5000000,
    keyboard: 100000,
    mouse: 50000
};

let hargaSatuan = 0;

const selectProduk = document.getElementById('produk');
const hargaInput = document.getElementById('harga');
const inputHarga = document.getElementById('totalharga');
const inputDiskon = document.getElementById('diskon');
const inputPajak = document.getElementById('pajak');
const inputBayar = document.getElementById('bayar');
const inputKembalian = document.getElementById('kembalian');
const selectButton = document.getElementById('button');
const inputUnit = document.getElementById('unit');

function updateHarga(){
    const jumlah = parseInt(inputUnit.value) || 0;
    const diskon = parseFloat(inputDiskon.value) || 0;
    const pajak = parseFloat(inputPajak.value) || 0;

    let total = hargaSatuan * jumlah;
    let potongan = total * (diskon / 100);
    let subtotal = total - potongan;
    let nilaiPajak = subtotal * (pajak / 100);
    let totalAkhir = subtotal + nilaiPajak;

    inputHarga.value = totalAkhir.toLocaleString('id-ID');
    updateKembalian();
}

function updateKembalian(){
    const total = parseInt(inputHarga.value.replace(/\./g, '')) || 0;
    const bayar = parseInt(inputBayar.value) || 0;

    let kembalian = bayar - total;
    if(kembalian < 0){
        inputKembalian.value = 'Belum bayar';
        inputKembalian.classList.add('text-danger');
        inputKembalian.classList.remove('text-success');
    }else{
        inputKembalian.value = kembalian.toLocaleString('id-ID');
        inputKembalian.classList.add('text-success');
    }
}
function submitPembayaran(){
    const total = parseInt(inputHarga.value.replace(/\./g, '')) || 0;
    const bayar = parseInt(inputBayar.value) || 0;

    if(bayar < total){
       alert("uang anda tidak cukup");
    }else{
        alert("TERIMAKASIH SUDAH BELANJA");
        window.location.reload();
    }
}

selectProduk.addEventListener('change', function(){
    const selected = this.value;
    hargaSatuan = hargaProduk[selected] || 0;
    hargaInput.value = hargaSatuan.toLocaleString('id-ID');
    inputUnit.value = 1;
    updateHarga();
});

inputUnit.addEventListener('input', updateHarga);
inputDiskon.addEventListener('input', updateHarga);
inputPajak.addEventListener('input', updateHarga);
inputBayar.addEventListener('input', updateKembalian);
selectButton.addEventListener('click', submitPembayaran);