# TFI Japan — website

Business website for **TFI Japan (The Finance International)**, a used-car business in Japan (buy · sell · export — cars, trucks & vehicles):

- **Buy** from local stock
- **Sell** your car (direct purchase, or sold through the Japanese auctions)
- **On-demand sourcing** — visitors send the make/model/year/budget they want on the
  request form; TFI finds the car and quotes a price

## Files
- `index.html` — the whole page (hero + car search, stock with filters, auction guide with grade explainer, sell-your-car, request form, FAQ)
- `styles.css` — styling (bright auction-site theme: white/light blue, navy + gold, red prices)
- `script.js` — stock list, filters/sorting, search + request-form logic
- The official emblem (owner-provided artwork: globe, Mt. Fuji, vehicles) is embedded
  in `index.html` as a data-URI image in the showcase band under the header — it is not
  a separate file because the GitHub connector used to maintain this repo cannot push
  binary files.

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
