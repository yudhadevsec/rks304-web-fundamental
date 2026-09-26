document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', (e) => {
        let isFormValid = true;

        const setValid = (id) => {
            const errElement = document.getElementById(`err-${id}`);
            const inputElement = document.getElementById(id);
            
            errElement.classList.remove('show');
            inputElement.classList.remove('border-red-500');
            inputElement.classList.add('border-zinc-300');
        };

        const setInvalid = (id, message) => {
            const errElement = document.getElementById(`err-${id}`);
            const inputElement = document.getElementById(id);
            
            errElement.textContent = message;
            errElement.classList.add('show');
            inputElement.classList.remove('border-zinc-300');
            inputElement.classList.add('border-red-500');
            isFormValid = false;
        };

        ['nama', 'username', 'password', 'tanggalLahir', 'alamat', 'telpon'].forEach(setValid);

        const nama = document.getElementById('nama').value.trim();
        if (!nama) setInvalid('nama', 'Nama tidak boleh kosong.');

        const username = document.getElementById('username').value.trim();
        if (!username) setInvalid('username', 'Username tidak boleh kosong.');
        else if (username.length < 3) setInvalid('username', 'Minimal 3 karakter.');

        const password = document.getElementById('password').value;
        if (!password) setInvalid('password', 'Kata sandi tidak boleh kosong.');
        else if (password.length < 8) setInvalid('password', 'Minimal 8 karakter.');

        const tanggalLahir = document.getElementById('tanggalLahir').value;
        if (!tanggalLahir) {
            setInvalid('tanggalLahir', 'Tanggal lahir tidak boleh kosong.');
        } else {
            const selectedDate = new Date(tanggalLahir);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset jam untuk perbandingan tanggal
            
            if (selectedDate > today) {
                setInvalid('tanggalLahir', 'Tanggal lahir tidak boleh di masa depan.');
            } else if (selectedDate.getFullYear() > 2021) {
                setInvalid('tanggalLahir', 'Tahun kelahiran maksimal adalah 2021.');
            }
        }

        const alamat = document.getElementById('alamat').value.trim();
        if (!alamat) setInvalid('alamat', 'Alamat tidak boleh kosong.');

        const telpon = document.getElementById('telpon').value.trim();
        if (!telpon) setInvalid('telpon', 'Nomor telepon tidak boleh kosong.');
        else if (!telpon.startsWith('62')) setInvalid('telpon', 'Harus berawalan 62.');
        else if (!/^\d+$/.test(telpon)) setInvalid('telpon', 'Hanya boleh berisi angka.');

        if (!isFormValid) {
            e.preventDefault();
        }
    });

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const errElement = document.getElementById(`err-${input.id}`);
            if (errElement && errElement.classList.contains('show')) {
                errElement.classList.remove('show');
                input.classList.remove('border-red-500');
                input.classList.add('border-zinc-300');
            }
        });
    });
});
