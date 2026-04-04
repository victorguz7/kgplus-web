const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

// BASE DE DATOS DE PRODUCTOS
const productos = [
  {
    id: 1,
    nombre: "Prix 7T",
    img: "img/produtos/Prix-7t-desktop.png",
    descripcion: "Balança comercial de alto desempenho com conectividade avançada.",
    destacado: true
  },
  {
    id: 2,
    nombre: "Balança 2099",
    img: "img/produtos/balanca-2099-desktop-280x279.png",
    descripcion: "Robustez industrial para ambientes severos e pesagem de precisão.",
    destacado: true
  },
  {
    id: 3,
    nombre: "Agro-Pecuária",
    img: "img/produtos/agro-pecuaria.png",
    descripcion: "Solução completa para pesagem de grãos e controle de rebanho.",
    destacado: true
  },
  {
    id: 4,
    nombre: "Indicadores T1200 / 9098C",
    img: "img/produtos/2124 com indicadores t1200 ou 9098c.png",
    descripcion: "Sistemas de indicação de peso versáteis e precisos.",
    destacado: false
  },
  {
    id: 5,
    nombre: "Balança 2099 Desktop",
    img: "img/produtos/balanca-2099-desktop-280x279.png",
    descripcion: "Estrutura compacta com a mesma força industrial.",
    destacado: false
  },
  {
    id: 6,
    nombre: "Etiquetas Térmicas",
    img: "img/produtos/etiquetas_termicas-desktop-280x279.png",
    descripcion: "Suprimentos de alta qualidade para rotulagem durável.",
    destacado: false
  },
  {
    id: 7,
    nombre: "Prix 4 Uno",
    img: "img/produtos/prix 4 uno.png",
    descripcion: "A balança ideal para rotulagem em comércios de varejo.",
    destacado: false
  },
  {
    id: 8,
    nombre: "Prix Splash BP201W",
    img: "img/produtos/prix splash bp201w.png",
    descripcion: "Resistência à água para pesagem em ambientes úmidos.",
    destacado: false
  },
  {
    id: 9,
    nombre: "Prix Mezzo 300S",
    img: "img/produtos/prix-mezzo-300s-vista-frontal-desktop-280x279.png",
    descripcion: "Tecnologia Mezzo para fatiadores e check-outs.",
    destacado: false
  },
  {
    id: 10,
    nombre: "Prix Veloce 350A",
    img: "img/produtos/prix-veloce-350a-desktop-280x279.png",
    descripcion: "Automação e velocidade no ponto de venda.",
    destacado: false
  },
  {
    id: 11,
    nombre: "Balança de Precisão",
    img: "img/produtos/download.jpeg",
    descripcion: "Medições milimétricas para uso laboratorial ou farmacêutico.",
    destacado: false
  }
];

// ENDPOINTS
app.get("/productos", (req, res) => {
  // Retorna solo los destacados para la home
  const destacados = productos.filter(p => p.destacado);
  res.json(destacados);
});

app.get("/catalogo", (req, res) => {
  // Retorna todos los productos para el modal
  res.json(productos);
});

app.post("/contacto", (req, res) => {
  const { nombre, email, mensaje } = req.body;
  console.log(`📩 Novo contato técnico: ${nombre} (${email}) - ${mensaje}`);
  
  // Aquí se podría integrar un envío real de email con Nodemailer
  res.status(200).json({ status: "success", message: "Mensagem logada no servidor." });
});

app.listen(3000, () => {
  console.log("Servidor KgPlus rodando em http://localhost:3000");
});