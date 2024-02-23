<template>
  <q-page>

    <div>
      <div style="background-color:#ff931e; color: white;" class="column items-center">
        <br />
        <br />
        <br />
        <div class="container">
          <q-card dark>
            <q-card-section>
              <h5>LED Mapper</h5>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col">
                  <q-input dark type="number" label="Number of LEDs" v-model="numLEDs" />
                </div>
                <div class="col">
                  <!-- <q-select dark label="Mode" :options="['linear', 'draw', 'spline']" v-model="modeLEDs" /> -->
                  Line Width
                  <q-slider dark :min="0" :max="100" v-model="lineWidth" />
                </div>
                <div class="col">
                  <!-- <q-select dark label="Mode" :options="['linear', 'draw', 'spline']" v-model="modeLEDs" /> -->
                  <q-file dark v-model="fileUpload" label="Upload Background" @update:model-value="showBG" />
                </div>


              </div>
              <div class="row">
                <div class="col">
                  <q-btn @click="addPoint">Add Point</q-btn>
                  <q-btn @click="removePoint">Remove Point</q-btn>
                </div>
              </div>


              <canvas ref="myCanvas" width="1280" height="800" style="width: 100%;"></canvas>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Download" color="primary" />
              <q-btn flat label="Upload" color="info" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { L } from 'app/dist/spa/assets/index.e661abbe';
import { defineComponent, ref } from 'vue';

const POINT_SIZE = 50;
const WIDTH_STEP_SIZE = 5;

interface Selectable {
  selected: boolean;
  hovered: boolean;
}

interface Point extends Selectable {
  x: number;
  y: number;
  size: number;
}

interface Path extends Selectable {
  a: Point;
  b: Point;
}

export default defineComponent({
  name: 'LED Mapper',
  components: {},
  mounted() {
    setInterval(this.render, 30);
    const canvas = this.myCanvas;
    if (!canvas) {
      console.log('Canvas error');
      return;
    }
    canvas.addEventListener('mousemove', (event) => {
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for X
      var scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

      this.mouse = {
        x: (event.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (event.clientY - rect.top) * scaleY,     // been adjusted to be relative to element
        selected: this.mouse.selected,
      }
      this.checkObjects();
    })
    canvas.addEventListener('mousedown', (event) => {
      this.mouse.selected = true;
      this.checkObjects();
    });
    canvas.addEventListener('mouseup', (event) => {
      this.mouse.selected = false;
      this.checkObjects();
    });
  },
  data() {
    return {
      mouse: { x: 0, y: 0, selected: false },
      bgImg: new Image()
    }
  },
  methods: {
    checkObjects() {
      const { h } = this.getVars();
      for (let x = 0; x < this.pos.length; x++) {
        const cp = this.pos[x];
        const mx = this.mouse.x;
        const my = this.mouse.y;
        if (cp.selected) {
          this.pos[x].x = mx;
          this.pos[x].y = my;
          if (this.pos[x].y > h) {
            this.pos[x].y = h;
          }
        }
        if ((cp.x - mx) * (cp.x - mx) + (cp.y - my) * (cp.y - my) < cp.size * cp.size) {
          this.pos[x].hovered = true;
          this.pos[x].selected = this.mouse.selected;
        } else {
          this.pos[x].hovered = false;
          this.pos[x].selected = false;
        }
      }
    },
    addPoint() {
      const { w, h, ctx } = this.getVars();
      let nx = w / 2;
      let ny = h / 2;
      while (this.pos.filter((i) => i.x == nx && i.y == ny).length > 0) {
        nx += 50;
      }
      this.pos.push({ x: nx, y: ny, size: this.pos.length == 0 ? POINT_SIZE * 2 : POINT_SIZE, selected: false, hovered: false });
      const posLen = this.pos.length;
      if (posLen >= 2) {
        this.paths.push({ a: this.pos[posLen - 2], b: this.pos[posLen - 1], selected: false, hovered: false })
      }
    },
    removePoint() {
      this.pos.pop();
      if (this.paths.length > 0) {
        this.paths.pop();
      }
    },
    getVars() {
      const w = 1280;
      const h = 720;
      const bar = 80;
      const ctx = this.myCanvas!.getContext('2d')!;
      return { w, h, bar, ctx }
    },
    render() {
      const { w, h, bar, ctx } = this.getVars();
      ctx.fillStyle = '#777777';
      ctx.fillRect(0, 0, w, h);

      ctx.drawImage(this.bgImg, 0, 0, 1280, 720);
      const myImageData = ctx.getImageData(0, 0, 1280, 720);
      const getColorForCoord = (diffCoord: number[][]) => {
        let r = 0;
        let b = 0;
        let g = 0;
        let a = 0;

        for (let i = 0; i < diffCoord.length; i++) {
          const red = diffCoord[i][1] * (1280 * 4) + diffCoord[i][0] * 4;
          r += myImageData.data[red];
          g += myImageData.data[red + 1];
          b += myImageData.data[red + 2];
          a += myImageData.data[red + 3];
        }

        r = Math.floor(r / diffCoord.length);
        g = Math.floor(g / diffCoord.length);
        b = Math.floor(b / diffCoord.length);
        a = Math.floor(a / diffCoord.length);
        const col = '#' + ((r < 16) ? ('0' + r.toString(16)) : r.toString(16)) + ((g < 16) ? ('0' + g.toString(16)) : g.toString(16)) + ((b < 16) ? ('0' + b.toString(16)) : b.toString(16)) + ((a < 16) ? ('0' + a.toString(16)) : a.toString(16));
        //console.log(col);
        return col;
      };
      // for (let x = 0; x < this.paths.length; x++) {
      //   const path = this.paths[x];
      //   ctx.strokeStyle = '#33333399';
      //   ctx.lineWidth = this.lineWidth / 100 * 720;
      //   ctx.beginPath();
      //   ctx.moveTo(path.a.x, path.a.y);
      //   ctx.lineTo(path.b.x, path.b.y);
      //   ctx.stroke();
      //   ctx.closePath();
      // }
      for (let x = 0; x < this.paths.length; x++) {
        const path = this.paths[x];
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(path.a.x, path.a.y);
        ctx.lineTo(path.b.x, path.b.y);
        ctx.stroke();
        ctx.closePath();
      }
      for (let x = 0; x < this.pos.length; x++) {
        const cp = this.pos[x];
        ctx.lineWidth = 2;
        ctx.strokeStyle = cp.hovered ? '#ffffff99' : '#000000bb';
        ctx.fillStyle = cp.selected ? '#ffffff99' : '#000000bb';
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, cp.size, 0, 2 * Math.PI)
        ctx.stroke();
        ctx.fill();
      }

      // Mouse Cursor
      ctx.fillStyle = '#999999';
      ctx.beginPath();
      ctx.arc(this.mouse.x, this.mouse.y, 5, 0, 2 * Math.PI)
      ctx.fill();

      // Preview Coords
      this.calcPrevCoords();
      ctx.fillStyle = '#aaaaaa';
      ctx.fillRect(0, h, w, bar);
      const prevSize = w / (parseInt(this.numLEDs) + 1) / 4;
      //console.log('w:' + w + ' prevSize: ' + prevSize + ' numLEDs: ' + this.numLEDs);
      for (let x = 0; x < this.numLEDs; x++) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        const color = getColorForCoord(this.prevCoords[x]);
        //console.log(color);
        for (let i = 1; i < this.prevCoords[x].length; i++) {
          ctx.fillStyle = '#00000033';
          ctx.beginPath();
          ctx.arc(this.prevCoords[x][i][0], this.prevCoords[x][i][1], WIDTH_STEP_SIZE / 2, 0, 2 * Math.PI)
          ctx.fill();
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.prevCoords[x][0][0], this.prevCoords[x][0][1], prevSize, 0, 2 * Math.PI)
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(prevSize * 4 * x + prevSize * 4, h + bar / 2, prevSize, 0, 2 * Math.PI)
        ctx.stroke();
        ctx.fill();
      }
    },
    showBG() {
      var file = this.fileUpload;
      var fr = new FileReader();
      const createImage = () => {
        this.bgImg = new Image();
        this.bgImg.src = fr.result?.toString() || '';
      }
      fr.onload = createImage;   // onload fires after reading is complete
      fr.readAsDataURL(file);    // begin reading
    },
    calcPrevCoords() {
      if (this.paths.length < 1) {
        return;
      }
      this.prevCoords = [];
      const dists = this.paths.map((x) => Math.sqrt((x.a.x - x.b.x) * (x.a.x - x.b.x) + (x.a.y - x.b.y) * (x.a.y - x.b.y)));
      const totalDist = dists.reduce((partialSum, a) => partialSum + a, 0);
      const segmentLength = totalDist / (this.numLEDs - 1);
      let currentDistI = 0;
      let refDist = 0;
      for (let i = 0; i < this.numLEDs; i++) {
        let offset = segmentLength * i - refDist;
        if (offset > dists[currentDistI] + 1) {
          refDist += dists[currentDistI];
          currentDistI += 1;
          offset = segmentLength * i - refDist;
        }
        if (currentDistI >= this.paths.length) {
          console.log('offset: ' + offset + ' dists:' + dists.join(', ') + ' refDist: ' + refDist);
          this.prevCoords.push([[0, 0]]);
          continue;
        }
        const dx = (this.paths[currentDistI].b.x - this.paths[currentDistI].a.x) / dists[currentDistI];
        const dy = (this.paths[currentDistI].b.y - this.paths[currentDistI].a.y) / dists[currentDistI];
        const coords = [Math.floor(this.paths[currentDistI].a.x + offset * dx), Math.floor(this.paths[currentDistI].a.y + offset * dy)];
        //console.log(offset);
        const numOfDiffuse = this.lineWidth / 100 * 720 / 2 / WIDTH_STEP_SIZE;
        const diffuseCoords: Array<Array<number>> = [];
        diffuseCoords.push(coords);
        for (let i = 1; i <= numOfDiffuse; i++) {
          const nx = Math.floor(coords[0] + -dy * i * WIDTH_STEP_SIZE);
          const ny = Math.floor(coords[1] + dx * i * WIDTH_STEP_SIZE);
          if (nx >= 0 && ny >= 0 && nx < 1280 && ny < 720) {
            diffuseCoords.push([nx, ny]);
          }
          const mx = Math.floor(coords[0] + dy * i * WIDTH_STEP_SIZE);
          const my = Math.floor(coords[1] + -dx * i * WIDTH_STEP_SIZE);
          if (mx >= 0 && my >= 0 && mx < 1280 && my < 720) {
            diffuseCoords.push([mx, my]);
          }
        }

        this.prevCoords.push(diffuseCoords);
      }
    }
  },
  setup() {
    const myCanvas = ref<HTMLCanvasElement>()
    const numLEDs = ref(54);
    const prevCoords = ref<number[][][]>([]);
    for (let i = 0; i < numLEDs.value; i++) {
      prevCoords.value.push([[0, 0]]);
    }
    const modeLEDs = ref('linear');
    const lineWidth = ref(10);
    const fileUpload = ref();
    const pos = ref<Point[]>([])
    const paths = ref<Path[]>([])
    return { myCanvas, numLEDs, modeLEDs, pos, paths, lineWidth, fileUpload, prevCoords };
  }
});
</script>
