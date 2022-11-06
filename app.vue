<template>
  <div>
    <fullscreen />
    <div v-show="toggle.firstpage" class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row">
        <img src="./static/logos/logo.png" class="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 class="text-5xl font-bold">FFXIV Player Label</h1>
          <p class="py-6">
            ようこそ♥このプロジェクトはエゴイストのスタッフさんのために創設されました🎉<br>
            自動でキャラクターを検知してキャラクターの情報を知らせてくれるウェブアプリです♥
          </p>
          <button @click="toggle.firstpage = false" class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>

    <div v-show="!toggle.firstpage" class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row">
        
        
        
        <div class="max-h-96 overflow-y-scroll">
          <table class="table table-compact w-full overflow-y-scroll">
            <thead>
              <tr>
                <th></th>
                <th>キャラクター名</th>
                <th>ラベル</th>
              </tr>
            </thead>
            <tbody>

              <tr v-if="players.length == 0">
                <th><i class="mdi mdi-clock-outline"></i>{{ new Date().getHours() + ":" + new Date().getMinutes() }}</th>
                <td>ここに検知されたプレイヤーがリストアップされます</td>
              </tr>

              <tr v-for="(item, index) in players" :key="index">
                <th><i class="mdi mdi-clock-outline"></i>{{item[2]}}</th>
                <td>{{item[0]}}</td>
                <td>{{item[1]}}</td>
              </tr>
            </tbody>
          </table>
        </div>



        <div>
          <progress v-show="toggle.progress" class="progress progress-secondary w-64"></progress>

          <p class="py-6">
            FFXIVの画面をキャプチャして始めてください🎉<br>
            スプレッドシートに登録されたキャラクターが検知されます♥
          </p>

          <button @click="windowCapture()" class="btn btn-primary">スタート！<i class="mdi mdi-monitor"></i></button>
          <a href="https://docs.google.com/spreadsheets/d/1QyVdvmeGgUs1sej-wVs8ec4g8XfnTLs2V6oHEzYcPcM/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
            <button class="btn btn-accent mx-3">キャラクターを登録 <i class="mdi mdi-checkbox-multiple-blank-outline"></i></button>
          </a>
          <label for="my-modal-4" class="btn btn-secondary">ko-fi♥</label>
          <label for="my-modal-3" class="btn btn-secondary mx-3">paypay♥</label>
        </div>
      </div>
    </div>



    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <label for="my-modal-4" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <iframe id='kofiframe' src='https://ko-fi.com/tsupata/?hidefeed=true&widget=true&embed=true&preview=true'
          style='border:none;width:100%;padding:1px;background:#f9f9f9;' height='712' title='tsupata'></iframe>
      </label>
    </label>

    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <label for="my-modal-3" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <img src="./static/paypay.jpg">
      </label>
    </label>



    <div class="stream-content">
      <video ref="video" autoplay></video>
      <canvas ref="canvas" width="1920" height="1080"></canvas>
    </div>
  </div>
</template>

<style scoped>
.stream-content{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
}
canvas,video{
  max-width: 200px;
}

</style>

<script>
import { createWorker } from 'tesseract.js';

export default {
  data() {
    return {
      gs_players: [],
      players: [],
      worker: null,
      toggle: {
        firstpage: true,
        progress:false
      },
    }
  },
  methods: {
    detect() {
      const rectangle = { left: 300, top: 80, width: 1400, height: 810 };

      (async () => {
        const { data: { text } } = await this.worker.recognize(this.$refs.canvas,rectangle);

        let matchedTexts = text.match(/[A-Z]{1}[a-z]{1,14} [A-Z]{1}[a-z]{1,14}/g)
        
        if (matchedTexts == null) return

        let l1 = []

        let l2 = []

        matchedTexts.forEach((x,i) => {
          l1[i] = x.toLowerCase().replace(/[^a-z]/,'')
        });
        this.gs_players.forEach((x, i) => {
          l2[i] = x[0].toLowerCase().replace(/[^a-z]/,'')
        })

        let l3 = []

        l1.forEach((x, i) => {
          l2.forEach((y, j) => {
            if(x == y) l3.push(y)
          })
        })
        let date = new Date()
        if (l3.length > 0) {
          l3.forEach((x, i) => {
            this.gs_players.forEach((y, j) => {
              if (x == l2[j]) {
                this.players.unshift(y)
                this.players[0][2] =  date.getHours() + ":" + date.getMinutes()
              }
            })
          })
          //重複削除
          let n = this.players.filter((e,i) => {
            return !this.players.some((e2,i2) => {
              return i > i2 && e[0] == e2[0]
            })
          })
          console.log('n', n)
          this.players = n
        }
        console.log("検出されたプレイヤー", matchedTexts)
        console.log("リストされたプレイヤー", this.players)

      })()
    },

    windowCapture() {
      (async () => {
        this.$refs.video.srcObject = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "always" }, audio: false })
        this.toggle.progress = true
      })()
    }
  },




  mounted() {

    fetch("https://script.google.com/macros/s/AKfycbwoHedneUlLGbqSZxU97ES2-0nkSIB8eTjDIeNqckesVsYnZ0QgXLK9CP1Ux52GWL0P/exec")
      .then(response => response.json())
      .then(data => this.gs_players = data)

    this.worker = createWorker();
    (async () => {
      await this.worker.load();
      await this.worker.loadLanguage('eng');
      await this.worker.initialize('eng');
      await this.worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz',
      });
      setInterval(() => {
        if(!this.toggle.progress) return
        this.$refs.canvas.getContext('2d').drawImage(this.$refs.video, 300, 90, 1350, 700,0, 0, 1920, 1080)
        this.detect()
        fetch("https://script.google.com/macros/s/AKfycbwoHedneUlLGbqSZxU97ES2-0nkSIB8eTjDIeNqckesVsYnZ0QgXLK9CP1Ux52GWL0P/exec")
          .then(response => response.json())
          .then(data => this.gs_players = data)
      }, 13000);
    })();


  },
  beforeDestroy() {
    (async () => {
      await this.worker.terminate();
    })()
  },
}
</script>
