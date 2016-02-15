;(function(){
    window.WaterFall = function(configs){
        if(!configs.container)
            return;
        var container = document.querySelector(configs.container);
        configs.minColumn = configs.minColumn || 2;
        configs.colWidth = configs.colWidth || 200;
        configs.rowGap = configs.rowGap || 10;      //行边距放在下侧
        configs.colGap = configs.colGap ||10;       //列边距放在后侧

        var colNum = Math.max(parseInt(container.offsetWidth/(configs.colWidth+configs.colGap)), configs.minColumn);    //列数
        var colsHeight = new Array(colNum);         //保存每一列的高度的数组
        var minIndex = 0;                           //当前最短列的下标
        var maxIndex = 0;

        for(var i=0; i<colNum; i++){                //初始化高度数组都为0
            colsHeight[i] = 0;
        }

        var loadingTag = (function(){              //串行渲染标识
            var isLoading = false;
            return  function(il){
                if(il != undefined){
                    isLoading = il;
                }
                return isLoading;
            };
        })();

        /**
         * 判断对象是否为数组
         * @param obj
         * @returns {boolean}
         */
        function isArray(obj){
            return (Object.prototype.toString.call(obj)).indexOf('Array') != -1;
        }

        /**
         *将html字符串中加入left和top值
         * @param newItemText
         */
        function calculatePosition(newItemText){
            var leftStyle = /[^<]*(style\s*=\s*").*waterfall-item[^>]*/ig;
            var rightStyle = /[^<]*waterfall-item.*(style\s*=\s*")[^>]*/ig;
            var leftResult = leftStyle.exec(newItemText);           //匹配结果：[" div class="waterfall-item" style  =  "" ", "style  =  ""]
            var rightResult = rightStyle.exec(newItemText);         //匹配结果：[" div class="waterfall-item" style  =  "" ", "style  =  ""]
            var leftPos = minIndex * (configs.colWidth + configs.colGap);
            var topPos = colsHeight[minIndex] + configs.rowGap;

            if(!!leftResult && leftResult.length != 0){             //style在class左侧

                newItemText = newItemText.replace(leftResult[1].toString(), leftResult[1].toString() + "left:" + leftPos + "px; top:" + topPos + "px; width:" + configs.colWidth + "px;");

            } else if(!!rightResult && rightResult.length != 0){    //style在class右侧

                newItemText = newItemText.replace(rightResult[1].toString(), rightResult[1].toString() + "left:" + leftPos + "px; top:" + topPos + "px; width:" + configs.colWidth + "px;");

            } else {                                                //没有style

                var temp = newItemText.match(/[^<]*waterfall-item[^>]*/i)[0];
                newItemText = newItemText.replace(temp.toString(), temp.toString() + 'style = "top:' + topPos + 'px; left:' + leftPos + 'px; width:' + configs.colWidth + 'px;"');

            }
            return newItemText;
        }

        /**
         * 更新列高度数组，和最小高度列的下标
         * @param newItemHeight
         */
        function updateHeight(newItemHeight){
            newItemHeight = newItemHeight || 0;
            colsHeight[minIndex] += newItemHeight;
            for(var i in colsHeight){
                colsHeight = colsHeight;   //没有初始化的进行初始化
                if(colsHeight[i] < colsHeight[minIndex]){
                    minIndex = i;
                }
                if(colsHeight[i] > colsHeight[maxIndex]){
                    maxIndex = i;
                }
            }
            container.style.height = colsHeight[maxIndex] + "px";      //更改容器高度为所有列中最大
        }

        /**
         * 每次加载一页数据之后，添加到dom中的函数。
         * 此方法不能并行被调用，即一组数据还没有彻底填充完，另一组数据不能开始填充。这也是由图片高度未知导致的
         * @param arr
         * @param tmplId
         */
        function addItems(arr, tmplSelector){
            if(!isArray(arr))
                return;
            var waterTmpl = doT.template(document.querySelector(tmplSelector).innerText);
            addBundleItems(arr, 0, waterTmpl);
        }

        function addBundleItems(arr, i, waterTmpl){
            if(i >= arr.length){
                loadingTag(false);
                return;
            }
            var newItemText = waterTmpl(arr[i]);
            var posItemText = calculatePosition(newItemText);
            container.innerHTML += posItemText;
            var imgs = document.querySelectorAll('.waterfall-item img');
            imgs[imgs.length-1].onload = function(){
                updateHeight(this.offsetHeight + 30);    //在服务器没有返回图片高度的情况下。之后自己计算高度，等到图片加载完成之后才能确切高度；进行下一个item插入
                i++;
                addBundleItems(arr, i, waterTmpl);
            }
        };

        /**
         * 窗口变化时，动态改变已有元素排列，只对已有元素
         */
        function reflow(){
            colNum = Math.max(parseInt(container.offsetWidth/(configs.colWidth+configs.colGap)), configs.minColumn);    //列数
            colsHeight.length = 0;
            minIndex = 0;
            maxIndex = 0;
            //初始化高度数组都为0
            for(var i=0; i<colNum; i++){
                colsHeight[i] = 0;
            }

            var items = document.querySelectorAll('.waterfall-item');
            Array.prototype.forEach.call(items, function(item, i){
                var leftPos = minIndex * (configs.colWidth + configs.colGap);
                var topPos = colsHeight[minIndex] + configs.rowGap;

                item.style.left = leftPos + "px";
                item.style.top = topPos + "px";
                updateHeight(item.offsetHeight);
            });
        }

        var timer;
        window.onresize = function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
                reflow();
            }, 300);
        };

        /**
         * 滚动条是html.clientHeight < html.offsetHeight   所以是由于html过长导致的滚动条出现
         * @param e
         */
        window.onscroll = function(e){
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if(!loadingTag() && t + document.documentElement.clientHeight > container.offsetHeight - configs.loadDistance){
                loadingTag(true);
                configs.load(addItems);
            }
        }

        /**
         * 加载第一屏
         */
        var firstPageInterval;
        firstPageInterval = setInterval(function(){
            if(!loadingTag() && container.offsetHeight < document.documentElement.clientHeight) {
                loadingTag(true);
                configs.load(addItems);
            } else if(container.offsetHeight > document.documentElement.clientHeight){
                clearInterval(firstPageInterval);
            }
        }, 200);
    }
})()