const fs = require("fs");
const crypto = require("crypto");

module.exports = class ProductoManager {
  constructor() {
    this.path = "fs/products.json";
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
      if (!data.title|| !data.photo|| !data.category || !data.price| !data.stock) {
        throw new Error("Los campos 'photo', 'email', 'password','role' son obligatorios.");
      }

      if (!data.title) {
        throw new Error("Ingrese el title");
      } else {
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        
        // Validar si el usuario ya existe
        const existingProduct = all.find(product => product.title === data.title);
        if (existingProduct) {
          throw new Error("El usuario  existe");
        }

        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          title:data.title,
          photo: data.photo || "https://th.bing.com/th/id/R.377678c2db604c4a8f4fe2c98a78ae75?rik=QufLsp91ueHzIA&riu=http%3a%2f%2fwebmg.ru%2fwp-content%2fuploads%2f2022%2f01%2f114-20220108_184545.jpg&ehk=a4CfrALZscMhNSJTgd9MZqd%2bbHpq05SZ%2bNOu9WNJicY%3d&risl=&pid=ImgRaw&r=0",
          category: data.category,
          price: data.price,
          stock: data.stock,
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
        throw new Error("No encontrado el Producto");
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
    const product = new module.exports();
    await product.create({
      title:"Master Dog",
      photo: "/img/Master Dog.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 25000,
      stock: 29,
    });
    await product.create({
      title:"Dog Chow",
      photo: "/img/Dog Chow.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 34000,
      stock: 49,
    });
    await product.create({
      title:"Pro Plan",
      photo: "/img/Pro Plan.jpg",
      category:"Alimento y accesorios de mascotas",
      price:  33500,
      stock: 20,
    });
    await product.create({
      title: "Royal Canin",
      photo: "/img/Royal Canin.jpg",
      category:"Alimento y accesorios de mascotas", 
      price: 33500,
      stock: 14,
    });
    await product.create({
      title:"Happy Dog",
      photo: "/img/Happy Dog.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 39000,
      stock: 20,
    });
    await product.create({
      title:"Cat Lover",
      photo: "/img/Cat Lover.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 29900,
      stock: 13,
    });
    await product.create({
      title:"Whiskas",
      photo: "/img/Whiskas.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 38000,
      stock: 9, 
    });
    await product.create({
      title:"Mascotin",
      photo: "/img/Master Dog.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 34000,
      stock: 49,
    });
    await product.create({
      title:"LoverGat",
      photo: "/img/LoverGat.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 38000,
      stock: 9,
    });
    await product.create({
      title:"Arena de Gato",
      photo: "/img/Arena de Gato.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 15000,
      stock: 2,
    });
    await product.create({
      title:"correa de perro",
      photo: "/img/correa de perro.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 15000,
      stock: 2,
    });
    await product.create({
      title:"Hueso de perro",
      photo: "/img/Hueso de perro.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 15000,
      stock: 2,
    });
    await product.create({
      title:"Ropa de perro",
      photo: "/img/Ropa de perro.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 7000,
      stock: 20,
    });
    await product.create({
      title:"Premio de perro",
      photo: "/img/Premio de perro.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 5000,
      stock: 80,
    });
    await product.create({
      title:"Cama de perro",
      photo: "/img/Cama de perro.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 10000,
      stock: 67,
    });
    await product.create({
      title:"Cama de Gato",
      photo: "/img/Cama de Gato.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 9000,
      stock: 30,
    });
    await product.create({
      title:"Premio de Gato",
      photo: "/img/Premio de Gato.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 17000,
      stock: 20,
    });
    await product.create({
      title:"Bañera de Gato",
      photo: "/img/Bañera de gato.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 10000,
      stock: 5,
    });
    await product.create({
      title:"Bañera de perro",
      photo: "/img/Bañera de perro.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 12000,
      stock: 10,
    });
    await product.create({
      title:"Arena de Gato",
      photo: "/img/Arena de Gato.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 15000,
      stock: 2,
    });
  
    await product.create({
      title:"Correa de perros",
      photo: "/img/Correa de perros.jpg",
      category:"Alimento y accesorios de mascotas",
      price: 30000,
      stock: 15,
    });

 
    await product.readOne("d0f982cafb2ef32acb24fad2");
    await product.readOne(third.id);
    await product.destroy(third.id);
  } catch (error) {
    console.log(error);
  }
}
test();


