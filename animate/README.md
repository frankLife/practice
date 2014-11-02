1. 开始位置和结束位置最好相对于原来的样式不变
2. perspective 与 transform-origin 的关系，perspective会创建一个3d环境 ，并且会给一个perspective view,preserve-3d会使子元素在统一的一个3d环境中
3. transform 中，如果存在perspective属性，则顺序应该是transform所有指中第一个
