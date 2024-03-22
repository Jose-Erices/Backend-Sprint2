const fs = require("fs");
const crypto = require("crypto");

module.exports = class UsersManager {
  constructor() {
    this.path = "fs/users.json";
    this.init();
  }
  
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("El archivo users.json fue creado correctamente");
    } else {
      console.log("El archivo users.json ya existe");
    }
  }
  
  async create(data) {
    try {
      // Validar campos obligatorios
      if (!data.photo || !data.email || !data.password || !data.role) {
        throw new Error("Los campos 'photo', 'email', 'password','role' son obligatorios.");
      }

      if (!data.email) {
        throw new Error("Ingrese el email");
      } else {
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        
        // Validar si el usuario ya existe
        const existingUser = all.find(user => user.email === data.email);
        if (existingUser) {
          throw new Error("El usuario  existe");
        }

        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo: data.photo || "https://th.bing.com/th/id/R.377678c2db604c4a8f4fe2c98a78ae75?rik=QufLsp91ueHzIA&riu=http%3a%2f%2fwebmg.ru%2fwp-content%2fuploads%2f2022%2f01%2f114-20220108_184545.jpg&ehk=a4CfrALZscMhNSJTgd9MZqd%2bbHpq05SZ%2bNOu9WNJicY%3d&risl=&pid=ImgRaw&r=0",
          email: data.email,
          password: data.password,
          role: data.role,
        };
        
        all.push(user);
        await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2));
        console.log({ created: user.id });
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  async read() {
    try {
      const all = await fs.promises.readFile(this.path, "utf-8");
      console.log(JSON.parse(all));
      return JSON.parse(all);
    } catch (error) {
      console.log(error);
    }
  }
  //readOne(id)
  async readOne(id) {
    try {
      const all = await fs.promises.readFile(this.path, "utf-8");
      const user = JSON.parse(all).find((each) => each.id === id);
      if (!user) {
        throw new Error("No encontrado el Usuario");
      } else {
        console.log(user);
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //destroy (id)
  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let user = all.find((each) => each.id === id);
      if (!user) {
        throw new Error("No encontrado el Usuario");
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log({ deleted: user.id });
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

async function test() {
  try {
    const users = new module.exports();
    await users.create({
      photo: "https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg",
      email: "jose.erices.gonzalez@gmail.com",
      password: "12345678a",
      role: "Admin"
    });
    await users.create({
      photo: "https://blog.hubspot.es/hubfs/media/buyerpersona.jpeg",
      email: "carolina.pino.navarro@gmail.com",
      password: "98765432a",
      role: "Admin"
    });
    await users.create({
      photo: "https://th.bing.com/th/id/R.976bc1f02f9e2dd9989a0d079d22b893?rik=3TSjgIFFOqDN6g&pid=ImgRaw&r=0",
      email: "manuel.sanchez@gmail.com",
      password: "MSanchez1",
      role: "Controller",
    });
    await users.create({
      photo: "https://media.istockphoto.com/id/1331257339/es/foto/retrato-de-un-hombre-maduro-feliz-con-gafas-y-mirando-a-la-c%C3%A1mara-en-el-interior.jpg?s=612x612&w=0&k=20&c=L8-INEObvr241FCxSZMlKE_S40aC2-rTuBnzG4hEJqg=",
      email: "manuel.benitez@gmail.com",
      password: "Mbenitez",
      role: "Abogado",
    });
    await users.create({
      photo: "https://s3.abcstatics.com/media/summum/2021/10/01/maxi_iglesias-kU2E--1248x698@abc.jpeg",
      email: "alejandroM@gmail.com",
      password: "Alejan2",
      role: "Contabilidad",
    });
    await users.read();
    await users.destroy("9e933752095e33945075b83b5");
    const third = await users.create({

      photo: "https://th.bing.com/th/id/OIP.V--oEzqfFx0H1O7CZrfVMAHaE9?rs=1&pid=ImgDetMain",
      email: "lorenzo.guarda@gmail.com",
      password: "lore23678",
      role: "Scrum Master",
    });
    await users.create({
      photo: "https://img.freepik.com/foto-gratis/retrato-mujer-casual-sonriente_171337-4168.jpg",
      email: "fabiola.erices@gmail.com",
      password: "FErices39",
      role: "Ejecutivo",
    });
    await users.create({
      photo: "https://media.istockphoto.com/id/1364917563/es/foto/hombre-de-negocios-sonriendo-con-los-brazos-cruzados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=NqMHLF8T4RzPaBE_WMnflSGB_1-kZZTQgAkekUxumZg=",
      email: "leturia.bravo@gmail.com",
      password: "LBravo21",
      role: "Jefe de Unidad ",
    });
    await users.readOne("d0f982cafb2ef32acb24fad2");
    await users.readOne(third.id);
    await users.destroy(third.id);
  } catch (error) {
    console.log(error);
  }
}
test();
