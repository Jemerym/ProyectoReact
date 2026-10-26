import { useState } from "react";
import CardProductos from "../componentes/moleculas/CardProductos";
export const productos = [
    {id: 1,codigo: "CL001",nombre: "Cilindro GLP 5 kg",categoria: "Cilindros de Gas",stock: 8,precio: 6500,
    descripcion: "Cilindro de gas licuado de petróleo 5 kg. Para uso residencial (cocina, calefacción pequeña).",imagen: '/img/5kg.jpg'},
    {id: 2,codigo: "CL002",nombre: "Cilindro GLP 11 kg",categoria: "Cilindros de Gas",stock: 12,precio: 12000,
    descripcion: "Cilindro estándar doméstico. El más utilizado en hogares chilenos. Compatible con reguladores estándar.",imagen: '/img/11kg.jpg'},
    {id: 3,codigo: "CL003",nombre: "Cilindro GLP 15 kg",categoria: "Cilindros de Gas",stock: 6,precio: 16000,
    descripcion: "Cilindro de mayor capacidad para hogares de alto consumo o locales pequeños.",imagen: '/img/15kg.png'},
    {id: 4,codigo: "CL004",nombre: "Cilindro GLP 45 kg",categoria: "Cilindros de Gas",stock: 4,precio: 45000,
    descripcion: "Cilindro industrial. Uso comercial: restaurantes, talleres, calefacción de locales.",imagen: '/img/45kg.png'},
    {id: 5,codigo: "RG001",nombre: "Regulador domestico estándar",categoria: "Reguladores",stock: 15,precio: 8990,
    descripcion: "Regulador de 1 etapa para cilindros 5, 11 y 15 kg. Presion de salida 28 mbar.",imagen: '/img/regulador.jpg'},
    {id: 6,codigo: "RG002",nombre: "Regulador de alta presion",categoria: "Reguladores",stock: 7,precio: 18990,
    descripcion: "Regulador de cocinas industriales o equipo de mayor consumo. Presión regulable.",imagen: '/img/rg002.jpg'},
    {id: 7,codigo: "RG003",nombre: "Regulador dual (2 salidas)",categoria: "Reguladores",stock: 5,precio: 14990,
    descripcion: "Permite conectar dos artefactos simultaneamente al mismo cilindro.",imagen: '/img/rg003.jpg'},
    {id: 8,codigo: "MG001",nombre: "Manguera gas 1.5 m",categoria: "Manguera y Conexiones",stock: 20,precio: 3990,
    descripcion: "Manguera flexible homologada. Diámetro interior 9mm. Compatible con reguladores estandar.",imagen: '/img/mg001.jpg'},
    {id: 9,codigo: "MG002",nombre: "Manguera gas 3 m",categoria: "Manguera y Conexiones",stock: 10,precio: 6990,
    descripcion: "Manguera larga para instalaciones donde el artefacto esta alejado del cilindro.",imagen: '/img/mg002.jpg'},
    {id: 10,codigo: "MG003",nombre: "Abrazadera metálica",categoria: "Manguera y Conexiones",stock: 50,precio: 990,
    descripcion: "Abrazadera de acero para asegurar la conexión manguera-regulador y manguera-artefacto.",imagen: '/img/mg003.jpg'},
    {id: 11,codigo: "MG004",nombre: "Kit conexión completo",categoria: "Manguera y Conexiones",stock: 12,precio: 12990,
    descripcion: "Todo lo necesario para instalar un cilindro nuevo (regulador + manguera 1.5m + abrazaderas).",imagen: '/img/mg004.jpg'},
    {id: 12, codigo: "AC001",nombre: "Carro porta cilindros",categoria: "Accesorios",stock: 8,precio: 12990,
    descripcion: "Carro metálico con ruedas para transportar cilindros dentro del hogar con seguridad.",imagen: '/img/ac001.jpg'},
    {id: 13,codigo: "AC002",nombre: "Tapa protectora válvula",categoria: "Accesorios",stock: 25,precio: 1490,
    descripcion: "Tapa de plástico ABS para proteger la válvula del cilindro durante el transporte.",imagen: '/img/ac002.jpg'},
    {id: 14,codigo: "AC003",nombre: "Detector de gas",categoria: "Accesorios",stock: 10,precio: 19990,
    descripcion: "Sensor electroquímico. Alarma sonora y visual ante fuga de gas GLP o metano.",imagen: '/img/ac003.jpg'}
]
function Productos() {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  const [contador, setContador] = useState("");
  const admin = JSON.parse(localStorage.getItem("usuarioActivo") || "{}").rol === "admin";
  const categorias = [...new Set(productos.map((p) => p.categoria))];
  const eliminar = (id: number) => {
    productos.splice(productos.findIndex((p) => p.id === id), 1);
    setContador(contador + 1);
  };
  const modificar = (id: number) => {
    const p = productos.find((p) => p.id === id);
    if (!p) return;
    p.nombre = prompt("Nombre:", p.nombre) || p.nombre;
    p.precio = Number(prompt("Precio:", String(p.precio))) || p.precio;
    p.stock = Number(prompt("Stock:", String(p.stock))) || p.stock;
    setContador(contador + 1);
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold">Productos</h1>
      {categorias.map((categoria) => (
        <div className="text-center" key={categoria}>
          <br /><br />
          <h2 className="fw-normal">{categoria}</h2>
          <br />
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 ">
            {productos
              .filter((p) => p.categoria === categoria)
              .map((p) => {
                const enCarrito = carrito.find((item: any) => item.id === p.id)?.cantidad || 0;
                const stockDisponible = p.stock - enCarrito;
                return (
                  <div className="col h-100" key={p.id}>
                    <CardProductos
                      {...p}
                      stock={stockDisponible}
                      onModificar={admin ? () => modificar(p.id) : undefined}
                      onEliminar={admin ? () => eliminar(p.id) : undefined}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
export default Productos;