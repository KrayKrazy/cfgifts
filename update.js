const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// Inject import
if (!content.includes('CommerceHero')) {
  content = content.replace(
    "import { GiftProduct, basketTypes, individualItems, BasketType, IndividualItem } from '../data/products';",
    "import { GiftProduct, basketTypes, individualItems, BasketType, IndividualItem } from '../data/products';\nimport { CommerceHero } from '../components/ui/commerce-hero';"
  );
}

const startIdx = content.indexOf('{/* HEADER */}');
const endMarker = '{/* CATALOGO';
const endIdx = content.indexOf(endMarker);

if (startIdx > -1 && endIdx > -1) {
  content = content.substring(0, startIdx) + 
    '{/* HERO SECTION IMPORTED FROM 21st.dev */}\n      <div className="mb-12">\n        <CommerceHero />\n      </div>\n\n      ' + 
    content.substring(endIdx);
}

fs.writeFileSync('app/page.tsx', content);
