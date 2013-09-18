jquery.imageBgBlur
==================

## 参数说明及默认值

``` js
$(selector).imageBgBlur({
	selector:'img',        //图片选择器
	bgColor:"fff",         //文字背景颜色
	opacity:.55,           //文字背景颜色透明度
	strength:6,            //图片模糊强度
	blurPosition:"0 100%", //背景图片定位
	blurBefore:$.noop(),   //图片模糊前调用
	blurBack:$.noop()      //图片模糊后调用
})
```

## 单个参数调整

``` html
<div class="txt" data-bgcolor="633" data-opacity="0.2" data-strength="0.2" data-blurposition="0.2"></div>
```
可以通过以上4个data参数，进行单个的调整

## demo地址

[http://sjmlsxp.github.io/imagedemo/](http://sjmlsxp.github.io/imagedemo/)

## 应用示例demo地址

[http://sjmlsxp.github.io/imagedemo/slider.html](http://sjmlsxp.github.io/imagedemo/slider.html)

//todo 其他说明
