<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";

const URL_API = "http://localhost:3000/api";


const mensajes = reactive([]);
const historial = reactive([]);
const nodoActual = ref("N0");
const intentosFallidos = ref(0);
const textoInput = ref("");
const chatBoxRef = ref(null);

// ---------- Utilidades ----------

function horaActual() {
  return new Date().toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit" });
}

async function scrollAlFinal() {
  await nextTick();
  if (chatBoxRef.value) {
    chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight;
  }
}

function agregarMensaje(remitente, texto, clase) {
  mensajes.push({ id: Date.now() + Math.random(), remitente, texto, clase, hora: horaActual() });
  scrollAlFinal();
}

function actualizarHistorial(codigo, descripcion, seleccion) {
  if (historial.length > 0 && seleccion !== null) {
    historial[historial.length - 1].seleccion = seleccion;
  }
  if (seleccion === null || codigo !== historial[historial.length - 1]?.codigo) {
    historial.push({ codigo, descripcion, seleccion: null });
  }
}

function reiniciarHistorial(codigo, descripcion) {
  historial.splice(0, historial.length);
  historial.push({ codigo, descripcion, seleccion: null });
}

// ---------- Comunicación con el backend ----------

async function cargarInicio() {
  const res = await fetch(`${URL_API}/inicio`);
  const datos = await res.json();
  agregarMensaje("Bot", datos.respuesta, "mensaje--bot");
  reiniciarHistorial(datos.nodoActual, datos.descripcionNodo);
}

async function enviarMensaje() {
  const texto = textoInput.value.trim();
  if (texto === "") return;

  agregarMensaje("Vos", texto, "mensaje--usuario");
  textoInput.value = "";

  try {
    const res = await fetch(`${URL_API}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nodoActual: nodoActual.value,
        mensaje: texto,
        intentosFallidos: intentosFallidos.value,
      }),
    });

    if (!res.ok) {
      agregarMensaje("Bot", "Hubo un problema de conexión con el servidor. Probá nuevamente.", "mensaje--bot");
      return;
    }

    const datos = await res.json();

    agregarMensaje("Bot", datos.respuesta, "mensaje--bot");

    if (datos.reinicio) {
      reiniciarHistorial(datos.nodoActual, datos.descripcionNodo);
    } else {
      actualizarHistorial(datos.nodoActual, datos.descripcionNodo, texto);
    }

    nodoActual.value = datos.nodoActual;
    intentosFallidos.value = datos.intentosFallidos;
  } catch (error) {
    agregarMensaje(
      "Bot",
      "No se pudo conectar con el servidor. Verificá que el backend (Express) esté corriendo en el puerto 3000.",
      "mensaje--bot"
    );
  }
}

onMounted(() => {
  cargarInicio();
});
</script>

<template>
  <div class="app">

    <!-- Barra lateral: historial de nodos recorridos -->
    <aside class="sidebar">
      <div class="sidebar__header">
        <h2>Historial de ramas</h2>
        <p class="sidebar__subtitulo">Nodos visitados en esta consulta</p>
      </div>

      <div class="sidebar__lista">
        <div v-for="item in historial" :key="item.codigo + item.seleccion" class="nodo-historial">
          <span class="codigo">{{ item.codigo }}</span>
          <span class="descripcion">{{ item.descripcion }}</span>
          <span v-if="item.seleccion" class="seleccion">Selección: "{{ item.seleccion }}"</span>
        </div>
      </div>

      <div class="sidebar__footer">
        <span class="badge">Nodo actual: {{ nodoActual }}</span>
      </div>
    </aside>

    <!-- Panel principal del chat -->
    <main class="chat">
      <header class="chat__header">
        <div>
          <h1>Orientación Académica</h1>
       
        </div>
       
      </header>

      <section ref="chatBoxRef" class="chat__cuerpo" aria-live="polite">
        <div
          v-for="msg in mensajes"
          :key="msg.id"
          :class="['mensaje', msg.clase]"
        >
          <div class="mensaje__meta">
            <span>{{ msg.remitente }}</span>
            <span>{{ msg.hora }}</span>
          </div>
          <div class="mensaje__cuerpo">{{ msg.texto }}</div>
        </div>
      </section>

      <form class="chat__form" @submit.prevent="enviarMensaje">
        <input
          v-model="textoInput"
          type="text"
          placeholder="Escribí tu mensaje aquí..."
          autocomplete="off"
        />
        <button type="submit">Enviar</button>
      </form>
    </main>

  </div>
</template>
