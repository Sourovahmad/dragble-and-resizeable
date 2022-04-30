

// Helpers funtions //

function elementFinder(id){
    return document.getElementById(id);
}

// End of helper functions // 





////// Add new Section //////

let currentSections = 2;

elementFinder('addNewSectionButton').addEventListener('click', function(){

    const newSectionNumber = currentSections += 1;
    
    const newHtml = `<div id="full_Box_${newSectionNumber}">
    <div class="box-wrapper" id="box-wrapper_${newSectionNumber}">
        <div class="box_${newSectionNumber} box_section" id="box_${newSectionNumber}" data-current-box-number="${newSectionNumber}"> 

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
</div>`


    elementFinder('full_container').insertAdjacentHTML('beforeend', newHtml);
    var newWrapper = document.getElementById(`box-wrapper_${newSectionNumber}`);
    
    newWrapper.style.left = 50 + '%';
    newWrapper.style.top = 50 + '%';

  
});


const boxSection = document.getElementsByClassName('box_section');

Array.prototype.forEach.call(boxSection, function(el) {
    el.addEventListener('mousedown', function(){
        const currentBoxNumber = this.getAttribute('data-current-box-number');
        


    });

});
