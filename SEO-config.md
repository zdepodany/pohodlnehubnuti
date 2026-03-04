# SEO konfigurace – Pohodlné hubnutí

## Doména

Všechny URL používají `https://www.pohodlnehubnuti.cz`. Pokud máte jinou doménu, nahraďte v těchto souborech:

- `index.html` – canonical, og:url, og:image, twitter:url, twitter:image, Schema.org
- `robots.txt` – Sitemap URL
- `sitemap.xml` – loc URL

## Doporučení pro další vylepšení

1. **OG obrázek** – Pro lepší zobrazení na sociálních sítích vytvořte obrázek 1200×630 px (např. `img/og-image.png`) a aktualizujte `og:image` a `twitter:image`.

2. **Favicon** – Přidejte `favicon.ico` nebo `favicon.svg` do kořene a vložte do `<head>`:
   ```html
   <link rel="icon" href="/favicon.ico" sizes="any">
   <link rel="icon" href="/favicon.svg" type="image/svg+xml">
   ```

3. **Google Search Console** – Po nasazení zaregistrujte web a odešlete sitemap.

4. **lastmod v sitemap.xml** – Při větších změnách aktualizujte datum v `sitemap.xml`.
