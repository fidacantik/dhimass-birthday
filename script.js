const pages = [...document.querySelectorAll(".page")];
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const themeBtn = document.getElementById("themeBtn");
const effects = document.getElementById("effects");

let isPlaying = false;

/* ---------- NAVIGATION ---------- */
function showPage(id){
    pages.forEach(p => p.classList.remove("active"));
    const target = document.getElementById(id);
    if(target) target.classList.add("active");
}

document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
        const next = btn.dataset.next;
        if(next === "letter" && !isPlaying) await playMusic();
        showPage(next);
    });
});

/* ---------- MUSIC ---------- */
async function playMusic(){
    try{
        music.volume = 0.55;
        await music.play();
        isPlaying = true;
        musicBtn.textContent = "❚❚";
        musicBtn.classList.add("playing");
    }catch(err){
        console.error("Musik tidak dapat diputar:", err);
        musicBtn.textContent = "♫";
    }
}
function pauseMusic(){
    music.pause();
    isPlaying = false;
    musicBtn.textContent = "♫";
    musicBtn.classList.remove("playing");
}
musicBtn.addEventListener("click", () => isPlaying ? pauseMusic() : playMusic());

/* ---------- WISH ---------- */
const blowBtn = document.getElementById("blowBtn");
const flame = document.getElementById("flame");
const wishMessage = document.getElementById("wishMessage");
const afterWishBtn = document.getElementById("afterWishBtn");

blowBtn.addEventListener("click", () => {
    flame.classList.add("off");
    wishMessage.textContent = "Harapannya sudah dikirim ke langit. ✨ Semoga satu per satu jadi nyata.";
    blowBtn.classList.add("hidden");
    launchConfetti("wish");

    setTimeout(() => {
        afterWishBtn.classList.remove("hidden");
    }, 850);
});

afterWishBtn.addEventListener("click", () => {
    showPage("secret");
});

/* ---------- SECRET PAGE FIX ---------- */
const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const passwordMessage = document.getElementById("passwordMessage");

const SECRET_PASSWORD = "190909";

function unlockSecret(){
    const entered = passwordInput.value.trim().toLowerCase();

    if(entered === SECRET_PASSWORD){
        passwordMessage.textContent = "Password benar. Membuka halaman rahasia... 💙";
        passwordMessage.style.color = "#4f9cbd";
        launchConfetti("secret");

        setTimeout(() => {
            showPage("secret-page");
        }, 900);

    }else{
        passwordMessage.textContent = "Password belum tepat ♡";
        passwordMessage.style.color = "#b56f7d";
        document.querySelector(".lock").classList.remove("shake");
        void document.querySelector(".lock").offsetWidth;
        document.querySelector(".lock").classList.add("shake");
        passwordInput.select();
    }
}

unlockBtn.addEventListener("click", unlockSecret);
passwordInput.addEventListener("keydown", e => {
    if(e.key === "Enter") unlockSecret();
});

/* ---------- PHOTO POPUP ---------- */
const modal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".photo,.booth-photo").forEach(img => {
    img.addEventListener("click", () => {
        modalImage.src = img.src;
        modal.classList.add("open");
    });
});
closeModal.addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", e => {
    if(e.target === modal) modal.classList.remove("open");
});

/* ---------- DARK MODE ---------- */
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    themeBtn.textContent = dark ? "☀" : "☾";
    localStorage.setItem("birthdayTheme", dark ? "dark" : "light");
});
if(localStorage.getItem("birthdayTheme") === "dark"){
    document.body.classList.add("dark");
    themeBtn.textContent = "☀";
}

/* ---------- WOW CONFETTI ---------- */
function launchConfetti(type){
    const count = type === "secret" ? 95 : 75;

    const ring = document.createElement("div");
    ring.className = "burst-ring";
    effects.appendChild(ring);
    setTimeout(() => ring.remove(), 1100);

    for(let i=0;i<count;i++){
        const c = document.createElement("span");
        c.className = "confetti";

        const angle = Math.random() * Math.PI * 2;
        const distance = 180 + Math.random() * 470;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance + (90 + Math.random()*220);

        c.style.setProperty("--x", `${x}px`);
        c.style.setProperty("--y", `${y}px`);
        c.style.setProperty("--r", `${Math.random()*1400-700}deg`);
        c.style.setProperty("--duration", `${1.4 + Math.random()*1.8}s`);
        c.style.background = `hsl(${190 + Math.random()*45} ${65 + Math.random()*25}% ${65 + Math.random()*22}%)`;

        if(i % 7 === 0){
            c.textContent = "♡";
            c.style.background = "transparent";
            c.style.color = "#fff2aa";
        }

        effects.appendChild(c);
        setTimeout(() => c.remove(), 3600);
    }

    for(let i=0;i<30;i++){
        const s = document.createElement("span");
        s.className = "spark";
        s.textContent = i % 2 ? "✦" : "✧";

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random()*300;

        s.style.setProperty("--x", `${Math.cos(angle)*distance}px`);
        s.style.setProperty("--y", `${Math.sin(angle)*distance}px`);

        effects.appendChild(s);
        setTimeout(() => s.remove(), 1700);
    }
}

/* ---------- FLOATING MINI STARS ---------- */
function floatingStar(){
    const s = document.createElement("span");
    s.textContent = Math.random() > .5 ? "✦" : "·";
    s.style.position = "fixed";
    s.style.left = Math.random()*100 + "vw";
    s.style.bottom = "-20px";
    s.style.zIndex = "2";
    s.style.opacity = ".55";
    s.style.fontSize = (8+Math.random()*12)+"px";
    s.style.pointerEvents = "none";
    s.style.transition = "transform 8s linear, opacity 8s linear";
    effects.appendChild(s);

    requestAnimationFrame(() => {
        s.style.transform = `translateY(-110vh)`;
        s.style.opacity = "0";
    });

    setTimeout(() => s.remove(), 8200);
}
setInterval(floatingStar, 900);

/* ===== PERSONAL SCRAPBOOK EXTRAS ===== */
document.querySelectorAll(".flip-card").forEach(card=>{
    card.addEventListener("click",()=>card.classList.toggle("flipped"));
});
document.querySelectorAll(".map-stop").forEach(stop=>{
    stop.addEventListener("click",()=>{
        document.getElementById("mapNote").textContent=stop.dataset.note;
    });
});
const vinyl=document.getElementById("vinyl");
const songPlayBtn=document.getElementById("songPlayBtn");
if(songPlayBtn){
    songPlayBtn.addEventListener("click",async()=>{
        if(isPlaying){
            pauseMusic();
            vinyl.classList.remove("playing");
            songPlayBtn.textContent="Putar lagu ♫";
        }else{
            await playMusic();
            if(isPlaying){
                vinyl.classList.add("playing");
                songPlayBtn.textContent="Jeda lagu ❚❚";
            }
        }
    });
}
document.querySelectorAll(".envelope").forEach(envelope=>{
    envelope.addEventListener("click",()=>{
        document.getElementById("openNote").textContent=envelope.dataset.note;
        launchConfetti("secret");
    });
});

/* SMOOTHER SCRAPBOOK SWIPE */
document.querySelectorAll(".next-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const current=btn.closest(".page");
    const target=document.getElementById(btn.dataset.next);
    if(!current||!target||current===target)return;
    document.querySelectorAll(".page").forEach(p=>{
      p.classList.remove("page-active","page-entering","page-leaving");
    });
    current.classList.add("page-leaving");
    target.classList.add("page-entering","page-active");
    setTimeout(()=>target.classList.remove("page-entering"),30);
    setTimeout(()=>current.classList.remove("page-leaving"),720);
  });
});

/* =========================
   MEMORY TICKET POPUP
========================= */

const ticketModal =
    document.getElementById("ticketModal");

const ticketPhoto =
    document.getElementById("ticketModalPhoto");

const ticketTitle =
    document.getElementById("ticketModalTitle");

const ticketStory =
    document.getElementById("ticketModalStory");

const ticketNumber =
    document.getElementById("ticketModalNo");


/* KLIK TIKET */

document
    .querySelectorAll(".ticket")
    .forEach((ticket, index) => {

        ticket.addEventListener("click", () => {

            ticketPhoto.src =
                ticket.dataset.ticketPhoto;

            ticketTitle.textContent =
                ticket.dataset.ticketTitle;

            ticketStory.textContent =
                ticket.dataset.ticketStory;

            ticketNumber.textContent =
                "POSTCARD · 00" + (index + 1);


            ticketModal.classList.add("show");

            ticketModal.setAttribute(
                "aria-hidden",
                "false"
            );


            /* confetti kalau fungsi ini
               sudah ada di project kamu */

            if (
                typeof launchConfetti === "function"
            ) {
                launchConfetti("secret");
            }

        });

    });


/* TUTUP */

function closeTicketModal() {

    ticketModal.classList.remove("show");

    ticketModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


document
    .getElementById("ticketClose")
    .addEventListener(
        "click",
        closeTicketModal
    );


/* klik area luar popup */

ticketModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === ticketModal
        ) {
            closeTicketModal();
        }

    }
);


/* tombol ESC */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeTicketModal();

        }

    }
);