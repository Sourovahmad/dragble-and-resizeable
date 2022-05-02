

// Helpers funtions //

function elementFinder(id){
    return document.getElementById(id);
}

const NewcontainerWidth = elementFinder('full_container').offsetWidth;
const NewcontainerHeight = elementFinder('full_container').offsetHeight;




// End of helper functions // 
 






function repositionElement_boxs(x, y,element_id) {

    const BoxLeftinPercentage = ((x*100)/NewcontainerWidth).toFixed(2);
    const BoxTopinPercentage = ((y*100)/NewcontainerHeight).toFixed(2);

    const NewboxWrapper = elementFinder(`box-wrapper_${element_id}`);

    NewboxWrapper.style.left = BoxLeftinPercentage + '%';
    NewboxWrapper.style.top = BoxTopinPercentage + '%';
}


function resize_box(e,w, h){

    const newBoxWrapper = elementFinder(`box-wrapper_${e}`)
    const newBox =  newBoxWrapper.querySelector(`#boxs`)

    newBox.style.width = w + 'px';
    newBox.style.height = h + 'px';

    elementFinder('box_1_dimensin_details').innerHTML =  w + "px" + "/" + h + "px";
}









const listeningAllBoxs = () => {

    const allBoxs = document.querySelectorAll( "#boxs" );
    allBoxs.forEach( element => {



        element.onmousedown = function(event) {

            const currentElementNumber = element.getAttribute( "data-current-box-number" );

            if (event.target.className.indexOf("dot") > -1) {
                return;
            }

            const currentElement = elementFinder(`box-wrapper_${currentElementNumber}`);
     
         let initX_currentElementNumber = currentElement.offsetLeft;
         let  initY_currentElementNumber = currentElement.offsetTop;
          let   mousePressX_currentElementNumber = event.clientX;
          let  mousePressY_currentElementNumber = event.clientY;

            function eventMoveHandler_for_box(event) {
                repositionElement_boxs(initX_currentElementNumber + (event.clientX - mousePressX_currentElementNumber),
                initY_currentElementNumber + (event.clientY - mousePressY_currentElementNumber),currentElementNumber);
            }

            currentElement.addEventListener('mousemove', eventMoveHandler_for_box, false);



            window.addEventListener('mouseup', function eventEndHandler() {
                currentElement.removeEventListener('mousemove', eventMoveHandler_for_box, false);
                window.removeEventListener('mouseup', eventEndHandler);
            }, false);

            elementFinder('currentSelectedSection').innerHTML = currentElementNumber;

            const prevDots = document.querySelectorAll(".selected_dot");

            prevDots.forEach( dot => {
                dot.classList.remove("selected_dot");
            });

            const selectedElementDot = currentElement.querySelectorAll( ".dot" );
            selectedElementDot.forEach( element => {
                element.classList.add( "selected_dot" );
            });


            // this is for adding pixel in top right 
            const ThenewBox =  currentElement.querySelector(`#boxs`);
            const theNewboxW = ThenewBox.offsetWidth;
            const theNewboxH = ThenewBox.offsetHeight;
            elementFinder('box_1_dimensin_details').innerHTML =  theNewboxW + "px" + "/" + theNewboxH + "px";





            // resize element start here

            const crentE = currentElementNumber;

            var rightMid_crentE = elementFinder(`right-mid_${crentE}`);
            var leftMid_crentE = elementFinder(`left-mid_${crentE}`);
            var topMid_crentE = elementFinder(`top-mid_${crentE}`);
            var bottomMid_crentE = elementFinder(`bottom-mid_${crentE}`);

            var leftTop_crentE = elementFinder(`left-top_${crentE}`);
            var rightTop_crentE = elementFinder(`right-top_${crentE}`);
            var rightBottom_crentE = elementFinder(`right-bottom_${crentE}`);
            var leftBottom_crentE = elementFinder(`left-bottom_${crentE}`);





            function resizeHandler_boxs(event, left = false, top = false, xResize = false, yResize = false) {


                const newBoxWrapper = elementFinder(`box-wrapper_${crentE}`)
                let newMinWidth = 80;
                let newMinHeight = 80;

               let newinitX = newBoxWrapper.offsetLeft;
               let newinitY = newBoxWrapper.offsetTop;

               let NewmousePressX = event.clientX;
               let NewmousePressY = event.clientY;


               const newBox =  newBoxWrapper.querySelector(`#boxs`)
            
               let newinitW = newBox.offsetWidth;
               let newinitH = newBox.offsetHeight;
            
                initRotate = getCurrentRotation_box(newBoxWrapper);
                var initRadians = initRotate * Math.PI / 180;
                var cosFraction = Math.cos(initRadians);
                var sinFraction = Math.sin(initRadians);
                
                function eventMoveHandler_for_box(event) {
                    var wDiff = (event.clientX - NewmousePressX);
                    var hDiff = (event.clientY - NewmousePressY);
                    var rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
                    var rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;
            
                    var newW = newinitW, newH = newinitH, newX = newinitX, newY = newinitY;
            
                    if (xResize) {
                        if (left) {
                            newW = newinitW - rotatedWDiff;
                            if (newW < newMinWidth) {
                              newW = newMinWidth;
                              rotatedWDiff = newinitW - newMinWidth;
                            }
                        } else {
                            newW = newinitW + rotatedWDiff;
                            if (newW < newMinWidth) {
                              newW = newMinWidth;
                              rotatedWDiff = newMinWidth - newinitW;
                            }
                        }
                        newX += 0.5 * rotatedWDiff * cosFraction;
                        newY += 0.5 * rotatedWDiff * sinFraction;
                    }
            
                    if (yResize) {
                        if (top) {
                            newH = newinitH - rotatedHDiff;
                            if (newH < newMinHeight) {
                              newH = newMinHeight;
                              rotatedHDiff = newinitH - newMinHeight;
                            }
                        } else {
                            newH = newinitH + rotatedHDiff;
                            if (newH < newMinHeight) {
                              newH = newMinHeight;
                              rotatedHDiff = newMinHeight - newinitH;
                            }
                        }
                        newX -= 0.5 * rotatedHDiff * sinFraction;
                        newY += 0.5 * rotatedHDiff * cosFraction;
                    }
            
                    resize_box(currentElementNumber,newW, newH);
                    repositionElement_boxs(newX, newY, currentElementNumber);
                }
            
            
                window.addEventListener('mousemove', eventMoveHandler_for_box, false);
                window.addEventListener('mouseup', function eventEndHandler() {
                    window.removeEventListener('mousemove', eventMoveHandler_for_box, false);
                    window.removeEventListener('mouseup', eventEndHandler);
                }, false);
            }
            
            
            
            function getCurrentRotation_box(el) {
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
            




            rightMid_crentE.addEventListener('mousedown', e => resizeHandler_boxs(e, false, false, true, false));
            leftMid_crentE.addEventListener('mousedown', e => resizeHandler_boxs(e, true, false, true, false));
            topMid_crentE.addEventListener('mousedown', e => resizeHandler_boxs(e, false, true, false, true));
            bottomMid_crentE.addEventListener('mousedown', e => resizeHandler_boxs(e, false, false, false, true));
            leftTop_crentE.addEventListener('mousedown', e => resizeHandler_boxs(e, true, true, true, true));
            rightTop_crentE.addEventListener('mousedown', e => resizeHandler_boxs(e, false, true, true, true));
            rightBottom_crentE.addEventListener('mousedown', e => resizeHandler_boxs(e, false, false, true, true));
            leftBottom_crentE.addEventListener('mousedown', e => resizeHandler_boxs(e, true, false, true, true));


        

        }
        
    } )
}




////// Add new Section //////

let currentSections = 1;

elementFinder('addNewSectionButton').addEventListener('click', function(){

    const newSectionNumber = currentSections += 1;
    

    if(newSectionNumber < 5){
        const newDiv = document.createElement('div');
        newDiv.setAttribute('id', `section_${newSectionNumber}`);
    
        const newHtml = `
        <div class="box-wrapper" id="box-wrapper_${newSectionNumber}" style="left: 50%; top: 50%;">
            <div class="box_${newSectionNumber} box_section" id="boxs" data-current-box-number="${newSectionNumber}"> 
    
                <div class="dot left-top" id="left-top_${newSectionNumber}"></div>
                <div class="dot left-bottom" id="left-bottom_${newSectionNumber}"></div>
                <div class="dot top-mid" id="top-mid_${newSectionNumber}"></div>
                <div class="dot bottom-mid" id="bottom-mid_${newSectionNumber}"></div>
                <div class="dot left-mid" id="left-mid_${newSectionNumber}"></div>
                <div class="dot right-mid" id="right-mid_${newSectionNumber}"></div>
                <div class="dot right-bottom" id="right-bottom_${newSectionNumber}"></div>
                <div class="dot right-top" id="right-top_${newSectionNumber}"></div>
                <p class="w-100 h-100 text-center d-flex justify-content-center align-items-center text-light flex-column"> <span> ${newSectionNumber} </span>  
                 </p>
            </div>
        </div>
    `
        newDiv.innerHTML = newHtml;
        elementFinder('full_container').appendChild(newDiv);
        listeningAllBoxs();
    }else{
        alert('You can not add more than 4 sections');
    }


 
  
});


listeningAllBoxs();
