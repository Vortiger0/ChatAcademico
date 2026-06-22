export const arbol = {
  N0: {
    pregunta: "¡Hola! Soy tu orientador académico virtual. ¿En qué te puedo ayudar? Podés consultarme sobre elegir una carrera, pedir información sobre una carrera específica, o sobre becas y pasantías.",
    descripcion: "Inicio (menú principal)",
    opciones: [
      { palabras: ["estudio","que estudio", "que estudiar", "elegir carrera", "no se que estudiar", "no se que carrera", "que carrera elijo", "vocacion", "orientacion vocacional", "ayuda para elegir", "que hago", "orientacion", "que puedo estudiar"], destino: "N1" },
      { palabras: ["informacion", "info", "carrera de", "sobre la carrera", "cuanto dura", "duracion de la carrera", "datos sobre", "quiero saber sobre", "requisitos", "materias", "info sobre una carrera"], destino: "N2" },
      { palabras: ["beca", "becas", "quiero info sobre becas", "quiero información sobre becas"], hoja: "Las becas suelen otorgarse combinando criterios de mérito académico (rendimiento, promedio) y situación socioeconómica; conviene consultar en bienestar estudiantil de tu institución." },
      { palabras: ["pasantia", "pasantias", "practica", "practicas", "practica laboral", "quiero info sobre pasantias", "quiero información sobre pasantías"], hoja: "Las pasantías suelen realizarse en empresas externas a través de bolsas de empleo o convenios que tenga tu institución con el sector privado, y son una buena forma de ganar experiencia mientras estudiás." },
      { palabras: ["becas y pasantias", "becas y pasantías", "becas o pasantias", "becas o pasantías", "becas/pasantias", "becas/pasantías", "beca y pasantia", "beca y pasantía"], destino: "N3" },
    ],
  },

  // ----- Rama 1: Elegir carrera -----
  N1: {
    pregunta: "¿Te gusta más la tecnología/números o trabajar con personas?",
    descripcion: "Vocación: tecnología vs. personas",
    opciones: [
      { palabras: ["tecnologia", "numeros", "compu", "matematica", "computacion", "computadora"], destino: "N1a" },
      { palabras: ["personas", "ayudar", "social", "gente"], destino: "N1b" },
    ],
  },
  N1a: {
    pregunta: "¿Preferís algo más práctico/manual o más analítico/teórico?",
    descripcion: "Enfoque: práctico vs. analítico",
    opciones: [
      { palabras: ["practico", "manual", "armar", "reparar"], destino: "N1a1" },
      { palabras: ["analitico", "teorico", "pensar", "calcular"], destino: "N1a2" },
    ],
  },
  N1a1: {
    pregunta: "¿Te interesa más arreglar/armar equipos físicos o programar software?",
    descripcion: "Interés: hardware vs. software",
    opciones: [
      { palabras: ["equipos", "hardware", "armar", "reparar", "taller", "laboratorio", "arreglar"], hoja: "Te puede interesar Electrónica o Mecánica." },
      { palabras: ["programacion","programar", "software", "codigo", "sistemas", "desarrollo"], hoja: "Te puede interesar Informática o Análisis de Sistemas." },
    ],
  },
  N1a2: {
    pregunta: "¿Te interesa más la gestión de empresas o el cálculo técnico/ingeniería?",
    descripcion: "Interés: empresa vs. ingeniería",
    opciones: [
      { palabras: ["empresa", "gestion", "negocio", "administrar"], hoja: "Te puede interesar Administración o Economía." },
      { palabras: ["calculo", "ingenieria", "tecnico"], hoja: "Te puede interesar Ingeniería." },
    ],
  },
  N1b: {
    pregunta: "¿Te interesa más la salud, la enseñanza o las ciencias sociales?",
    descripcion: "Área humana: salud, educación o social",
    opciones: [
      { palabras: ["salud", "medicina", "enfermeria"], hoja: "Te pueden interesar carreras del área de salud como Medicina, Enfermería o Psicología." },
      { palabras: ["ensenar", "docente", "profesor"], hoja: "Te puede interesar el Profesorado o carreras de Educación." },
      { palabras: ["social", "derecho", "abogado"], hoja: "Te pueden interesar carreras como Derecho, Trabajo Social o Ciencias Políticas." },
    ],
  },

  // ----- Rama 2: Información sobre una carrera específica -----
  N2: {
    pregunta: "¿La carrera que te interesa es del área de ciencias exactas/tecnología o del área de ciencias sociales/salud?",
    descripcion: "Área de la carrera consultada",
    opciones: [
      { palabras: ["exactas", "tecnologia", "tecnica"], destino: "N2a" },
      { palabras: ["sociales", "salud"], destino: "N2b" },
    ],
  },
  N2a: {
    pregunta: "¿Es una carrera de tipo ingeniería/técnica (con taller o laboratorio) o de tipo informática/sistemas?",
    descripcion: "Exactas: técnica vs. informática",
    opciones: [
      { palabras: ["ingenieria", "tecnica", "taller", "laboratorio"], destino: "N2a1" },
      { palabras: ["informatica", "sistemas"], destino: "N2a2" },
    ],
  },
  N2a1: {
    pregunta: "¿Te referís a Ingeniería o a Electrónica/Mecánica?",
    descripcion: "Elección: Ingeniería vs. Electrónica/Mecánica",
    opciones: [
      { palabras: ["ingenieria"], hoja: "La carrera de Ingeniería (Industrial, Civil o similar) suele durar 5 años, con fuerte base matemática y orientación a diseño, cálculo y gestión de proyectos." },
      { palabras: ["electronica", "mecanica"], hoja: "Las carreras de Electrónica o Mecánica suelen durar entre 4 y 5 años, con fuerte componente práctico de taller y laboratorio." },
    ],
  },
  N2a2: {
    pregunta: "¿Te referís a Informática o a Análisis de Sistemas?",
    descripcion: "Elección: Informática vs. Sistemas",
    opciones: [
      { palabras: ["informatica"], hoja: "La carrera de Informática suele durar entre 3 y 5 años, con foco en programación, desarrollo de software y bases de datos." },
      { palabras: ["sistemas", "analisis de sistemas"], hoja: "La carrera de Análisis de Sistemas suele durar entre 2 y 4 años, con foco en gestión, análisis e implementación de sistemas informáticos en organizaciones." },
    ],
  },
  N2b: {
    pregunta: "¿Es una carrera del área de salud o del área social/económica?",
    descripcion: "Humanas: salud vs. social/económica",
    opciones: [
      { palabras: ["salud", "medicina", "enfermeria", "psicologia"], destino: "N2b1" },
      { palabras: ["social", "economica", "economia", "derecho"], destino: "N2b2" },
    ],
  },
  N2b1: {
    pregunta: "¿Te referís a Medicina/Enfermería o a Psicología?",
    descripcion: "Elección: Medicina/Enfermería vs. Psicología",
    opciones: [
      { palabras: ["medicina", "enfermeria"], hoja: "Las carreras de Medicina o Enfermería suelen durar entre 4 y 6 años y requieren formación práctica obligatoria (pasantías o residencias)." },
      { palabras: ["psicologia"], hoja: "La carrera de Psicología suele durar entre 4 y 5 años, combinando formación teórica con prácticas clínicas o institucionales." },
    ],
  },
  N2b2: {
    pregunta: "¿Es una carrera económica/administrativa o jurídica/social?",
    descripcion: "Sociales: económica vs. jurídica",
    opciones: [
      { palabras: ["economica", "administrativa", "administracion", "economia"], destino: "N2b2a" },
      { palabras: ["juridica", "social", "derecho"], destino: "N2b2b" },
    ],
  },
  N2b2a: {
    pregunta: "¿Te referís a Administración o a Economía?",
    descripcion: "Elección: Administración vs. Economía",
    opciones: [
      { palabras: ["administracion"], hoja: "La carrera de Administración suele durar 4 años, con salida laboral en gestión de empresas y recursos humanos." },
      { palabras: ["economia"], hoja: "La carrera de Economía suele durar 4 años, con salida laboral en análisis financiero, banca o consultoría." },
    ],
  },
  N2b2b: {
    pregunta: "¿Te referís a Derecho o a Trabajo Social/Ciencias Políticas?",
    descripcion: "Elección: Derecho vs. Trabajo Social/CC.PP.",
    opciones: [
      { palabras: ["derecho"], hoja: "La carrera de Derecho suele durar entre 4 y 5 años, con salida laboral en el ejercicio jurídico, judicial o notarial." },
      { palabras: ["trabajo social", "ciencias politicas"], hoja: "Las carreras de Trabajo Social o Ciencias Políticas suelen durar entre 4 y 5 años, con salida laboral en sectores público, ONGs o gestión social." },
    ],
  },

  // ----- Rama 3: Becas o pasantías -----
  N3: {
    pregunta: "¿Querés saber sobre becas o sobre pasantías?",
    descripcion: "Trámites: becas o pasantías",
    opciones: [
      { palabras: ["beca"], hoja: "Las becas suelen otorgarse combinando criterios de mérito académico (rendimiento, promedio) y situación socioeconómica; conviene consultar en bienestar estudiantil de tu institución." },
      { palabras: ["pasantia"], hoja: "Las pasantías suelen realizarse en empresas externas a través de bolsas de empleo o convenios que tenga tu institución con el sector privado, y son una buena forma de ganar experiencia mientras estudiás." },
    ],
  },
};

export const MENSAJE_DEFAULT =
  "No entendí tu consulta, ¿podés reformularla? Puedo ayudarte con elección de carrera, información sobre carreras, o becas y pasantías.";

export const MAX_INTENTOS = 2;

// Normaliza texto: minúsculas y sin tildes
export function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
