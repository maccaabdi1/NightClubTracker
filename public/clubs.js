const yellowClubThreshold ={
    
    "counter1": {threshold : 70, container: "clubArcane", status: "clubArcaneStatus"},  //Club Arcane
    "counter2": {threshold : 30, container: "clubUnderGround", status : "clubUnderGroundStatus"}, //Club Underground
    "counter3": {threshold : 12, container: "clubSoda" , status: "clubSodaStatus"}, //club soda
    "counter4": {threshold : 32, container: "studio52", status: "studio52Status"} //studio 52
}
const redMaxCapacity ={
    
    "counter1": {capacity : 100, container: "clubArcane"},  
    "counter2": {capacity : 50, container: "clubUnderGround"}, 
    "counter3": {capacity : 20, container: "clubSoda"}, 
    "counter4": {capacity: 52, container: "studio52" } 
}

function getSelectedClub(){
    
    let selectedClub = document.querySelector('input[name="option"]:checked')
    return selectedClub ? selectedClub.value :null;
}

function enterClub(){
    let club = getSelectedClub()
    
    if(club){
        
        let counter = document.getElementById(club)
        let count = parseInt(counter.textContent);
  
        if(count >= redMaxCapacity[club].capacity){
            return;
        }
        count += 1;
        counter.textContent = count;

        let clubContainer = document.getElementById(yellowClubThreshold[club].container);
        let statusText = document.getElementById(yellowClubThreshold[club].status);

        if(count >=  yellowClubThreshold[club].threshold){  
            clubContainer.style.backgroundColor = "#FDFD96";
            statusText.textContent = "Warn the bouncers…";
        }else{
            statusText.textContent="Welcome!"
        }
       
        if(count >= redMaxCapacity[club].capacity){
            clubContainer.style.backgroundColor= "#FF6961";
            statusText.textContent = "No one allowed in!"
        }
    }
}
function leaveClub(){
    
    let club = getSelectedClub()
    
    if(club){
        
        let counter = document.getElementById(club)
        let count  = parseInt(counter.textContent)
        count = Math.max(0,count - 1)
        counter.textContent = count //make sure the count doesn't go below 
        
        let clubContainer = document.getElementById(yellowClubThreshold[club].container);
        let statusText = document.getElementById(yellowClubThreshold[club].status);
    
        
        if(count === 0){
            
                statusText.textContent = "";
        }
        else if(count <  yellowClubThreshold[club].threshold){  
            clubContainer.style.backgroundColor = "";
            statusText.textContent = "Welcome!";
            
        }
        
        else if(count < redMaxCapacity[club].capacity){
            clubContainer.style.backgroundColor= "#FDFD96";
            statusText.textContent = "Warn the bouncers…";
        }
    
    
    }

}
