const screens = {
  cover: document.getElementById("cover"),
  envelope: document.getElementById("envelopeScreen"),
  letter: document.getElementById("letterScreen"),
  final: document.getElementById("finalScreen")
};

const enterBtn = document.getElementById("enterBtn");
const envelope = document.getElementById("envelope");
const openHint = document.getElementById("openHint");
const paper = document.getElementById("paper");
const pageText = document.getElementById("pageText");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const restartBtn = document.getElementById("restartBtn");

function showScreen(name, cinematic = true){
  Object.values(screens).forEach(s => {
    s.classList.remove("active", "arriving", "leaving", "focus-letter");
  });

  const target = screens[name];
  target.classList.add("active");

  if(cinematic){
    // The animation class is added one frame after activation so the
    // browser can interpolate from the hidden/deep state.
    requestAnimationFrame(() => target.classList.add("arriving"));
    setTimeout(() => target.classList.remove("arriving"), 1500);
  }
}

const pages = [
`Sabes lo que experimento contigo es algo que no requiere esfuerzo alguno.

No necesito convencerme de nada. No tengo que buscar razones, excusas ni justificaciones porque, simplemente, está presente, como una suave brisa que llena cada rincón de mi ser.

Vives en cada latido y respiro de manera tan natural, como si siempre hubiera estado esperando por ti, aunque no lo supiera.`,

`Me importas.

No como una idea pasajera, no como un deseo que se desvanece con el tiempo, sino como una realidad tangible y profunda.

Me importas tanto en tus momentos de bienestar como en los de adversidad, en tus instantes de gloria y en los de dificultad.

Me importas cuando sonríes y cuando tropiezas, cuando tu rostro irradia felicidad y también cuando está cubierto por el velo de la tristeza.

Me importas cuando estás cerca y cuando estás lejos, aunque la distancia se interponga entre nosotros.`,

`No existen condiciones, ni peros, ni máscaras que oculten mi verdadero sentir.

Siento que contigo puedo ser yo mismo sin temor. Que no tengo que esconder mis dudas, mis heridas, ni mis sueños ocultos.

Que no tengo que fingir fortaleza cuando estoy roto, ni ocultar mi alegría cuando algo me emociona profundamente.

Contigo, todo es más honesto, más humano, más real que nunca antes.`,

`Gracias por enseñarme a ser una mejor persona.

Aunque no lo parezca, tú me has ayudado a ser una mejor persona y te lo agradezco un montón.

No deseo impresionarte, ni hacerte creer que soy alguien perfecto. No quiero que tengas una imagen distorsionada de mí.

Solo quiero que sepas que estoy aquí, dispuesto a ser parte de tu vida.`,

`Que si me permites, caminaré contigo.

No para salvarte, ni para completarte, sino para acompañarte a través de los caminos que el destino nos presente.

Para compartir, para construir un futuro que tenga sentido para ambos, que nos haga crecer como personas y como seres unidos.

Quiero acompañarte en tus planes y también quiero tenerte en los míos. Quiero caminar a tu lado y construir algo bonito juntos.`,

`Lo que siento por ti no es una promesa vacía que se lleva el viento.

Es una decisión diaria, constante, auténtica. Es elegirte cada día con los ojos bien abiertos.

Es desear conocerte más allá de lo que muestras al mundo, más allá de las apariencias superficiales.

Es respetar tus tiempos, tus espacios, tus miedos internos, y aceptarlos como parte de quien eres.

Es desear sumar, no restar; desear crecer, no controlar; desear amar, no poseer.`,

`Y si alguna vez dudas de lo que significas para mí, si alguna vez el mundo te hace sentir que no vales lo suficiente, quiero que recuerdes esto:

Para mí, eres luz, esa luz que ilumina mis días nublados.

Eres calma, esa paz que encuentro en tu mirada; eres fuerza, esa energía imparable que me inspira.

Eres esa parte del día que espero con ansias porque me da vida.

Eres esa presencia que me hace sentir que todo está bien, incluso cuando nada lo está.`,

`No sé qué sucederá mañana, el futuro es incierto y no puedo prometerte que todo será fácil.

Pero sí puedo prometerte que lo que siento por ti es verdadero, genuino y eterno.

Que no se basa en lo que haces, ni en lo que das, sino en quién eres.

Y eso, para mí, ya es suficiente para querer seguir a tu lado.`,

`Que vergüenza tener que decir que me traes loco.

Eso ya no es un secreto; a estas alturas lo sabe todo el mundo. Ya es imposible que lo oculte.

Pero si quieres que te diga algo nuevo, te voy a decir una...

Te estoy queriendo de una forma que no conocía.

Me traes como quieres y, mientras más pasa el tiempo, me sigues gustando.

Sigo deseando que esto funcione y ser uno de esos hombres afortunados de pasar la vida con una sola mujer.`
];

let currentPage = 0;
let busy = false;

function renderPage(direction = 0){
  pageText.innerHTML = pages[currentPage]
    .split(/\n\n+/)
    .map(p => `<p>${p.replace(/\n/g," ")}</p>`)
    .join("");

  pageNumber.textContent = `PÁGINA ${currentPage + 1}`;
  progress.textContent = `${currentPage + 1} / ${pages.length}`;
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = false;
}

function changePage(direction){
  if(busy) return;
  const next = currentPage + direction;

  if(next < 0) return;
  if(next >= pages.length){
    showScreen("final", true);
    return;
  }

  busy = true;
  paper.classList.add("flip-out");

  setTimeout(() => {
    currentPage = next;
    renderPage(direction);
    paper.classList.remove("flip-out");
    paper.classList.add("flip-in");

    setTimeout(() => {
      paper.classList.remove("flip-in");
      busy = false;
    }, 550);
  }, 420);
}

enterBtn.addEventListener("click", () => {
  // The cover becomes the "camera": it moves toward the viewer while
  // the envelope scene arrives from depth.
  screens.cover.classList.add("leaving");
  setTimeout(() => {
    screens.cover.classList.remove("active", "leaving");
    showScreen("envelope", true);
  }, 820);
});

envelope.addEventListener("click", () => {
  if(envelope.classList.contains("open")) return;

  screens.envelope.classList.add("focus-letter");
  envelope.classList.add("open");
  openHint.textContent = "El sobre se ha abierto...";

  // Let the flap and paper physically move before the camera changes scene.
  setTimeout(() => {
    currentPage = 0;
    renderPage();
    showScreen("letter", true);
  }, 1450);
});

prevBtn.addEventListener("click", () => changePage(-1));
nextBtn.addEventListener("click", () => changePage(1));

document.addEventListener("keydown", e => {
  if(!screens.letter.classList.contains("active")) return;
  if(e.key === "ArrowRight") changePage(1);
  if(e.key === "ArrowLeft") changePage(-1);
});

restartBtn.addEventListener("click", () => {
  envelope.classList.remove("open");
  screens.envelope.classList.remove("focus-letter");
  openHint.textContent = "Haz clic en el sobre para abrirlo";
  currentPage = 0;
  showScreen("cover", true);
});

renderPage();


// ---------------------------------------------------------
// Parallax 3D sutil: la cámara sigue al puntero.
// No modifica el contenido; solo añade profundidad visual.
// ---------------------------------------------------------
const envelopeCamera = document.querySelector(".envelope-camera");
const book = document.getElementById("book");

function reset3D(){
  if(envelopeCamera) envelopeCamera.style.transform = "";
  if(book) book.style.transform = "";
}

document.addEventListener("pointermove", (e) => {
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if(screens.envelope.classList.contains("active") && envelopeCamera){
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    envelopeCamera.style.transform =
      `rotateY(${x * 3.2}deg) rotateX(${-y * 2.4}deg)`;
  }

  if(screens.letter.classList.contains("active") && book){
    const r = book.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const clampedX = Math.max(-0.5, Math.min(0.5, x));
    const clampedY = Math.max(-0.5, Math.min(0.5, y));

    book.style.transform =
      `rotateY(${clampedX * 2.6}deg) rotateX(${-clampedY * 2.1}deg)`;
  }
});

document.addEventListener("pointerleave", reset3D);
window.addEventListener("blur", reset3D);

// Touch devices: tapping/dragging the paper should not leave a
// persistent tilt.
window.addEventListener("touchend", () => {
  if(window.innerWidth <= 600) reset3D();
}, {passive:true});
