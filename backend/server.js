// =========================================================================
// Servidor Express — Backend del chatbot de orientación académica.
// Expone un endpoint POST /api/chat que recibe el nodo actual y el mensaje
// del usuario, evalúa el árbol de decisión, y devuelve la respuesta.
// =========================================================================

import express from "express";
import cors from "cors";
import { arbol, MENSAJE_DEFAULT, MAX_INTENTOS, normalizar } from "./arbol.js";

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ---------- Endpoint principal del chatbot ----------
// Body esperado: { nodoActual: "N0", mensaje: "texto del usuario", intentosFallidos: 0 }
// Devuelve: { respuesta, nodoActual, intentosFallidos, esHoja, reinicio }

app.post("/api/chat", (req, res) => {
  const { nodoActual = "N0", mensaje = "", intentosFallidos = 0 } = req.body;

  const nodo = arbol[nodoActual];
  if (!nodo) {
    return res.status(400).json({ error: "Nodo inválido." });
  }

  const mensajeNormalizado = normalizar(mensaje);

  // Buscamos si el mensaje coincide con alguna palabra clave de las opciones del nodo
  let opcionEncontrada = null;
  for (const opcion of nodo.opciones) {
    const coincide = opcion.palabras.some((palabra) =>
      mensajeNormalizado.includes(normalizar(palabra))
    );
    if (coincide) {
      opcionEncontrada = opcion;
      break;
    }
  }

  // Caso 1: se encontró una palabra clave válida
  if (opcionEncontrada) {
    if (opcionEncontrada.hoja) {
      return res.json({
        respuesta: opcionEncontrada.hoja,
        nodoActual: "N0",
        intentosFallidos: 0,
        esHoja: true,
        reinicio: true,
        descripcionNodo: nodo.descripcion,
      });
    }
    return res.json({
      respuesta: arbol[opcionEncontrada.destino].pregunta,
      nodoActual: opcionEncontrada.destino,
      intentosFallidos: 0,
      esHoja: false,
      reinicio: false,
      descripcionNodo: arbol[opcionEncontrada.destino].descripcion,
    });
  }

  // Caso 2: no se encontró ninguna palabra clave esperada en este nodo
  if (nodoActual === "N0") {
    return res.json({
      respuesta: MENSAJE_DEFAULT,
      nodoActual: "N0",
      intentosFallidos: 0,
      esHoja: false,
      reinicio: false,
      descripcionNodo: nodo.descripcion,
    });
  }

  const nuevosIntentos = intentosFallidos + 1;

  if (nuevosIntentos >= MAX_INTENTOS) {
    return res.json({
      respuesta:
        "No logré entender tu respuesta. Te devuelvo al menú principal para que reformules tu consulta.\n\n" +
        arbol.N0.pregunta,
      nodoActual: "N0",
      intentosFallidos: 0,
      esHoja: false,
      reinicio: true,
      descripcionNodo: arbol.N0.descripcion,
    });
  }

  return res.json({
    respuesta: "No entendí bien tu respuesta. " + nodo.pregunta,
    nodoActual: nodoActual,
    intentosFallidos: nuevosIntentos,
    esHoja: false,
    reinicio: false,
    descripcionNodo: nodo.descripcion,
  });
});

// ---------- Endpoint inicial: mensaje de bienvenida ----------

app.get("/api/inicio", (req, res) => {
  res.json({
    respuesta: arbol.N0.pregunta,
    nodoActual: "N0",
    descripcionNodo: arbol.N0.descripcion,
  });
});

app.listen(PUERTO, () => {
  console.log(`Servidor del chatbot escuchando en http://localhost:${PUERTO}`);
});
