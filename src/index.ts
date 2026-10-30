// soal 2
interface kendaraan {
    merk: string;
    roda: number;
}

interface mobil extends kendaraan {
    pintu: number;
    isElectric: boolean;
}

const mobilKesukaan: mobil = {
    merk: "Toyota",
    roda: 4,
    pintu: 4,
    isElectric: false,
};

console.log(mobilKesukaan);

// Soal 3
type alamat = {
    jalan: string;
    kota: string;
};

type orang = {
    email: string;
    telepon: string;
};

type identitas = alamat & orang;

const profilSaya: identitas = {
    jalan: "Jl. Oratau",
    kota: "Mars",
    email: "gtw@gmail.com",
    telepon: "00000000000000000000"
};

console.log(profilSaya);
    