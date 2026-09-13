const fs = require("fs");
let code = fs.readFileSync("app/page.tsx", "utf8");

code = code.replace("import Image from 'next/image';", "import Image from 'next/image';\nimport CheckoutModal from './components/CheckoutModal';");
code = code.replace("const [isBuildingCustom, setIsBuildingCustom] = useState(false);", "const [isBuildingCustom, setIsBuildingCustom] = useState(false);\n  const [isCheckingOut, setIsCheckingOut] = useState(false);");
code = code.replace("const buyOnWhatsApp = () => {", "const buyOnWhatsApp = () => { setIsCheckingOut(true); return;");
code = code.replace("Finalizar no WhatsApp", "Finalizar no Checkout");
code = code.replace("    </div>\r\n  );\r\n}", "      {isCheckingOut && (\n        <CheckoutModal \n          activeProduct={activeProduct}\n          isCustom={isBuildingCustom}\n          selectedBasket={selectedBasket}\n          selectedItems={selectedItems}\n          customMessage={customMessage}\n          onClose={() => setIsCheckingOut(false)}\n        />\n      )}\n    </div>\n  );\n}");
code = code.replace("    </div>\n  );\n}", "      {isCheckingOut && (\n        <CheckoutModal \n          activeProduct={activeProduct}\n          isCustom={isBuildingCustom}\n          selectedBasket={selectedBasket}\n          selectedItems={selectedItems}\n          customMessage={customMessage}\n          onClose={() => setIsCheckingOut(false)}\n        />\n      )}\n    </div>\n  );\n}");

fs.writeFileSync("app/page.tsx", code);

