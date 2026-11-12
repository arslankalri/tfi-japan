// ===== TFI Japan site logic =====
// Change this to the business email that should receive requests:
const BUSINESS_EMAIL = "arslankalri@gmail.com";

// ---- Stock list: edit this array to change the cars on the page ----
// price in yen (number). category: hybrid | kei | family | city | suv
const STOCK = [
  { make:"Toyota", model:"Prius", year:2019, mileage:"68,000 km", transmission:"Automatic", fuel:"Hybrid", price:1280000, category:"hybrid", tag:"Hybrid · Great economy" },
  { make:"Honda", model:"Fit", year:2020, mileage:"45,000 km", transmission:"Automatic", fuel:"Petrol", price:980000, category:"city", tag:"Compact · Easy to drive" },
  { make:"Nissan", model:"Serena", year:2018, mileage:"82,000 km", transmission:"Automatic", fuel:"Petrol", price:1150000, category:"family", tag:"8 seats · Family van" },
  { make:"Suzuki", model:"Hustler", year:2021, mileage:"30,000 km", transmission:"Automatic", fuel:"Petrol", price:890000, category:"kei", tag:"Kei car · Cheap to run" },
  { make:"Toyota", model:"Aqua", year:2019, mileage:"59,000 km", transmission:"Automatic", fuel:"Hybrid", price:870000, category:"hybrid", tag:"Hybrid · City car" },
  { make:"Daihatsu", model:"Move", year:2020, mileage:"41,000 km", transmission:"Automatic", fuel:"Petrol", price:720000, category:"kei", tag:"Kei car · Low tax" },
];

const yen = (n) => "¥" + n.toLocaleString("en-US");
let stockFilter = "all";
let stockSort = "featured";

function visibleStock(){
  let list = STOCK.slice();
  if (stockFilter === "hybrid") list = list.filter(c => c.fuel === "Hybrid");
  else if (stockFilter === "kei") list = list.filter(c => c.category === "kei");
  else if (stockFilter === "family") list = list.filter(c => c.category === "family");
  else if (stockFilter === "budget") list = list.filter(c => c.price < 1000000);
  if (stockSort === "low") list.sort((a,b) => a.price - b.price);
  if (stockSort === "high") list.sort((a,b) => b.price - a.price);
  if (stockSort === "new") list.sort((a,b) => b.year - a.year);
  return list;
}

function renderStock(){
  const grid = document.getElementById("stock-grid");
  const empty = document.getElementById("stock-empty");
  if(!grid) return;
  const list = visibleStock();
  if(empty) empty.hidden = list.length > 0;
  grid.innerHTML = list.map(c => `
    <article class="car">
      <div class="photo" aria-hidden="true"><span class="mk">${c.make}</span><span class="md">${c.model}</span></div>
      <div class="body">
        <h3>${c.year} ${c.make} ${c.model}</h3>
        <p class="price">${yen(c.price)} <small>incl. tax</small></p>
        <p class="specs">🛣 ${c.mileage} · ⚙️ ${c.transmission} · ⛽ ${c.fuel}</p>
        ${c.tag ? `<span class="tag">${c.tag}</span>` : ""}
        <p class="enquire"><a href="#request" onclick="prefill('${c.make}','${c.model}')">Enquire about this car</a></p>
      </div>
    </article>`).join("");
}

function prefill(make, model){
  const m = document.getElementById("f-make"), d = document.getElementById("f-model");
  if(m) m.value = make;
  if(d) d.value = model;
}

// ---- Request form: builds the message and opens the visitor's email app ----
function buildMessage(v){
  return [
    "TFI Japan — Website Request",
    "------------------------------",
    "Type: " + v.type,
    "Name: " + v.name,
    "Phone/WhatsApp: " + (v.phone || "-"),
    "Email: " + v.email,
    "Car make: " + v.make,
    "Car model: " + v.model,
    "Year: " + (v.yearfrom || "?") + " - " + (v.yearto || "?"),
    "Budget (buyers): " + (v.budget || "-"),
    "Mileage (sellers): " + (v.mileage || "-"),
    "Transmission: " + v.transmission,
    "Fuel: " + v.fuel,
    "Notes: " + (v.notes || "-"),
  ].join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  renderStock();

  // category tiles
  document.querySelectorAll(".cat").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      stockFilter = btn.dataset.filter || "all";
      renderStock();
      document.getElementById("stock").scrollIntoView({ behavior: "smooth" });
    });
  });
  const sortSel = document.getElementById("stock-sort");
  if(sortSel) sortSel.addEventListener("change", () => { stockSort = sortSel.value; renderStock(); });

  // hero search -> prefill the request form
  const search = document.getElementById("hero-search");
  if(search) search.addEventListener("submit", (e) => {
    e.preventDefault();
    const mk = document.getElementById("s-make").value.trim();
    const md = document.getElementById("s-model").value.trim();
    const bg = document.getElementById("s-budget").value;
    if(mk) document.getElementById("f-make").value = mk;
    if(md) document.getElementById("f-model").value = md;
    if(bg) document.getElementById("f-budget").value = "Up to " + bg;
    document.getElementById("request").scrollIntoView({ behavior: "smooth" });
  });

  // request-type pills
  const typeSel = document.getElementById("f-type");
  document.querySelectorAll(".pill").forEach(p => {
    p.addEventListener("click", () => {
      document.querySelectorAll(".pill").forEach(x => x.classList.remove("active"));
      p.classList.add("active");
      if(typeSel) typeSel.value = p.dataset.type;
    });
  });

  // request form submit
  const form = document.getElementById("request-form");
  if(form) form.addEventListener("submit", (e) => {
    e.preventDefault();
    const g = (id) => (document.getElementById(id).value || "").trim();
    const v = {
      type: g("f-type"), name: g("f-name"), phone: g("f-phone"), email: g("f-email"),
      make: g("f-make"), model: g("f-model"), yearfrom: g("f-yearfrom"), yearto: g("f-yearto"),
      budget: g("f-budget"), mileage: g("f-mileage"), transmission: g("f-transmission"),
      fuel: g("f-fuel"), notes: g("f-notes"),
    };
    const msg = buildMessage(v);
    const subject = encodeURIComponent("TFI Japan request: " + v.type + " — " + v.make + " " + v.model);
    window.location.href = "mailto:" + BUSINESS_EMAIL + "?subject=" + subject + "&body=" + encodeURIComponent(msg);
    const result = document.getElementById("form-result");
    const output = document.getElementById("form-output");
    if(result && output){ output.value = msg; result.hidden = false; }
  });

  const copyBtn = document.getElementById("copy-btn");
  if(copyBtn) copyBtn.addEventListener("click", () => {
    const output = document.getElementById("form-output");
    output.select();
    if(navigator.clipboard) navigator.clipboard.writeText(output.value);
    copyBtn.textContent = "Copied ✔";
    setTimeout(() => copyBtn.textContent = "Copy request", 2000);
  });
});
