var Canvas = {
  reset: function (canvas,color,borderColor,borderWidth) {
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var halfBorderWidth = -1;

    color = color || '#aaa';
    borderColor = borderColor || '#222';
    borderWidth = borderWidth || '4px';
    halfBorderWidth = borderWidth/2;

    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.fillRect(0,0,width,height);
    ctx.strokeStyle(halfBorderWidth,halfBorderWidth,
                    canvas.width-halfBorderWidth,canvas.height-halfBorderWidth);
    ctx.restore();

  },
  drawImage: function(){}
}