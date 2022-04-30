

// Helpers funtions //

function elementFinder(id){
    return document.getElementById(id);
}

// End of helper functions // 



function repositionElement(x, y, element_id) {

    console.log(element_id);

    const LeftinPercentage = ((x*100)/containerWidth).toFixed(2);
    const TopinPercentage = ((y*100)/containerHeight).toFixed(2);

    const boxWrapper = elementFinder(`box-wrapper_${element_id}`);

    boxWrapper.style.left = LeftinPercentage + '%';
    boxWrapper.style.top = TopinPercentage + '%';
   
    const item_element_id = {
        'left': x,
        'top': y
    }
    
    itemdimensions[0] = item1;

}


const listeningAllBoxs = () => {

    const allBoxs = document.querySelectorAll( "#box" );
    allBoxs.forEach( element => {
        element.onclick = function(event) {
            const number = element.getAttribute( "data-current-box-number" )
            alert( number )
        }
        
    } )
}




////// Add new Section //////

let currentSections = 1;

elementFinder('addNewSectionButton').addEventListener('click', function(){

    const newSectionNumber = currentSections += 1;
    
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', `section_${newSectionNumber}`);

    const newHtml = `
    <div class="box-wrapper" id="box-wrapper_${newSectionNumber}">
        <div class="box_${newSectionNumber} box_section" id="box" data-current-box-number="${newSectionNumber}"> 

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

    var newWrapper = document.getElementById(`box-wrapper_${newSectionNumber}`);
    
    newWrapper.style.left = '50%';
    newWrapper.style.top =  '50%';

    const newBox = document.getElementById(`box_${newSectionNumber}`);
    newBox.style.width = '80px';
    newBox.style.height = '80px';



 
  
});


listeningAllBoxs();
