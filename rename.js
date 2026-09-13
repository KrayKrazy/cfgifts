const fs = require('fs');
const path = require('path');

const dir = 'C:\\mycelium\\cfgifts\\public\\images';
const files = fs.readdirSync(dir);

const mapping = [
  { starts: 'Kit Presente Gratid', dest: 'cesta-gratidao.jpg' },
  { starts: 'Kit Linda Sexta', dest: 'kit-linda-sexta.jpg' },
  { starts: 'Kit Presente', exact: false, includes: 'Amor', dest: 'kit-amor-elegancia.jpeg' },
  { starts: 'Kit Presente', exact: false, includes: 'Cuide', dest: 'kit-cuide-se-bem.jpeg' },
  { starts: 'Kit Presente', exact: false, includes: 'vel.jpg', dest: 'cesta-make-beauty.jpg' },
  { starts: 'Presente especial', dest: 'kit-mae.jpg' },
  { starts: 'Linda Cesta', dest: 'cesta-ameixa.jpg' },
  { starts: 'Kit Floratta', dest: 'kit-floratta-red.jpg' },
  { starts: 'Kit Body Splash', dest: 'cesta-deleite.jpg' },
];

files.forEach(file => {
  if (file === 'logo.jpg' || file === 'kit-kiss-me-more.jpg') return;

  for (const m of mapping) {
    if (file.startsWith(m.starts)) {
      if (m.includes && !file.includes(m.includes)) continue;
      
      const oldPath = path.join(dir, file);
      const newPath = path.join(dir, m.dest);
      if (oldPath !== newPath) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed ${file} to ${m.dest}`);
      }
      break;
    }
  }
});
