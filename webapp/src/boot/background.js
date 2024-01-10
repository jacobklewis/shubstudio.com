function startBG() {
  const canv = document.getElementById('bgcanvas');
  Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
  };

  let dt = 0;
  let resetRotate = true;
  let mousePos = {
    x: 0,
    y: 0,
    intensity: 0,
  };
  let calculatedWidth = -1;
  let calculatedHeight = -1;

  const minAlpha = 0.3;
  const size = 70;
  const cChange = 20;
  let fadeIn = 0;
  let minR = 55;
  let maxR = 248;
  let minG = 48;
  let maxG = 69;
  let minB = 217;
  let maxB = 248;

  // let minR = 96;
  // let maxR = 187;
  // let minG = 96;
  // let maxG = 149;
  // let minB = 217;
  // let maxB = 240;

  // let minR = 0;
  // let maxR = 255;
  // let minG = 0;
  // let maxG = 255;
  // let minB = 0;
  // let maxB = 255;
  let colorGrid = [];

  const ctx = canv.getContext('2d');

  function intTo2DigitHex(num) {
    // Convert the number to a hexadecimal string
    let hexString = num.toString(16);

    // Use padStart to ensure it's always 2 digits long
    hexString = hexString.padStart(2, '0');

    return hexString;
  }

  const renderSection = function (ctx, posX, posY) {
    if (
      posY < 0 ||
      posX < 0 ||
      posY >= colorGrid.length ||
      posX >= colorGrid[0].length ||
      colorGrid[posY][posX] !== null
    ) {
      return;
    }
    let count = 0;
    let aR = 0;
    let aG = 0;
    let aB = 0;
    for (let i = -1; i < posY + 1; i++) {
      for (let j = -1; j < posX + 1; j++) {
        if (
          posY + i >= 0 &&
          posX + j >= 0 &&
          posY + i < colorGrid.length &&
          posX + j < colorGrid[0].length &&
          colorGrid[posY + i][posX + j] !== null
        ) {
          aR += colorGrid[posY + i][posX + j]['r'];
          aG += colorGrid[posY + i][posX + j]['g'];
          aB += colorGrid[posY + i][posX + j]['b'];
          count++;
        }
      }
    }
    if (count > 0) {
      aR = Math.floor(aR / count);
      aG = Math.floor(aG / count);
      aB = Math.floor(aB / count);
    } else {
      // default
      aR = Math.floor((minR + maxR) / 2);
      aG = Math.floor((minG + maxG) / 2);
      aB = Math.floor((minB + maxB) / 2);
    }
    aR = Math.floor(aR + Math.random() * cChange - cChange / 2).clamp(
      minR,
      maxR
    );
    aG = Math.floor(aG + Math.random() * cChange - cChange / 2).clamp(
      minG,
      maxG
    );
    aB = Math.floor(aB + Math.random() * cChange - cChange / 2).clamp(
      minB,
      maxB
    );
    const d = Math.round(Math.random() * 2) - 1;
    colorGrid[posY][posX] = {
      r: aR,
      g: aG,
      b: aB,
      a: d == 0 ? 1 : Math.random().clamp(minAlpha, 1),
      d: d,
    };
  };

  const calculate = function () {
    const dw = calculatedWidth - window.innerWidth;
    const dh = calculatedHeight - window.innerHeight;
    if (dw * dw + dh * dh < 10000) {
      return;
    }
    calculatedWidth = window.innerWidth;
    calculatedHeight = window.innerHeight;
    const calculatedSize = Math.max(calculatedWidth, calculatedHeight);
    fadeIn = 0;
    colorGrid = [];
    for (let i = 0; i < calculatedSize * 2; i += size) {
      let jArr = [];
      for (let j = 0; j < calculatedSize * 2; j += size) {
        jArr.push(null);
      }
      colorGrid.push(jArr);
    }
    let mag = 1;
    let magCount = 0;
    let dirx = 1;
    let diry = 0;
    let px = Math.floor(colorGrid[0].length / 2);
    let py = Math.floor(colorGrid.length / 2);
    const maxSide = Math.max(colorGrid[0].length, colorGrid.length) + 1;
    let maxCount = maxSide * maxSide;

    for (let i = 0; i < maxCount; i++) {
      renderSection(ctx, px, py);
      // move
      px += dirx;
      py += diry;
      magCount++;
      if (magCount >= mag) {
        magCount = 0;
        // rotate
        if (dirx != 0) {
          diry = dirx;
          dirx = 0;
        } else {
          dirx = diry * -1;
          diry = 0;
          mag++;
        }
      }
    }
  };

  const render = function () {
    const calculatedSize = Math.max(calculatedWidth, calculatedHeight);
    if (resetRotate) {
      resetRotate = false;
      ctx.translate(calculatedSize / 2,calculatedSize / 2);
      ctx.rotate((Math.PI / 180) * -30);
      ctx.translate(-calculatedSize / 2, -calculatedSize / 2);
    }

    dt++;
    ctx.save();
    ctx.fillStyle = '#f1f1f1';
    ctx.fillRect(
      -calculatedSize / 2,
      -calculatedSize / 2,
      calculatedSize * 2,
      calculatedSize * 2
    );

    for (let i = 0; i < colorGrid.length; i++) {
      for (let j = 0; j < colorGrid[0].length; j++) {
        ctx.fillStyle =
          '#' +
          intTo2DigitHex(colorGrid[i][j]['r']) +
          intTo2DigitHex(colorGrid[i][j]['g']) +
          intTo2DigitHex(colorGrid[i][j]['b']) +
          intTo2DigitHex(Math.floor(colorGrid[i][j]['a'] * 255 * fadeIn));
        //ctx.fillRect(j * size + size*0.1, i * size + size*0.1, size*0.8, size*0.8);
        ctx.fillRect(
          j * size - calculatedSize / 2,
          i * size - calculatedSize / 2,
          size,
          size
        );
        const ranMult = Math.random() / 100;
        colorGrid[i][j]['a'] += colorGrid[i][j]['d'] * ranMult;
        if (colorGrid[i][j]['a'] < minAlpha || colorGrid[i][j]['a'] > 1) {
          colorGrid[i][j]['d'] *= -1;
          colorGrid[i][j]['a'] += colorGrid[i][j]['d'] * ranMult;
        }
      }
    }
    if (fadeIn < 1) {
      fadeIn += 0.05;
    }
    // ctx.fillStyle = '#23252477';
    // ctx.fillRect(
    //   -calculatedSize / 2,
    //   -calculatedSize / 2,
    //   calculatedSize * 2,
    //   calculatedSize * 2
    // );

    ctx.restore();
    if (mousePos.active && mousePos.intensity < 1) {
      mousePos.intensity += 0.1;
      mousePos.active = false;
    } else if (mousePos.intensity > 0) {
      mousePos.intensity -= 0.01;
    }
  };

  window.setInterval(render, 30);
  onresize = (event) => {
    resetRotate = true;
    canv.setAttribute('width', window.innerWidth);
    canv.setAttribute('height', window.innerHeight);
    calculate();
    render();
  };
  onmousemove = (evt) => {
    mousePos = {
      x: evt.clientX,
      y: evt.clientY,
      intensity: mousePos.intensity,
      active: true,
    };
  };
  onresize();
  window.addEventListener('resize', onresize);
  window.addEventListener('mousemove', onmousemove);
  window.addEventListener('touchmove', onmousemove);
}

export default startBG;
