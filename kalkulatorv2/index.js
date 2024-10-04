const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fungsi kalkulator dasar
function kalkulator(bilangan1, bilangan2, operator) {
    switch (operator) {
        case '+':
            return bilangan1 + bilangan2;
        case '-':
            return bilangan1 - bilangan2;
        case '*':
            return bilangan1 * bilangan2;
        case '/':
            if (bilangan2 === 0) {
                return "Error: Pembagian dengan nol tidak diperbolehkan.";
            }
            return bilangan1 / bilangan2;
        case '%':
            if (bilangan2 === 0) {
                return "Error: Pembagian dengan nol tidak diperbolehkan.";
            }
            return bilangan1 % bilangan2;
        default:
            return "Operator tidak valid.";
    }
}

// Fungsi untuk menghitung akar, sin, cos, tan
function fungsiMatematika(bilangan, operasi) {
    switch (operasi) {
        case 'akar':
            return Math.sqrt(bilangan);
        case 'sin':
            return Math.sin(bilangan);
        case 'cos':
            return Math.cos(bilangan);
        case 'tan':
            return Math.tan(bilangan);
        default:
            return "Operasi tidak valid.";
    }
}

// Fungsi untuk mencetak riwayat kalkulasi
function cetakRiwayat(riwayat) {
    console.log("\nRiwayat Kalkulasi:");
    riwayat.forEach((entry, index) => {
        console.log(`${index + 1}: ${entry}`);
    });
}

// Fungsi untuk menu utama
function menuUtama(riwayat) {
    console.log("\nMenu Utama:");
    console.log("1. Kalkulasi");
    console.log("2. Lihat Riwayat");
    console.log("3. Keluar");

    readline.question('Pilih opsi (1/2/3): ', (option) => {
        switch (option) {
            case '1':
                menuKalkulasi(riwayat);
                break;
            case '2':
                cetakRiwayat(riwayat);
                menuUtama(riwayat); // Kembali ke menu utama
                break;
            case '3':
                konfirmasiKeluar();
                break;
            default:
                console.log("Opsi tidak valid. Silakan coba lagi.");
                menuUtama(riwayat);
        }
    });
}

// Fungsi untuk menu kalkulasi
function menuKalkulasi(riwayat) {
    console.log("\nSub Menu Kalkulasi:");
    console.log("1. Operasi Dasar");
    console.log("2. Fungsi Matematika");

    readline.question('Pilih opsi (1/2): ', (option) => {
        if (option === '1') {
            kalkulasiDasar(riwayat);
        } else if (option === '2') {
            fungsiMatematikaMenu(riwayat);
        } else {
            console.log("Opsi tidak valid. Silakan coba lagi.");
            menuKalkulasi(riwayat);
        }
    });
}

// Fungsi untuk kalkulasi dasar
function kalkulasiDasar(riwayat) {
    readline.question('Masukkan bilangan pertama: ', (bil1) => {
        readline.question('Masukkan bilangan kedua: ', (bil2) => {
            readline.question('Masukkan operator (+, -, *, /, %): ', (op) => {
                const number1 = parseFloat(bil1);
                const number2 = parseFloat(bil2);
                const hasil = kalkulator(number1, number2, op);

                if (typeof hasil === 'number') {
                    riwayat.push(`${number1} ${op} ${number2} = ${hasil}`);
                }

                console.log(`Hasil: ${hasil}`);
                cetakRiwayat(riwayat);
                menuUtama(riwayat); // Kembali ke menu utama
            });
        });
    });
}

// Fungsi untuk fungsi matematika
function fungsiMatematikaMenu(riwayat) {
    readline.question('Masukkan bilangan: ', (bil1) => {
        readline.question('Masukkan operasi (akar, sin, cos, tan): ', (op) => {
            const number = parseFloat(bil1);
            const hasil = fungsiMatematika(number, op);

            if (typeof hasil === 'number') {
                riwayat.push(`${op}(${number}) = ${hasil}`);
            }

            console.log(`Hasil: ${hasil}`);
            cetakRiwayat(riwayat);
            menuUtama(riwayat); // Kembali ke menu utama
        });
    });
}

// Fungsi konfirmasi keluar
function konfirmasiKeluar() {
    readline.question('Apakah Anda yakin ingin keluar? (ya/tidak): ', (jawaban) => {
        if (jawaban.toLowerCase() === 'ya') {
            console.log("Terima kasih telah menggunakan kalkulator!");
            readline.close();
        } else {
            menuUtama([]); // Kembali ke menu utama
        }
    });
}

// Menjalankan kalkulator
menuUtama([]);
