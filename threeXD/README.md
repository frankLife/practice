**笔记**

0.  父元素只能使用属性perspective设置
1. cube例子中，如果存在没有设置rotate或者translate的cube面时，会出现设置变化的面，变化属性不生效的情况
2. cube中的backface-visibility只能针对translate为正值的情况
3. transform-style: preserve-3d;与perspective: 1200px。如果要想实现3d效果，则需要在父元素（祖先元素）加上perspective来做好视距，如果3d效果想在页面各个角度都展现成3d实现，则需要在父元素上加上preserve-3d来实现把子元素都放在3D环境中| "preserve-3d" will treat child elements as 3-D objects living in the same coordinate-space.
4. 子元素的rotate影响不能超过父元素的rotate后形成的区域限制


