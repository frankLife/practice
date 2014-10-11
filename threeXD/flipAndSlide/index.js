function bindFlip(){
  var trigger = document.getElementById('flipTrigger');
  var flip = document.getElementById('flip');

  flip.style.transform = "";
  trigger.addEventListener('click',function(){
    if(flip.style.transform == '') {
      flip.style.transform = 'rotateY(180deg)';
    }else {
      flip.style.transform = "";
    }
    
  });
}
bindFlip();