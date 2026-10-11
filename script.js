/* ===== CONFIGURATION: edit only this block ===== */
const WHATSAPP_NUMBER = "";   // country code + number, digits only, e.g. "919876543210". Empty = chat button disabled.
const WHATSAPP_MESSAGE = "Hello, I would like to know more.";
const WHATSAPP_AUTO_OPEN_MS = 0;  // popup opens by itself after this many ms (0 = only on click)
const FORM_ENDPOINT = "";     // paste a form-service URL (Formspree, Getform...). Empty = form validates but does not send.
const LINKS = {               // "#section-id" or full URL
  button1:"#section-2", button2:"#contact",
  card1:"#contact", card2:"#contact", card3:"#contact",
  social1:"#", social2:"#", social3:"#"
};
/* ===== no editing needed below ===== */
document.querySelectorAll("[data-link]").forEach(a=>{const u=LINKS[a.dataset.link];if(u)a.href=u;if(/^https?:/.test(u||"")){a.target="_blank";a.rel="noopener"}});
document.getElementById("year").textContent=new Date().getFullYear();

const burger=document.getElementById("burger"),nav=document.getElementById("nav");
const setMenu=o=>{nav.classList.toggle("open",o);burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Close menu":"Open menu")};
burger.onclick=()=>setMenu(!nav.classList.contains("open"));
nav.onclick=e=>{if(e.target.closest("a"))setMenu(false)};

const wa=document.getElementById("wa"),fab=document.getElementById("wa-fab"),go=document.getElementById("wa-go"),note=document.getElementById("wa-note");
const setWa=o=>{wa.classList.toggle("open",o);fab.setAttribute("aria-expanded",o)};
fab.onclick=()=>setWa(!wa.classList.contains("open"));
document.getElementById("wa-label").onclick=()=>setWa(true);
document.getElementById("wa-x").onclick=()=>setWa(false);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){setMenu(false);setWa(false)}});
const num=WHATSAPP_NUMBER.replace(/\D/g,"");
if(num){go.href="https://wa.me/"+num+"?text="+encodeURIComponent(WHATSAPP_MESSAGE)}
else{go.setAttribute("aria-disabled","true");go.onclick=e=>e.preventDefault();note.textContent="Number not set yet. Add WHATSAPP_NUMBER in the script."}
if(WHATSAPP_AUTO_OPEN_MS>0)setTimeout(()=>setWa(true),WHATSAPP_AUTO_OPEN_MS);

const form=document.getElementById("form"),status=document.getElementById("status");
const rules={name:v=>v.trim()?"":"Enter your name.",email:v=>!v.trim()?"Enter your email.":/^\S+@\S+\.\S+$/.test(v)?"":"Enter a valid email.",message:v=>v.trim()?"":"Enter a message."};
const check=f=>{const m=rules[f.name](f.value);document.getElementById("e-"+f.name).textContent=m;f.setAttribute("aria-invalid",!!m);return !m};
Object.keys(rules).forEach(n=>form.elements[n].addEventListener("blur",e=>check(e.target)));
form.addEventListener("submit",async e=>{
  e.preventDefault();status.textContent="";
  if(Object.keys(rules).map(n=>check(form.elements[n])).includes(false)){form.querySelector("[aria-invalid=true]").focus();return}
  if(!FORM_ENDPOINT){status.textContent="Form is valid, but sending is not connected yet. Add FORM_ENDPOINT in the script.";return}
  try{const r=await fetch(FORM_ENDPOINT,{method:"POST",headers:{Accept:"application/json"},body:new FormData(form)});if(!r.ok)throw 0;status.textContent="Your enquiry was sent.";form.reset()}
  catch{status.textContent="Sending failed. Please try again."}
});
