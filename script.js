// Caracteres permitidos para sustitución
const BASE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !#$%&/()=?¡¿*-_.:,;<>[]{}@+"; 



// ----- Generar clave: PERMUTACIÓN  -----
function generarClave() {
    let arr = BASE.split("");

    // Mezcla Fisher–Yates correcta
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.join("");
}


// -------- ENCRIPTAR --------
function encriptar() {
    let mensaje = document.getElementById("mensaje").value;

    if (!mensaje.trim()) {
        alert("Escribe un mensaje primero.");
        return;
    }

    let clave = generarClave();
    let resultado = "";

    for (let c of mensaje) {
        let idx = BASE.indexOf(c);
        if (idx === -1) {
            // Si el caracter NO está en BASE, lo dejamos igual
            resultado += c;
        } else {
            resultado += clave[idx];
        }
    }

    document.getElementById("salida").value =
        "🔐 Mensaje cifrado:\n" + resultado +
        "\n\n🔑 Clave:\n" + clave;

    document.getElementById("clave").value = clave;
}


// -------- DESENCRIPTAR --------
function desencriptar() {
    let mensaje = document.getElementById("mensaje").value;
    let clave = document.getElementById("clave").value;

    if (!mensaje.trim() || !clave.trim()) {
        alert("Introduce mensaje + clave.");
        return;
    }

    let resultado = "";

    for (let c of mensaje) {
        let idx = clave.indexOf(c);
        if (idx === -1) {
            resultado += c;
        } else {
            resultado += BASE[idx];
        }
    }

    document.getElementById("salida").value =
        "📜 Mensaje desencriptado:\n" + resultado;
}

function copiar() {
    let salida = document.getElementById("salida");
    salida.select();
    salida.setSelectionRange(0, 99999); // Para móvil
    navigator.clipboard.writeText(salida.value)
        .then(() => alert("✅ Copiado al portapapeles"))
        .catch(() => alert("❌ Error al copiar"));
}
//--------------Borrar todo----------
function borrar() {
    document.getElementById("mensaje").value = "";
    document.getElementById("clave").value = "";
    document.getElementById("salida").value = "";
}

