const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playList = $('.playlist');
const nameSong = $('header h2');
const playerSong = $('.cd-thumb');
const audioSong = $('audio');
const togglePlay = $('.btn-toggle-play');
const nextPlay = $('.btn-next');
const prevPlay = $('.btn-prev');
const randomPlay = $('.btn-random');
const repeatPlay = $('.btn-repeat');
const player = $('.player');
const progress = $('.progress');

const app = {
    currentIndex: 0,
    isPlay: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Nevada",
            singer: "Raftaar x Fortnite",
            path: './image/Nevada.mp3',
            image: "https://avatar-ex-swe.nixcdn.com/song/2018/06/19/7/b/9/3/1529382807600_500.jpg"
          },
          {
            name: "On & On",
            singer: "Cartoon, Daniel Levi",
            path: "./image/On & On.mp3",
            image:
              "https://avatar-ex-swe.nixcdn.com/song/2017/10/04/a/4/8/6/1507106493937_500.jpg"
          },
          {
            name: "Summer Time",
            singer: "K-391",
            path:
              "./image/Summertime.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/song/2018/11/02/e/6/b/b/1541139353539_500.jpg"
          },
          {
            name: "Lily",
            singer: "Alan Walker, K-391",
            path: "./image/Lily.mp3",
            image:
              "https://avatar-ex-swe.nixcdn.com/song/2018/12/13/c/b/6/c/1544707823936_500.jpg"
          },
          {
            name: "Lost Control",
            singer: "Alan Walker, K-391",
            path: "./image/Lost Control.mp3",
            image:
              "https://avatar-ex-swe.nixcdn.com/song/2018/12/13/c/b/6/c/1544707823936_500.jpg"
          },
          {
            name: "Ignite",
            singer: "Alan Walker, K-391",
            path:
              "./image/Ignite.mp3",
            image:
              "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/b/5/8/b/b58b13be6eb72985b4511b327b9fcbb5.jpg"
          },
          {
            name: "Monody",
            singer: "The FatRat",
            path: "./image/Monody.mp3",
            image: "https://avatar-ex-swe.nixcdn.com/playlist/2017/12/03/4/b/e/2/1512318524634_500.jpg"
          },
          {
            name: "Fly Away",
            singer: "The FatRat",
            path: "./image/Fly Away.mp3",
            image: "https://stc-id.nixcdn.com/v11/html5/nct-player-mp3/images/default_inner_player_80.png"
          }
    ],
    /*Hi???n th??? danh s??ch t???t c??? b??i h??t*/
    render: function(){
        var htmls = this.songs.map(song =>{
            return `
            <div class="song">
                <div class="thumb" style="background-image: url(${song.image})">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })

        playList.innerHTML = htmls.join('')
    },
    /*?????nh ngh??a c??c ph????ng th???c*/
    defineProperties : function(){
        Object.defineProperty(this, 'currentSong', {
            get : function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    /*X??? l?? s??? ki???n*/
    handleEvents: function(){
        const cd= $('.cd')
        const cdWidth = cd.offsetWidth

        /*X??? l?? ph??ng to v?? thu nh???*/
        document.onscroll = ()=> {
            const scrollTop = window.scrollY
            const newWidth = cdWidth - scrollTop

            cd.style.width = newWidth > 0 ? newWidth + 'px': 0
            cd.style.opacity = newWidth / cdWidth
        }
        /*Ch???y b??i h??t*/
        togglePlay.onclick = ()=> {
            if(app.isPlay){
              audioSong.pause()
              playerAnimate.pause()
            }
            else{
              audioSong.play()
              playerAnimate.play()
            }
        }
        audioSong.onplay = ()=>{
          app.isPlay = true
          player.classList.add('playing')
        }
        audioSong.onpause = ()=>{
          app.isPlay = false
          player.classList.remove('playing')
        }
        /*Ch???y ch???y theo b??i h??t*/
        audioSong.ontimeupdate = ()=>{
            if(audioSong.duration){
               const progressPercent = Math.floor(audioSong.currentTime / audioSong.duration * 100)
               progress.value = progressPercent
            }
        }
        /*Tua b??i h??t*/
        progress.onchange = ()=>{
          audioSong.currentTime = progress.value / 100 * audioSong.duration
        }
        /*Xoay cd*/
        const playerAnimate = playerSong.animate([
          {transform: 'rotate(360deg)'}
        ],{
          duration: 10000,
          iterations: Infinity
        })
        playerAnimate.pause()
        /*Next v?? ch???y b??i h??t*/
        nextPlay.onclick = () =>{
            if(app.isRandom){
              app.playRandomSong()
            }
            else{
              app.nextSong()
            }
            audioSong.play()
        }
        /*Prev v?? ch???y b??i h??t*/
        prevPlay.onclick = () =>{
          if(app.isRandom){
            app.playRandomSong()
          }
          else{
            app.prevSong()
          }
          audioSong.play()
        }
        /*Random b??i h??t*/
        randomPlay.onclick = () =>{
            app.isRandom = !app.isRandom
            randomPlay.classList.toggle('active', app.isRandom)
        }
        /*Khi k???t th??c b??i h??t th?? next ho???c ph??t l???i*/
        audioSong.onended = () => {
            if(app.isRepeat){
              audioSong.play();
            }
            else{
              nextPlay.onclick()
            }
        }
        repeatPlay.onclick = () => {
          app.isRepeat = !app.isRepeat
          repeatPlay.classList.toggle('active', app.isRepeat)
        }
    },
    /*Hi???n th??? b??i h??t*/
    loadingSong: function(){
        nameSong.innerText = this.currentSong.name
        playerSong.style.backgroundImage = `url('${this.currentSong.image}')`
        audioSong.src = this.currentSong.path
    },
    /*Next b??i h??t*/
    nextSong: function(){
      app.currentIndex++
      if(app.currentIndex > this.songs.length - 1){
        app.currentIndex = 0
      }
      app.loadingSong()
    },
    /*Prev b??i h??t*/
    prevSong: function(){
      app.currentIndex--
      if(app.currentIndex < 0 ){
        app.currentIndex = this.songs.length - 1
      }
      app.loadingSong()
    },
    /*Random b??i h??t*/
    playRandomSong: function(){
        var newIndex
        do{
           newIndex = Math.floor(Math.random() * this.songs.length)
        }
        while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadingSong()
    },
    /*Ch???y ch????ng tr??nh*/
    start: function(){  
        this.render()
        this.defineProperties()
        this.handleEvents()
        this.loadingSong()
    }
}

app.start()