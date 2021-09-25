

var video = document.querySelector("#video");
sessionStorage.setItem("drawRectangle", "0");
sessionStorage.setItem("drawRectangleX", 0);
sessionStorage.setItem("drawRectangleY", 0);
sessionStorage.setItem("drawRectangleW", 0);
sessionStorage.setItem("drawRectangleH", 0);

video.onplay = function () {
  setTimeout(drawImgeC, 300);
};


function drawImgeC() {
  //alert('xcxc')
  var video = document.querySelector("#video");

  var canvas = document.querySelector("#canvas");

  //console.log(canvas,"asccas")
  var ctx = canvas.getContext('2d');


  canvas.width = 370;
  canvas.height = 220;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  setTimeout(drawImgeC, 100);

  if (sessionStorage.getItem("drawRectangle") == '1') {
    ctx.fillStyle = 'rgba(0,0,255,0.5)';
    ctx.fillRect(sessionStorage.getItem("drawRectangleX"), sessionStorage.getItem("drawRectangleY"), sessionStorage.getItem("drawRectangleW"), sessionStorage.getItem("drawRectangleH"));


  }

}


function drawRectangle() {
  var video = document.querySelector("#video");
  video.pause()
  sessionStorage.setItem("drawRectangle", "1");

  var canvas = new fabric.Canvas('canvas', { selection: false });

  var rect, isDown, origX, origY;

  canvas.on('mouse:down', function (o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    var pointer = canvas.getPointer(o.e);
    rect = new fabric.Rect({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      width: pointer.x - origX,
      height: pointer.y - origY,
      angle: 0,
      fill: 'rgba(255,0,0,0.5)',
      transparentCorners: false
    });
    canvas.add(rect);
    console.log('12122', origX, origY, pointer.x - origX, pointer.x - origY)
    sessionStorage.setItem("drawRectangleX", origX);
    sessionStorage.setItem("drawRectangleY", origY);


  });

  canvas.on('mouse:move', function (o) {
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);

    if (origX > pointer.x) {
      rect.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      rect.set({ top: Math.abs(pointer.y) });
    }

    rect.set({ width: Math.abs(origX - pointer.x) });
    rect.set({ height: Math.abs(origY - pointer.y) });

    console.log('22122', Math.abs(pointer.x), Math.abs(pointer.y), Math.abs(origX - pointer.x), Math.abs(origY - pointer.y))

    //sessionStorage.setItem("drawRectangleX", Math.abs(pointer.x));
    //sessionStorage.setItem("drawRectangleY", Math.abs(pointer.y));
    sessionStorage.setItem("drawRectangleW", Math.abs(origX - pointer.x));
    sessionStorage.setItem("drawRectangleH", Math.abs(origY - pointer.y));


    canvas.renderAll();
  });

  canvas.on('mouse:up', function (o) {
    video.play()
    isDown = false;
  });

}










