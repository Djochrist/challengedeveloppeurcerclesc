const CONFIG={formUrl:"https://forms.gle/6rqXnz1rpiSCADeCA",currentQuizId:2,timezone:"Africa/Lubumbashi",deadline:"2026-08-16T23:59:00+02:00"};
const ambientCanvas=document.querySelector(".ambient-canvas");
if(ambientCanvas){
  const context=ambientCanvas.getContext("2d");
  const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let particles=[];
  let width=0;
  let height=0;
  let frame=0;
  function resizeCanvas(){
    const ratio=Math.min(window.devicePixelRatio||1,2);
    width=window.innerWidth;
    height=window.innerHeight;
    ambientCanvas.width=width*ratio;
    ambientCanvas.height=height*ratio;
    ambientCanvas.style.width=`${width}px`;
    ambientCanvas.style.height=`${height}px`;
    context.setTransform(ratio,0,0,ratio,0,0);
    particles=Array.from({length:Math.min(34,Math.max(18,Math.round(width/42)))},(_,index)=>({
      x:(index*97)%width,
      y:(index*151)%Math.max(height,1),
      radius:index%4===0?2:1,
      speed:.08+(index%5)*.018,
      drift:(index%3-1)*.12,
       color:"#b8ff00"
    }));
  }
  function drawAmbient(){
    context.clearRect(0,0,width,height);
    particles.forEach((particle,index)=>{
      if(!reducedMotion){
        particle.y-=particle.speed;
        particle.x+=particle.drift;
        if(particle.y<-20)particle.y=height+20;
        if(particle.x<-20)particle.x=width+20;
        if(particle.x>width+20)particle.x=-20;
      }
      context.beginPath();
      context.arc(particle.x,particle.y,particle.radius,0,Math.PI*2);
      context.fillStyle=particle.color;
      context.globalAlpha=.13;
      context.fill();
      particles.slice(index+1).forEach((other)=>{
        const distance=Math.hypot(particle.x-other.x,particle.y-other.y);
        if(distance<125){
          context.beginPath();
          context.moveTo(particle.x,particle.y);
          context.lineTo(other.x,other.y);
           context.strokeStyle="#b8ff00";
          context.globalAlpha=(1-distance/125)*.045;
          context.stroke();
        }
      });
    });
    context.globalAlpha=1;
    if(!reducedMotion)frame=window.requestAnimationFrame(drawAmbient);
  }
  resizeCanvas();
  drawAmbient();
  window.addEventListener("resize",resizeCanvas,{passive:true});
}
const quizContent={
  1:{label:"QUIZ 01 · LUNDI 10 AOÛT",status:"Permanent",title:"CHALLENGE DÉVELOPPEUR : LE GPS DU LIVREUR",body:"Une entreprise de livraison basée à Lubumbashi doit envoyer un coursier livrer un colis urgent à Kinshasa via plusieurs villes intermédiaires. Chaque portion de route prend un temps précis en minutes.",objective:"Objectif : trouver l'itinéraire qui minimise le temps total et retourner la durée minimale avec la liste ordonnée des villes.",author:"Van Djengu"},
  2:{label:"QUIZ 02 · MERCREDI 12 AOÛT",status:"Ouvert à tous",title:"CHALLENGE DÉVELOPPEUR : SYNCHRONISATION OFFLINE",body:"Imagine que tu dois concevoir une application utilisée chaque jour par des agents terrain pour enregistrer des opérations importantes. Les agents travaillent en déplacement avec des connexions Internet irrégulières et doivent terminer leur journée sans perdre de données.",objective:"Les participants ayant raté le quiz 1 peuvent également participer au quiz 2. Objectif : proposer une architecture fiable pour le stockage local, la reprise de synchronisation, la détection des conflits et la cohérence finale des données.",author:"Yves Kalume · Google Developer Expert Android"},
  3:{label:"QUIZ 03 · VENDREDI 14 AOÛT",status:"À venir",title:"Le quiz 3 arrive bientôt.",body:"Le troisième sujet sera publié le vendredi 14 août 2026.",objective:"Le quiz 1 reste accessible dans l'historique permanent.",author:"À confirmer"}
};
document.querySelectorAll("[data-form-link]").forEach((link)=>link.href=CONFIG.formUrl);
const quiz=quizContent[CONFIG.currentQuizId]||quizContent[1];
const label=document.querySelector("#current-quiz-label"),status=document.querySelector("#current-quiz-status"),content=document.querySelector("#current-quiz-content");
if(label)label.textContent=quiz.label;if(status)status.textContent=quiz.status;
if(content)content.innerHTML=`<h3>${quiz.title}</h3><div class="quiz-columns"><div><p>${quiz.body}</p><p><strong>${quiz.objective}</strong></p></div><div class="quiz-brief"><span>Auteur</span><strong>${quiz.author}</strong><span>Entrée</span><strong>Graphe orienté et pondéré</strong><span>Sortie</span><strong>Durée minimale + itinéraire</strong></div></div>`;
const revealItems=document.querySelectorAll("[data-reveal]");
if("IntersectionObserver" in window){const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.12});revealItems.forEach((item)=>observer.observe(item))}else{revealItems.forEach((item)=>item.classList.add("is-visible"))}
 function updateCountdown(){const remaining=Math.max(0,new Date(CONFIG.deadline).getTime()-Date.now());const values={days:Math.floor(remaining/86400000),hours:Math.floor(remaining/3600000)%24,minutes:Math.floor(remaining/60000)%60,seconds:Math.floor(remaining/1000)%60};Object.entries(values).forEach(([key,value])=>{const el=document.getElementById(key);if(el)el.textContent=String(value).padStart(2,"0")})}
updateCountdown();window.setInterval(updateCountdown,1000);
const menuButton=document.querySelector(".menu-btn"),menu=document.querySelector(".mobile-menu");
 if(menuButton&&menu){menuButton.addEventListener("click",()=>{const open=menuButton.getAttribute("aria-expanded")==="true";menuButton.setAttribute("aria-expanded",String(!open));menuButton.setAttribute("aria-label",open?"Ouvrir le menu":"Fermer le menu");menu.hidden=open});menu.querySelectorAll("a").forEach((link)=>link.addEventListener("click",()=>{menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Ouvrir le menu");menu.hidden=true}));document.addEventListener("click",(event)=>{if(menuButton.getAttribute("aria-expanded")==="true"&&!menu.contains(event.target)&&!menuButton.contains(event.target)){menuButton.click()}});window.addEventListener("resize",()=>{if(window.innerWidth>680&&menuButton.getAttribute("aria-expanded")==="true")menuButton.click()},{passive:true})}
 const rulesCarousel=document.querySelector(".rules-carousel");
 if(rulesCarousel){
   const rulesTrack=rulesCarousel.querySelector(".rules-track");
   const rulesCards=[...rulesCarousel.querySelectorAll(".rules-track article")];
   const previousButton=rulesCarousel.querySelector("[data-rules-prev]");
   const nextButton=rulesCarousel.querySelector("[data-rules-next]");
   const pauseButton=rulesCarousel.querySelector("[data-rules-pause]");
   const status=rulesCarousel.querySelector(".rules-status");
   let currentRule=0;
   let autoplay=true;
   let timer;
   const renderRules=()=>{rulesTrack.style.transform=`translateX(-${currentRule*100}%)`;status.textContent=`${String(currentRule+1).padStart(2,"0")} / ${String(rulesCards.length).padStart(2,"0")}`};
   const moveRules=(direction)=>{currentRule=(currentRule+direction+rulesCards.length)%rulesCards.length;renderRules()};
   const scheduleRules=()=>{window.clearInterval(timer);if(autoplay)timer=window.setInterval(()=>moveRules(1),6500)};
   previousButton.addEventListener("click",()=>{moveRules(-1);scheduleRules()});
   nextButton.addEventListener("click",()=>{moveRules(1);scheduleRules()});
   pauseButton.addEventListener("click",()=>{autoplay=!autoplay;pauseButton.textContent=autoplay?"Pause":"Lecture";pauseButton.setAttribute("aria-pressed",String(!autoplay));scheduleRules()});
   rulesCarousel.addEventListener("keydown",(event)=>{if(event.key==="ArrowLeft"){event.preventDefault();moveRules(-1);scheduleRules()}if(event.key==="ArrowRight"){event.preventDefault();moveRules(1);scheduleRules()}});
   let touchStartX=0;
   rulesCarousel.addEventListener("touchstart",(event)=>{touchStartX=event.changedTouches[0].clientX},{passive:true});
   rulesCarousel.addEventListener("touchend",(event)=>{const distance=event.changedTouches[0].clientX-touchStartX;if(Math.abs(distance)>45){moveRules(distance>0?-1:1);scheduleRules()}},{passive:true});
   renderRules();scheduleRules();
 }
const topButton=document.querySelector(".to-top");if(topButton){window.addEventListener("scroll",()=>topButton.classList.toggle("visible",window.scrollY>500),{passive:true});topButton.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}))}