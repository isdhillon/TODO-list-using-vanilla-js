//Declarations
let inputArea=document.querySelector(".input-area")
let plusBtn=document.querySelector(".plus");
let taskSection=document.querySelector(".task-section");
let allTask=[];
let inputTask=document.querySelector(".input-box");
let modal=document.querySelector(".modal-container");
let completed=document.querySelector(".completed");
let completedclicked=true;
let tasklist=document.querySelector(".task-list");
let tasklistclicked=true;
//init local storage
if (localStorage.getItem('alltask-list')){
    //coversion from josn file
    allTask=JSON.parse(localStorage.getItem('alltask-list'))
    for(let i=0;i<allTask.length;i++){
        createFromLocalStorage(allTask[i])
    }
}
//making from local storage
function createFromLocalStorage(taskObj){
    //getting varaible from object
    let{id,checkSelected,text}=taskObj;
    //creating back the task input
    let task=document.createElement("div");
            task.setAttribute("class","task");
            task.innerHTML=`<i class="far square ${checkSelected}" ></i>
            <input type="text" class="input" value="${text}" id="${id}" contenteditable="false">
            <i class="fas fa-times cross"></i>`
            taskSection.appendChild(task);


}
//task section
taskSection.addEventListener("click",function(){
    let alltask=document.querySelectorAll(".task");
    let id;
    let input;
    for(let i=0;i<alltask.length;i++){
        let squareBtn=alltask[i].querySelector(".square");
        let taskId=alltask[i].querySelector(".input");
        //editing the input field
        taskId.addEventListener("click",function(){
            taskId.setAttribute("contenteditable","true");
            //updating local storage
            taskId.addEventListener("blur",function(){
                id=taskId.getAttribute('id');
                input=taskId.value;
                for(let i=0;i<allTask.length;i++){
                    if(allTask[i].id==id){
                        allTask[i].checkSelected=squareBtn.classList[2];
                        allTask[i].text=input;
                        localStorage.setItem('alltask-list',JSON.stringify(allTask))
                    }
                    
        
                }
            })
            
        })
        //sqaure box btn
        squareBtn.addEventListener("click",function(){
            id=taskId.getAttribute('id');
            input=taskId.value;
            if(squareBtn.classList.contains("fa-square")){
                squareBtn.classList.add("fa-check-square")
                squareBtn.classList.remove("fa-square");

  
            }
            else{
                squareBtn.classList.add("fa-square");
                squareBtn.classList.remove("fa-check-square")
            }
            //updating local storage
            for(let i=0;i<allTask.length;i++){
                if(allTask[i].id==id){
                    allTask[i].checkSelected=squareBtn.classList[2];
                    allTask[i].text=input;
                    localStorage.setItem('alltask-list',JSON.stringify(allTask))
                }
                
    
            }
            
        })
        //crossbtn
        let crossBtn=alltask[i].querySelector(".cross");
        crossBtn.addEventListener("click",function(){
            let taskId=alltask[i].querySelector(".input");
                id=taskId.getAttribute('id');
                //updating local storage
                for(let i=0;i<allTask.length;i++){
                    if(allTask[i].id==id){
                        allTask.splice(id,1)
                        localStorage.setItem('alltask-list',JSON.stringify(allTask))
                    }
                }
            alltask[i].remove()

        })
    }


})
//plus buttton
plusBtn.addEventListener("click",function(){
    //making the input appear
    modal.style.display="none";
    inputTask.style.display="block";
    let checkedSelected="fa-square"
    inputArea.addEventListener("keydown",function(e){
        //entering text
        if(e.key=='Enter' && inputArea.value!=""){
            input=inputArea.value;
            let task=document.createElement("div");
            let id=Math.random().toString(32).slice(2);
            task.setAttribute("class","task");
            task.innerHTML=`<i class="far ${checkedSelected} square" ></i>
            <input type="text" class="input" value="${input}" id="${id}" contenteditable="false">
            <i class="fas fa-times cross"></i>`
            taskSection.appendChild(task);
            //setting the local storage
            let taskObj={};
            taskObj.id=id;
            taskObj.text=input;
            taskObj.checkSelected=checkedSelected;
            allTask.push(taskObj);
            localStorage.setItem("alltask-list",JSON.stringify(allTask))
            inputTask.style.display="none"
            modal.style.display="block"
            inputArea.value=""

        }
    })
})
//tasklist heading
tasklist.addEventListener("click",function(){
    if(tasklistclicked==true){
        completed.style.backgroundColor="white"
        tasklist.style.backgroundColor="#cc00ff"
        let alltask=document.querySelectorAll(".task");
        //displaying all tasks
        for(let i=0;i<alltask.length;i++){
            alltask[i].style.display="block"
        }
        tasklistclicked=false;
    }
    else{
        tasklistclicked=true;
    }
})
//completed heading
completed.addEventListener("click",function(){
    if(completedclicked==true){
        completed.style.backgroundColor="#cc00ff"
        tasklist.style.backgroundColor="white"
        let alltask=document.querySelectorAll(".task");
        //displayig the check box when heading is clicked
        for(let i=0;i<alltask.length;i++){
            let completedtasks=alltask[i].querySelector(".square");
            //hiding all the tasks
            alltask[i].style.display="none"
            if(completedtasks.classList.contains("fa-check-square")){
                //displaying only the tasks which have check box
                alltask[i].style.display="block"
            }
        }
        completedclicked=false;
    }
    else{
        completedclicked=true;
    }
})


