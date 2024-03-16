const crypto = require("crypto");

class UserManager {
  static #users = [];

  create(data) {

    // Valida el formato de la foto
    if (!/\.(jpg|png|jpeg)$/i.test(data.photo)) {
      console.error("El formato imagen debe ser JPG, PNG o JPEG.");
      return;
    }

    // Velida si están todos los campos necesarios
    if (!data.photo || !data.email || !data.password || !data.role) {
      console.error("Faltan campos obligatorios");
      return;
    }

    
    // Valida el email
    if (!isValidEmail(data.email)) {
      console.error("Email inválido, por favor corregir");
      return;
    }

    // Velida la seguridad del password
    if (data.password.length < 9) {
      console.error("El password debe tener al menos 9 caracteres");
      return;
    }

    function isValidEmail(email) {
      // Patrón validación de email
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      photo: data.photo,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    UserManager.#users.push(user);
    console.log("Creado con éxito");
  }

  
  read() {
    return UserManager.#users;
  }
}



const gestorDeUsuarios = new UserManager();

gestorDeUsuarios.create({
  photo: "https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg",
  email: "jose.erices.gonzalez@gmail.com",
  password: "12345678a",
  role: "Jefe de Unidad"
});

gestorDeUsuarios.create({
  photo: "https://blog.hubspot.es/hubfs/media/buyerpersona.jpeg",
  email: "carolina.pino.navarro@gmail.com",
  password: "98765432a",
  role: "Controller"
});

console.log(gestorDeUsuarios.read());
