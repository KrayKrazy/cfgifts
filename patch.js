const fs = require("fs");
let code = fs.readFileSync("app/page.tsx", "utf8");

// 1. Add use client
code = "\"use client\";\n" + code;

// 2. Add imports
code = code.replace("import Image from 'next/image';", "import Image from 'next/image';\nimport CheckoutModal from './components/CheckoutModal';");

// 3. Add states
code = code.replace("const [isBuildingCustom, setIsBuildingCustom] = useState(false);", "const [isBuildingCustom, setIsBuildingCustom] = useState(false);\n  const [isCheckingOut, setIsCheckingOut] = useState(false);");

// 4. Modify buyOnWhatsApp logic
code = code.replace("const buyOnWhatsApp = () => {", "const buyOnWhatsApp = () => { setIsCheckingOut(true); return;");

// 5. Change button texts
code = code.replace(/Finalizar no WhatsApp/g, "Finalizar no Checkout");

// 6. Insert Modal exactly before the final </div>\n  );\n}
const modalInjection = `      {isCheckingOut && (
        <CheckoutModal 
          activeProduct={activeProduct}
          isCustom={isBuildingCustom}
          selectedBasket={selectedBasket}
          selectedItems={selectedItems}
          customMessage={customMessage}
          onClose={() => setIsCheckingOut(false)}
        />
      )}
    </div>
  );
}`;
code = code.replace(/ {4}<\/div>\r?\n {2}\);\r?\n}/g, modalInjection);

fs.writeFileSync("app/page.tsx", code, "utf8");

