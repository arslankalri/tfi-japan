// ===== TFI Japan site logic =====
// Change this to the business email that should receive requests:
const BUSINESS_EMAIL = "arslankalri@gmail.com";

// ---- Stock list: edit this array to change the cars on the page ----
// price in yen (number). tag is optional.
const STOCK = [
  { make:"Toyota", model:"Prius", year:2019, mileage:"68,000 km", transmission:"Automatic", fuel:"Hybrid", price:1280000, tag:"Hybrid · Great economy", emoji:"🚗" },
  { make:"Honda", model:"Fit", year:2020, mileage:"45,000 km", transmission:"Automatic", fuel:"Petrol", price:980000, tag:"Compact · Easy to drive", emoji:"🚙" },
  { make:"Nissan", model:"Serena", year:2018, mileage:"82,000 km", transmission:"Automatic", fuel:"Petrol", price:1150000, tag:"8 seats · Family van", emoji:"🚐" },
  { make:"Suzuki", model:"Hustler", year:2021, mileage:"30,000 km", transmission:"Automatic", fuel:"Petrol", price:890000, tag:"Kei car · Cheap to run", emoji:"🚗" },
  { make:"Toyota", model:"Aqua", year:2019, mileage:"59,000 km", transmission:"Automatic", fuel:"Hybrid", price:870000, tag:"Hybrid · City car", emoji:"🚙" },
  { make:"Daihatsu", model:"Move", year:2020, mileage:"41,000 km", transmission:"Automatic", fuel:"Petrol", price:720000, tag:"Kei car · Low tax", emoji:"🚗" },
];

const yen = (n) => "¥" + n.toLocaleString("en-US");

function renderStock(){
  const grid = document.getElementById("stock-grid");
  if(!grid) return;
  if(!STOCK.length){
    grid.innerHTML = '<p class="section-sub">Stock is being updated — please use the request form and we will find your car.</p>';
    return;
  }
  grid.innerHTML = STOCK.map(c => `
    <article class="car">
      <div class="photo" aria-hidden="true">${c.emoji}</div>
      <div class="body">
        <h3>${c.year} ${c.make} ${c.model}</h3>
        <p class="specs">${c.mileage} · ${c.transmission} · ${c.fuel}</p>
        <p class="price">${yen(c.price)}</p>
        ${c.tag ? `<span class="tag">${c.tag}</span>` : ""}
        <p style="margin:12px 0 0"><a href="#request" onclick="prefill('${c.make}','${c.model}')">Enquire about this car →</a></p>
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
  const lines = [
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
  ];
  return lines.join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  renderStock();
  const form = document.getElementById("request-form");
  if(!form) return;
  form.addEventListener("submit", (e) => {
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
  if(copyBtn){
    copyBtn.addEventListener("click", () => {
      const output = document.getElementById("form-output");
      output.select();
      navigator.clipboard && navigator.clipboard.writeText(output.value);
      copyBtn.textContent = "Copied ✔";
      setTimeout(() => copyBtn.textContent = "Copy request", 2000);
    });
  }
});
