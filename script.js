
var box = document.getElementById("box");
var boxWrapper = document.getElementById("box-wrapper");

var initX, initY, mousePressX, mousePressY;

const itemdimensions = [];
itemdimensions[0] = {};
itemdimensions[1] = {};

function repositionElement(x, y) {

    boxWrapper.style.left = x + 'px';
    boxWrapper.style.top = y + 'px';

    elementFinder('selected_item').innerHTML = 'left: ' + x + "px" + ' top: ' + y + "px";

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





function elementFinder(id){
    return document.getElementById(id);
}


repositionElement(200, 200);








// box 2 

var box_2 = document.getElementById("box_2");
var box_2_wrapper = document.getElementById("box_2_wrapper");



var initX_box_2, initY_box_2, mousePressX_box_2, mousePressY_box_2;

function repositionElement_box_2(x, y) {

    box_2_wrapper.style.left = x + 'px';
    box_2_wrapper.style.top = y + 'px';
    elementFinder('selected_item_2').innerHTML = 'left: ' + x + "px" + ' top: ' + y + "px";

    const item2 = {
        'left': x,
        'top': y
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
        console.log(event);
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


