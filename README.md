emmm，乱七八糟的东西

/* PIXIJS */
1. 图片loader
2. 画布自适应
3. BaseTexture 纹理缓存类

/* 浏览器兼容 */
1. Safari不支持 new Date('2018-09-10 20:20:20') 不支持杠杠 0.0;
2. passive: flase 阻止浏览器默认橡皮筋效果

/* CSS */
1. touch-action 指定是否，以及以何种方式，给定的区域，可以由用户通过触摸屏操作
(简而言之，意思是：这里能不能touch，怎么touch，它说了算。)


/* react-motion */
1. 动效 spring：
  val:（必填）Number，
  config:（可选）
    stiffness: 韧性 默认: 170，
    damping: 阻力 默认: 26，
    precision: 密度 默认: 0.01，

2. 预先配置 presets：
  noWobble: {stiffness: 170, damping: 26}, // the default, if nothing provided
  gentle: {stiffness: 120, damping: 14},
  wobbly: {stiffness: 180, damping: 12},
  stiff: {stiffness: 210, damping: 20},

/* [`react-beautiful-dnd`](http://www.weber.pub/archives/53.html) */
DragDropContext：包裹拖拽的dom，添加拖拽事件
  onDragStart：拖动开始
  onDragUpdate：拖动过程中发生某些变化
  onDragEnd：拖动结束 // 必填项
Droppable：包裹Draggable组件
Draggable：拖拽组件