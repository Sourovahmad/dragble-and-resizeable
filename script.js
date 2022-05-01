

// Helpers funtions //

function elementFinder(id){
    return document.getElementById(id);
}

const NewcontainerWidth = elementFinder('full_container').offsetWidth;
const NewcontainerHeight = elementFinder('full_container').offsetHeight;




// End of helper functions // 



function repositionElement_boxs(x, y,element_id) {

    console.log(element_id);

    const BoxLeftinPercentage = ((x*100)/NewcontainerWidth).toFixed(2);
    const BoxTopinPercentage = ((y*100)/NewcontainerHeight).toFixed(2);

    const NewboxWrapper = elementFinder(`box-wrapper_${element_id}`);

    NewboxWrapper.style.left = BoxLeftinPercentage + '%';
    NewboxWrapper.style.top = BoxTopinPercentage + '%';
   


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

            console.log(selectedElementDot);
        

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
