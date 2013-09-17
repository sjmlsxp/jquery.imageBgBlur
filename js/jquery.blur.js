
(function($) {
	var ie = !-[1,];

	$.fn.imageBgBlur = function(options){
		var defaults = {
			selector:'img',
			bgColor:"fff",
			opacity:.55,
			strength:6
		}

		var opts = $.extend(defaults, options);

		return this.each(function() {
			var $this = $(this),
				imgSrc = $this.find(opts.selector).attr("src"),
				txt = $this.find(".txt"),
				bgColor = txt.data('bgcolor') || opts.bgColor,
				opacity = txt.data('opacity') || opts.opacity,
				strength = txt.data('strength') || opts.strength,
				txtWrap = txt.wrapInner("<div class='txtWrap' />").find(".txtWrap"),
				txtBg = $('<div class="txtBg" />').appendTo(txt),
				top = txt.position().top,
				left = txt.position().left,
				position = -left + "px " + (-top +"px");

			changeColor({
				bgColor:bgColor+"",
				opacity:opacity,
				el:txtWrap
			});

			imageblur(txtBg,imgSrc,strength,position);
		});
	}

	function changeColor(opts) {
	    var pattern = /^[0-9a-fA-F]{6}$/,
	        pattern_3 = /^[0-9a-fA-F]{3}$/,
	        num = Math.floor((Math.floor(opts.opacity * 100) / 100) * 255),
	        num_10 = (Math.floor(opts.opacity * 100) / 100),
	        num_change = num.toString(16);

	    num = parseInt(num);

	    if (opts.bgColor.match(pattern) == null) {
	        if (opts.bgColor.length == 3) {
	            if (opts.bgColor.match(pattern_3) == null) {
	                console.log("十六进制是从【0】到【9】以及【a】到【f】组合而成的，再来一次吧！\n如果是十六进制的缩写，是前后相邻的字母可简写成为一个，例如【#FF000FF】可转为【#F0F】\n请检查你的颜色值是否为【三位】或者符合【十六进制的组合方式】。");
	            } else {
	                if (opts.opacity >= 0 && opts.opacity <= 1) {
	                    if (num_change.length == 1) {
	                        num_change = "0" + num_change;
	                    }
	                    var co_a = opts.bgColor.substring(0, 1),
	                        co_b = opts.bgColor.substring(1, 2),
	                        co_c = opts.bgColor.substring(2, 3),
	                        co_a2 = co_a + co_a,
	                        co_b2 = co_b + co_b,
	                        co_c2 = co_c + co_c,
	                        co = co_a2 + co_b2 + co_c2;

	                    if (ie) {
	                        opts.el.attr('style', "filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#" + num_change.toUpperCase() + co.toUpperCase() + "', endColorstr='#" + num_change.toUpperCase() + co.toUpperCase() + "')");
	                    } else {
	                        opts.el.css("background","rgba(" + parseInt(co_a2, 16) + "," + parseInt(co_b2, 16) + "," + parseInt(co_c2, 16) + "," + num_10 + ")")
	                    }
	                } else {
	                    console.log("透明度的值在【0】到【1】之间。");
	                }
	            }
	        } else {
	            console.log("十六进制是从【0】到【9】以及【a】到【f】组合而成的，再来一次吧！\n如果是十六进制的缩写，是前后相邻的字母可简写成为一个，例如【#FF000FF】可转为【#F0F】\n请检查你的颜色值是否为【三位】或者符合【十六进制的组合方式】。");
	        }
	    } else {
	        if (opts.opacity >= 0 && opts.opacity <= 1) {
	            if (num_change.length == 1) {
	                num_change = "0" + String(num_change);
	            }
	            var co_a = opts.bgColor.substring(0, 2),
	                co_b = opts.bgColor.substring(2, 4),
	                co_c = opts.bgColor.substring(4, 6);

                if (ie) {
                    opts.el.attr('style', "filter:progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#" + num_change.toUpperCase() + opts.bgColor.toUpperCase() + "', endColorstr='#" + num_change.toUpperCase() + opts.bgColor.toUpperCase() + "')");
                } else {
                    opts.el.css("background","rgba(" + parseInt(co_a, 16) + "," + parseInt(co_b, 16) + "," + parseInt(co_c, 16) + "," + num_10 + ")")
                }
	        } else {
	            console.log("透明度的值在【0】到【1】之间。");
	        }
	    }
	}

	function imageblur(element, src, strength, position){
		if(ie){
			element.attr("style","background: url("+src+") no-repeat "+position+";filter: progid:DXImagetransform.microsoft.blur(makeshadow=false,pixelradius="+(strength+4)+",shadowopacity=0);");
			return;
		}
		if(window.WebKitPoint){
	        element.css({"background":'url('+src+') no-repeat '+position,"-webkit-filter":"blur("+(strength+4)+"px)"});
	        return;
		};

	    var image = new Image();
	    image.onload = function(e){
	        var canvas = document.createElement('canvas');
	        var context = canvas.getContext('2d');

	        canvas.width = this.width;
	        canvas.height = this.height;
	        
	        context.drawImage(this, 0, 0);
	        
	        context.globalAlpha = 0.3; 

	        for (var y = -strength; y <= strength; y += 2) {
	            for (var x = -strength; x <= strength; x += 2) {
	                context.drawImage(canvas, x, y);
	            }
	        }
	        context.globalAlpha = 1;
	        console.log(position)
	        element.css("background",'url('+canvas.toDataURL()+') no-repeat '+position);
	    }
	    image.src = src;
	}
})(jQuery);