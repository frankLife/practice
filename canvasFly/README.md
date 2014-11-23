1. fillRect、arc、rect含有beginPath、closePath的效果 (?)
2. transform都类似坐标系变换，而在canvas画的图形变换实际上是图形在变换之后的坐标系形成的效果
3. gradient实际上有一个渐变图，是基于canvas本身的，不是基于stroke或者fill坐标的
4. 字体的measureText方法会根据当前设置的font属性来计算实际大小的
5. html的lang属性会影响到英文字体的显示
4. fillText的位置是以自体的baseline为准的