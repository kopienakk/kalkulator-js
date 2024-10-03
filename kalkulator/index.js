// Fungsi untuk melakukan operasi kalkulator
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
            return "Operator tidak valid. Gunakan +, -, *, /, atau %.";
    }
}

// Fungsi untuk mencetak riwayat kalkulasi
function cetakRiwayat(riwayat) {
    console.log("\nRiwayat Kalkulasi:");
    riwayat.forEach((entry, index) => {
        console.log(`${index + 1}: ${entry}`);
    });
}

// Fungsi untuk meminta input dari pengguna
function inputKalkulator() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let riwayat = [];
    let hasilSebelumnya = null;

    const tanya = () => {
        readline.question('Masukkan bilangan pertama (atau ketik "hasil" untuk menggunakan hasil sebelumnya): ', (bil1) => {
            if (bil1.toLowerCase() === "hasil" && hasilSebelumnya !== null) {
                bil1 = hasilSebelumnya;
            }

            readline.question('Masukkan bilangan kedua: ', (bil2) => {
                readline.question('Masukkan operator (+, -, *, /, %): ', (op) => {
                    const number1 = parseFloat(bil1);
                    const number2 = parseFloat(bil2);
                    const hasil = kalkulator(number1, number2, op);

                    if (typeof hasil === 'number') {
                        hasilSebelumnya = hasil;
                        riwayat.push(`${number1} ${op} ${number2} = ${hasil}`);
                    }

                    console.log(`Hasil: ${hasil}`);
                    cetakRiwayat(riwayat);

                    // Tanyakan apakah pengguna ingin melanjutkan
                    readline.question('Apakah Anda ingin melanjutkan perhitungan? (ya/tidak): ', (jawaban) => {
                        if (jawaban.toLowerCase() === 'ya') {
                            tanya(); // Lanjutkan tanya
                        } else {
                            console.log("Terima kasih telah menggunakan kalkulator!");
                            readline.close();
                        }
                    });
                });
            });
        });
    };

    // Mulai tanya
    tanya();
}

// Menjalankan kalkulator
inputKalkulator();
