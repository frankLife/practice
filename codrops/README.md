1. 多个节点动画，会导致重绘影响其他元素，通过包裹元素来减少发生动画的节点。或者通过z-index来分离渲染层
2. 动画终态应该设置的样式应该是元素样式的子集
3. delay应该比前一个动画时间短，这样看起来会更加连贯
4. translate-origin不会随着translate变化，所以可能需要根据tranlate来调整transform-origin(比如在找到旋转圆心的需求的时候)
5. transform在设置transiform-time的时候，相当于设置了这个动画的transition
6. translate是在当前元素位置的基础上，所以可以设置position来定好位置之后来用translate进行变换
7. tranform的变换都是基于前一个变换状态
8. 利用keyframes设置相同，可以达到delay的效果，这样还可以避免最终状态的提前显示(动画播放完成后，还是会显示设置到元素上的初始属性)
?
1. z-index影响repaint rectangle机制是
2. perspective 设置时和未设置时的差别