# TFI Japan — website

Business website for **TFI Japan (Finance International)**, a used-car business in Japan:

- **Buy** from local stock
- **Sell** your car (direct purchase, or sold through the Japanese auctions)
- **On-demand sourcing** — visitors send the make/model/year/budget they want on the
  request form; TFI finds the car and quotes a price

## Files
- `index.html` — the whole page (hero, how it works, stock, sell-your-car, request form, FAQ, contact)
- `styles.css` — styling (navy + gold "finance" theme)
- `script.js` — stock list + request-form logic

## Editing
- **Stock:** edit the `STOCK` array at the top of `script.js` (make, model, year,
  mileage, transmission, fuel, price in yen). The page re-renders automatically.
  The cars currently listed are sample placeholders — replace them with real stock
  before advertising the site.
- **Request inbox:** requests are sent by email. Change `BUSINESS_EMAIL` at the top
  of `script.js` to the address that should receive them. (The form opens the
  visitor's email app with the request pre-written, and also offers a copy button.)
- **Photos:** stock cards currently use a simple graphic panel. To use real photos,
  add an `image` field per car and swap the `.photo` block in `script.js`.

## Going live
Enable GitHub Pages for this repo (Settings → Pages → deploy from `main`, root)
or connect the repo to Lovable/Vercel/Netlify — it is a plain static site,
no build step needed.
