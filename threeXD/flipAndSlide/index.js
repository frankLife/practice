function bindFlip(){
  var trigger = document.getElementById('flipTrigger');
  var trigger2 = document.getElementById('flipTrigger2');
  var flip = document.getElementById('flip');

  flip.style.transform = "";
  trigger.addEventListener('click',function(){
    flip.style.transformOrigin = '50%'
    if(flip.style.transform == '') {
      flip.style.transform = 'rotateY(180deg)';
    }else {
      flip.style.transform = "";
    }
    
  });
  trigger2.addEventListener('click', function(){
    console.log(flip.style.transform);
    flip.style.transformOrigin = '100%'
    if(flip.style.transform == '') {
      flip.style.transform = 'rotateY(-180deg) translateX(300px)';
    //   flip.style.transformOrigin = '50%'
    }else {
      flip.style.transform = "";
    //  flip.style.transformOrigin = '50%'
    }
  });

}
bindFlip();

function bindPrism(){
  var cssText = document.getElementById('cssText');
  var trigger = document.getElementById('changeStyle');
  var prism = document.getElementById('prism');

  trigger.addEventListener('click', function(){
    prism.style.transform = cssText.value + ' translateZ(-50px)';
  });
}
bindPrism();
