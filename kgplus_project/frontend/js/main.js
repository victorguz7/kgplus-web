window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

document.addEventListener("DOMContentLoaded", () => {

  /* ================= HERO PARALLAX ================= */
  const hero = document.querySelector(".hero");

  if (hero) {
    window.addEventListener("scroll", () => {
      let offset = window.scrollY;
      hero.style.backgroundPosition = `center calc(50% + ${offset * 0.4}px)`;
    });

    // Parallax de movimiento del mouse
    hero.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 30;
      const y = (clientY / window.innerHeight - 0.5) * 30;
      hero.style.transform = `perspective(1000px) rotateX(${-y * 0.1}deg) rotateY(${x * 0.1}deg)`;
    });
  }


  /* ================= PRODUCTOS ================= */
  fetch("https://kgplus-web.onrender.com/productos")
    .then(res => {
      if (!res.ok) throw new Error("Error en el servidor");
      return res.json();
    })
    .then(data => {
      const contenedor = document.getElementById("lista-productos");

      if (!contenedor) return;

      contenedor.innerHTML = "";

      data.forEach((p, index) => {
        const div = document.createElement("div");
        div.className = "card animado";
        div.style.backgroundImage = `url('${p.img}')`;
        div.style.transitionDelay = `${index * 0.15}s`;
        div.innerHTML = `
            <div class="overlay">
              <strong>${p.nombre}</strong>
              <h3>${p.nombre}</h3>
              <p>${p.descripcion}</p>
            </div>
        `;
        contenedor.appendChild(div);
      });


      activarAnimaciones(); // 🔥 IMPORTANTE
    })
    .catch(err => {
      console.error("❌ Error al cargar productos:", err);
    });

  /* ================= HEADER ================= */
  const header = document.getElementById("header");
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  window.addEventListener("scroll", () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ================= FORMULARIO (FORMSPREE) ================= */
  const form = document.getElementById("form-contacto");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const btn = document.getElementById("btn-enviar");
      btn.innerText = "Enviando...";
      btn.disabled = true;

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          status.style.display = "block";
          status.style.color = "#4CAF50";
          status.innerText = "✅ Obrigado! Recebemos sua mensagem com sucesso.";
          form.reset();
        } else {
          throw new Error();
        }
      } catch (error) {
        status.style.display = "block";
        status.style.color = "#f44336";
        status.innerText = "❌ Ocorreu um problema ao enviar. Por favor, tente novamente.";
      } finally {
        btn.innerText = "Enviar mensagem";
        btn.disabled = false;
      }
    });
  }

  /* ================= ANIMACIONES ================= */
  function activarAnimaciones() {
    const elementos = document.querySelectorAll(
      ".card, .servicio, .productos h2, .hero, .contacto"
    );

    // Evita duplicar animaciones
    elementos.forEach(el => {
      if (!el.classList.contains("animado")) {
        el.classList.add("animado");
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.15
    });

    elementos.forEach(el => observer.observe(el));
  }

  /* ================= VOLVER ARRIBA ================= */
  const backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ================= NAV LINKS ================= */
  const navLinks = document.querySelectorAll("#nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("active");
    });
  });

  /* ================= MODAL CATALOGO ================= */
  const openModal = document.getElementById("open-catalogo");
  const closeModal = document.getElementById("close-catalogo");
  const modal = document.getElementById("modal-catalogo");

  if (openModal && modal && closeModal) {
    console.log("✅ Modal elements found");

    openModal.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("📂 Opening modal and fetching catalogo");
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; 

      const grid = document.getElementById("catalogo-grid-content");
      if (!grid) return;

      grid.innerHTML = "<p style='color:white; text-align:center; grid-column: 1/-1;'>Carregando catálogo...</p>";

      try {
        const response = await fetch("https://kgplus-web.onrender.com/catalogo");
        const data = await response.json();
        
        grid.innerHTML = "";
        data.forEach(item => {
          const div = document.createElement("div");
          div.className = "catalogo-item";
          div.innerHTML = `
            <img src="${item.img}" alt="${item.nombre}">
            <h4>${item.nombre}</h4>
          `;
          grid.appendChild(div);
        });
      } catch (err) {
        grid.innerHTML = "<p style='color:red; text-align:center; grid-column: 1/-1;'>Erro ao carregar catálogo. Tente novamente.</p>";
      }
    });


    closeModal.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("✖️ Closing modal via X");
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        console.log("🌑 Closing modal via overlay click");
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    // Tecla ESC para cerrar
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  } else {
    console.error("❌ Modal elements NOT found", { openModal, modal, closeModal });
  }

  activarAnimaciones();

  /* ================= CONTADORES ANIMADOS ================= */
  const statsSection = document.querySelector(".stats");
  const stats = document.querySelectorAll(".stat-number");
  let started = false;

  function countUp(el) {
    const target = parseInt(el.getAttribute("data-target"));
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target + (target >= 500 || target >= 1000 ? "+" : "");
        if (target == 24) el.innerText = "24/7";
        clearInterval(timer);
      } else {
        el.innerText = Math.ceil(current);
      }
    }, 20);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      stats.forEach(s => countUp(s));
      started = true;
    }
  }, { threshold: 0.5 });

  if (statsSection) statsObserver.observe(statsSection);

  /* ================= FAQ ACCORDION ================= */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const active = document.querySelector(".faq-item.active");
      if (active && active !== item) active.classList.remove("active");
      item.classList.toggle("active");
    });
  });

  /* ================= BUSCADOR CATÁLOGO ================= */
  const searchInput = document.getElementById("catalogo-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const items = document.querySelectorAll(".catalogo-item");
      items.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(term) ? "block" : "none";
      });
    });
  }

  /* ================= MODALES SERVICIOS ================= */
  const modalServ = document.getElementById("modal-servicio");
  const closeServ = document.getElementById("close-servicio");
  const servTitulo = document.getElementById("servicio-modal-titulo");
  const servCuerpo = document.getElementById("servicio-modal-cuerpo");

  if (modalServ && closeServ) {
    const infoServicios = {
      "Manutenção": "Nosso serviço técnico é especializado em balanças industriais de todas as marcas. Oferecemos reparos mecânicos e eletrônicos, troca de células de carga e limpeza preventiva para garantir que sua operação nunca pare.",
      "Calibração": "Realizamos calibrações com padrões rastreáveis e certificados conforme as normas exigidas pelos órgãos de controle. Garantimos a precisão absoluta de seus equipamentos de pesagem.",
      "Verificação": "Suporte completo para verificação oficial e legal de instrumentos de medição. Ajudamos sua empresa a manter-se em compliance com todas as regulações industriais vigentes."
    };

    document.querySelectorAll(".servicio").forEach(card => {
      card.style.cursor = "pointer";
      card.addEventListener("click", () => {
        const titleText = card.querySelector("h3").innerText.trim();
        servTitulo.innerText = titleText;
        servCuerpo.innerText = infoServicios[titleText] || "Detalhes técnicos avançados para sua indústria.";
        modalServ.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    closeServ.addEventListener("click", (e) => {
      e.stopPropagation();
      modalServ.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modalServ) {
        modalServ.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    // Tecla ESC para cerrar servicio
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalServ.classList.contains("active")) {
        modalServ.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }
});


// PARTICLES JS INITIALIZATION
if (window.particlesJS) {
  particlesJS("particles-js", {
    "particles": {
      "number": { "value": 70, "density": { "enable": true, "value_area": 1000 } },
      "color": { "value": "#00f2ff" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.3, "random": true },
      "size": { "value": 2, "random": true },
      "line_linked": { "enable": true, "distance": 150, "color": "#00f2ff", "opacity": 0.1, "width": 1 },
      "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }
    },
    "retina_detect": true
  });
}
