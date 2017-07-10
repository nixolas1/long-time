function playCanvas() {
  var canv = document.getElementById('canvas');
  canv.width = window.innerWidth;
    canv.height = window.innerHeight;

    var  
      w = canv.width,
      h = canv.height,
      x = w / 2,
      y = h / 2,
      len_diff = 60,
      radians = 360 * (Math.PI / 180),
      display_text = true,
      ctx = canv.getContext('2d');
      ctx.font = 'bold 16px Comfortaa';
      ctx.lineCap = 'round';

  function drawHand(ctx, level, hand, num_hands) {
    const fraction = hand.time;
    const desc = hand.text;
    const angle = fraction * radians;
    const percent = Math.round(fraction * 100);
    const hand_len = (level / num_hands) * (y * 0.8);
    const end_x = x + Math.sin(angle) * hand_len;
    const end_y = y - Math.cos(angle) * hand_len;
    const light = (level / num_hands) * 94;
    const satur = (fraction % 1) * 100;
    const width = 15 * level;

    ctx.strokeStyle = 'hsl(0, ' + satur + '%, ' + light + '%)';

    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(end_x, end_y);
    ctx.stroke();
    if(display_text) {
      ctx.save();
      ctx.translate(end_x , end_y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillText(desc + ' ' + percent + '%', 0, -width/2);
      ctx.restore();
    }
  }
  
  canv.onclick = function(e) {
    display_text ^= true;
  }

  function draw() {
    requestAnimationFrame(draw);
    const n = Date.now();
    const d = new Date();

    const milli = d.getMilliseconds() / 100;
    const sec = n / 1000;
    const min = sec / 100;

    const second   = (sec % 1) / 1;
    const minute   = (sec % 60) / 60;
    const hour     = (min % 36) / 36; //todo: local time
    const day      = (min % 864) / 864;
    const week     = ((d.getDay() + 6) % 7 + day) / 6;
    const month    = d.getDate() / 31 + week / 31;
    const year     = d.getMonth() / 12 + month / 12;
    const century  = (d.getFullYear() % 100) / 100;
    const human    = (23 + ((d.getFullYear() - 2017) / 88)) / 88; // how long will you live
    const species    = (300000 + (d.getFullYear() / 350000)) / 350000; // how long speciess existed / how long we exist
    const galactic = (54 + (d.getFullYear() / 1000000000) % 84) / 84; //birth of galaxy 54 galactic years ago, merge with andromeda in 30.
    const universe = 1.3799 / Math.pow(10, 90);


    let hands = [
      //milli,
      {time: second,   text: 'Second'},
      {time: minute,   text: 'Minute'},
      {time: hour,     text: 'Hour'},
      {time: day,      text: 'Day'},
      {time: week,     text: 'Week'},
      {time: month,    text: 'Month'},
      {time: year,     text: 'Year'},
      {time: human,    text: 'Your lifetime'},
      {time: century,  text: 'Century'},
      {time: species,   text: 'Spiecies Lifetime'},
      {time: galactic, text: 'Galactic lifetimes'},
      {time: universe, text: 'Universe lifetimes'},
    ];
    
    ctx.clearRect(0,0,w,h);
    
    const len = hands.length
    let i = len;
    while(i--){
      drawHand(ctx, i + 1, hands[i], len);  
    }

    //ctx.font = "3vw Helvetica";
    //ctx.fillText(century, x - w / 8, h - 60);
  }
  
  draw();
}

window.addEventListener('load', playCanvas );