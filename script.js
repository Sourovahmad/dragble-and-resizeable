
var box = elementFinder("box");
var boxWrapper = elementFinder("box-wrapper");

const containerWidth = elementFinder('full_container').offsetWidth;
const containerHeight = elementFinder('full_container').offsetHeight;

var initX, initY, mousePressX, mousePressY, initW, initH, initRotate;

const itemdimensions = [];
itemdimensions[0] = {};
itemdimensions[1] = {};


const minWidth = 40;
const minHeight = 40;






function repositionElement(x, y) {

    const LeftinPercentage = ((x*100)/containerWidth).toFixed(2);
    const TopinPercentage = ((y*100)/containerHeight).toFixed(2);

    boxWrapper.style.left = LeftinPercentage + '%';
    boxWrapper.style.top = TopinPercentage + '%';

    elementFinder('selected_item').innerHTML = 'left: ' + LeftinPercentage + "%" + ' top: ' + TopinPercentage + "%";

    const item1 = {
        'left': x,
        'top': y
    }
    
    itemdimensions[0] = item1;

}



// drag support
boxWrapper.addEventListener('mousedown', function (event) {
    if (event.target.className.indexOf("dot") > -1) {
        return;
    }

    initX = this.offsetLeft;
    initY = this.offsetTop;
    mousePressX = event.clientX;
    mousePressY = event.clientY;


    function eventMoveHandler(event) {
        repositionElement(initX + (event.clientX - mousePressX),
            initY + (event.clientY - mousePressY));
    }

    boxWrapper.addEventListener('mousemove', eventMoveHandler, false);
    window.addEventListener('mouseup', function eventEndHandler() {
        boxWrapper.removeEventListener('mousemove', eventMoveHandler, false);
        window.removeEventListener('mouseup', eventEndHandler);
    }, false);

}, false);
// done drag support



// resize section 

function resize(w, h) {
    box.style.width = w + 'px';
    box.style.height = h + 'px';

    elementFinder('box_1_dimensin_details').innerHTML =  w + "px" + "/" + h + "px";
    console.log(w);
}








function elementFinder(id){
    return document.getElementById(id);
}



var rightMid = document.getElementById("right-mid");
var leftMid = document.getElementById("left-mid");
var topMid = document.getElementById("top-mid");
var bottomMid = document.getElementById("bottom-mid");

var leftTop = document.getElementById("left-top");
var rightTop = document.getElementById("right-top");
var rightBottom = document.getElementById("right-bottom");
var leftBottom = document.getElementById("left-bottom");



function resizeHandler(event, left = false, top = false, xResize = false, yResize = false) {

    initX = boxWrapper.offsetLeft;
    initY = boxWrapper.offsetTop;
    mousePressX = event.clientX;
    mousePressY = event.clientY;

    initW = box.offsetWidth;
    initH = box.offsetHeight;

    initRotate = getCurrentRotation(boxWrapper);
    var initRadians = initRotate * Math.PI / 180;
    var cosFraction = Math.cos(initRadians);
    var sinFraction = Math.sin(initRadians);
    
    function eventMoveHandler(event) {
        var wDiff = (event.clientX - mousePressX);
        var hDiff = (event.clientY - mousePressY);
        var rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
        var rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;

        var newW = initW, newH = initH, newX = initX, newY = initY;

        if (xResize) {
            if (left) {
                newW = initW - rotatedWDiff;
                if (newW < minWidth) {
                  newW = minWidth;
                  rotatedWDiff = initW - minWidth;
                }
            } else {
                newW = initW + rotatedWDiff;
                if (newW < minWidth) {
                  newW = minWidth;
                  rotatedWDiff = minWidth - initW;
                }
            }
            newX += 0.5 * rotatedWDiff * cosFraction;
            newY += 0.5 * rotatedWDiff * sinFraction;
        }

        if (yResize) {
            if (top) {
                newH = initH - rotatedHDiff;
                if (newH < minHeight) {
                  newH = minHeight;
                  rotatedHDiff = initH - minHeight;
                }
            } else {
                newH = initH + rotatedHDiff;
                if (newH < minHeight) {
                  newH = minHeight;
                  rotatedHDiff = minHeight - initH;
                }
            }
            newX -= 0.5 * rotatedHDiff * sinFraction;
            newY += 0.5 * rotatedHDiff * cosFraction;
        }

        resize(newW, newH);
        repositionElement(newX, newY);
    }


    window.addEventListener('mousemove', eventMoveHandler, false);
    window.addEventListener('mouseup', function eventEndHandler() {
        window.removeEventListener('mousemove', eventMoveHandler, false);
        window.removeEventListener('mouseup', eventEndHandler);
    }, false);
}



function getCurrentRotation(el) {
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform")
    "none";
    if (tm != "none") {
        var values = tm.split('(')[1].split(')')[0].split(',');
        var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
        return (angle < 0 ? angle + 360 : angle);
    }
    return 0;
}




rightMid.addEventListener('mousedown', e => resizeHandler(e, false, false, true, false));
leftMid.addEventListener('mousedown', e => resizeHandler(e, true, false, true, false));
topMid.addEventListener('mousedown', e => resizeHandler(e, false, true, false, true));
bottomMid.addEventListener('mousedown', e => resizeHandler(e, false, false, false, true));
leftTop.addEventListener('mousedown', e => resizeHandler(e, true, true, true, true));
rightTop.addEventListener('mousedown', e => resizeHandler(e, false, true, true, true));
rightBottom.addEventListener('mousedown', e => resizeHandler(e, false, false, true, true));
leftBottom.addEventListener('mousedown', e => resizeHandler(e, true, false, true, true));





repositionElement(200, 200);
resize(80, 80);






// box 2 

var box_2 = document.getElementById("box_2");
var box_2_wrapper = document.getElementById("box_2_wrapper");



var initX_box_2, initY_box_2, mousePressX_box_2, mousePressY_box_2;

function repositionElement_box_2(x, y) {

    const LeftinPercentage_2 = ((x*100)/containerWidth).toFixed(2);
    const TopinPercentage_2 = ((y*100)/containerHeight).toFixed(2);

    box_2_wrapper.style.left = LeftinPercentage_2 + '%';
    box_2_wrapper.style.top = TopinPercentage_2 + '%';
    elementFinder('selected_item_2').innerHTML = 'left: ' + LeftinPercentage_2 + "%" + ' top: ' + TopinPercentage_2 + "%";

    const item2 = {
        'left': LeftinPercentage_2,
        'top': TopinPercentage_2
    }
    itemdimensions[1] = item2;

}



// drag support
box_2_wrapper.addEventListener('mousedown', function (event) {
    if (event.target.className.indexOf("dot") > -1) {
        return;
    }

    initX_box_2 = this.offsetLeft;
    initY_box_2 = this.offsetTop;
    mousePressX_box_2 = event.clientX;
    mousePressY_box_2 = event.clientY;



    // function eventMoveHandler(event) {
    //     repositionElement(initX + (event.clientX - mousePressX),
    //         initY + (event.clientY - mousePressY));
    // }



    function eventMoveHandler_2(event) {
        repositionElement_box_2(initX_box_2 + (event.clientX - mousePressX_box_2),
        initY_box_2 + (event.clientY - mousePressY_box_2));
    }

    box_2_wrapper.addEventListener('mousemove', eventMoveHandler_2, false);
    window.addEventListener('mouseup', function eventEndHandler() {
        box_2_wrapper.removeEventListener('mousemove', eventMoveHandler_2, false);
        window.removeEventListener('mouseup', eventEndHandler);
    }, false);

}, false);
// done drag support




repositionElement_box_2(400, 200);



elementFinder('savebutton').addEventListener('click', function(){
    console.log(JSON.stringify(itemdimensions));
});


