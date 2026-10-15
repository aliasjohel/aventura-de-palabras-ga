const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'../js/world-music.js'),'utf8');
function fixture(){
  const players=[],events={},timers=new Map();let time=0,id=0,screenActive=true,deny=false;
  const game={world:0,mission:0,screen:{classList:{contains:()=>screenActive}},dialogue:false,cinematic:false};
  class Audio{
    constructor(src){this.src=src;this.paused=true;this.currentTime=0;this.volume=1;this.plays=0;players.push(this);}
    play(){this.plays++;if(deny)return Promise.reject(Object.assign(Error('play rejected'),{name:deny==='abort'?'AbortError':'NotAllowedError'}));this.paused=false;return Promise.resolve();}
    pause(){this.paused=true;}
  }
  const document={hidden:false,querySelectorAll:()=>[],addEventListener:(type,fn)=>{events[type]=fn;}};
  const context={Audio,GameAudio:{create:src=>new Audio(src)},document,window:{addEventListener:(type,fn)=>{events[type]=fn;}},getComputedStyle:()=>({visibility:'visible'}),performance:{now:()=>time},setInterval:fn=>{timers.set(++id,fn);return id;},clearInterval:key=>timers.delete(key)};
  vm.runInNewContext(source,context);context.WorldMusic.configure(()=>game);
  const tick=async()=>{await Promise.resolve();await Promise.resolve();};
  return {game,document,players,music:context.WorldMusic,events,tick,deny:value=>{deny=value;},screen:value=>{screenActive=value;},
    advance:async ms=>{time+=ms;[...timers.values()].forEach(fn=>fn());await tick();},
    interact:async()=>{events.pointerdown();await tick();}};
}
test('each world selects its own track; winter changes on mission four',()=>{
  const {music}=fixture();assert.equal(new Set([0,1,2,3,4].map(w=>music.select(w,0))).size,5);
  assert.equal(music.select(3,0),music.tracks.winterSlow);assert.equal(music.select(3,2),music.tracks.winterSlow);
  assert.equal(music.select(3,3),music.tracks.winter);assert.equal(music.select(3,9),music.tracks.winter);
});
test('music has an adjustable baseline, loops, and continues across challenges without restarting',async()=>{
  const f=fixture();assert.equal(f.players.length,0);await f.interact();await f.advance(800);
  const audio=f.players[0];assert.equal(audio.loop,true);assert.equal(audio.volume,.55);audio.currentTime=19;
  f.game.mission=1;f.music.sync();await f.tick();assert.equal(f.players.length,1);assert.equal(audio.currentTime,19);assert.equal(audio.plays,1);
  f.game.dialogue=true;f.music.sync();await f.advance(800);assert.equal(audio.volume,.12);
  f.game.dialogue=false;f.music.sync();await f.advance(800);assert.equal(audio.volume,.55);
});
test('menu, cinematics and background stop playback; resume keeps the current position',async()=>{
  const f=fixture();await f.interact();await f.advance(800);const audio=f.players[0];audio.currentTime=12;
  f.game.cinematic=true;f.music.sync();assert(audio.paused);f.game.cinematic=false;f.music.sync();await f.tick();assert(!audio.paused);
  f.document.hidden=true;f.events.visibilitychange();assert(audio.paused);f.document.hidden=false;f.events.visibilitychange();await f.tick();
  assert(!audio.paused);assert.equal(audio.currentTime,12);
  f.screen(false);f.music.sync();assert(audio.paused);
});
test('switching winter variants fades the old one out and does not leave two tracks playing',async()=>{
  const f=fixture();f.game.world=3;f.game.mission=2;await f.interact();await f.advance(800);const slow=f.players[0];
  f.game.mission=3;f.music.sync();await f.tick();await f.advance(800);
  assert(slow.paused);assert.equal(f.players.filter(p=>!p.paused).length,1);assert.equal(f.players[1].src,f.music.tracks.winter);
});
test('a blocked autoplay waits for interaction instead of retrying continuously',async()=>{
  const f=fixture();f.deny(true);await f.interact();await f.tick();const audio=f.players[0];await f.advance(1000);await f.advance(1000);assert.equal(audio.plays,1);
  f.deny(false);await f.interact();assert(!audio.paused);
});

test('a play interrupted by a duel can resume exploration without another gesture',async()=>{
  const f=fixture();f.deny('abort');await f.interact();await f.tick();
  f.screen(false);f.music.sync();f.deny(false);f.screen(true);f.music.sync();await f.tick();
  assert(!f.players[0].paused);assert.equal(f.players[0].plays,2);
});
