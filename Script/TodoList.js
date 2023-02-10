var tasksList=[];
var list = document.getElementById("list");
var tasksSaved = JSON.parse(localStorage.getItem("tasks"));
let numOfTasksSaved = tasksSaved.length;

/***********************************Local Storage Part****************************************************** */
function retrieveData(){
    for(let k=0;k<numOfTasksSaved;k++){
        var task = tasksSaved[k].uncompleted || tasksSaved[k].completed;
        var list = document.getElementById("list");
        var rowTask = document.createElement("div");
        rowTask.className="rows";
        list.appendChild(rowTask);
  
        var tasks = document.createElement("p");
        tasks.id=task;
        tasks.className="tasks";
        var taskCont = document.createTextNode(task);
        tasks.appendChild(taskCont);
        rowTask.appendChild(tasks);
        if('completed' in tasksSaved[k]){
              tasks.style.setProperty("text-decoration", "line-through");
        }
        tasksList.push(tasksSaved[k]); 
        
        var Complete = document.createElement("button");
        Complete.className="Complete";
        var True = document.createTextNode("✓");
        Complete.appendChild(True);
        rowTask.appendChild(Complete);
        Complete.addEventListener("click", function(){
          var currTaskCont = tasksSaved[k].completed || tasksSaved[k].uncompleted;
          var currTask = document.getElementById(currTaskCont);
          currTask.style.setProperty("text-decoration", "line-through");
          tasksList.splice(k,1,{completed:currTaskCont,id:tasksSaved[k].id});
          localStorage.setItem("tasks", JSON.stringify(tasksList));
       });
  
       var Remove = document.createElement("button");
       Remove.className="Remove";
       Remove.id=tasksSaved[k].id;
       var False = document.createTextNode("x");
       Remove.appendChild(False);
       rowTask.appendChild(Remove);
  }
  var btns=document.querySelectorAll(".Remove");
  for(let x=0;x<btns.length;x++){
          btns[x].addEventListener("click",function(){
              btns[x].parentElement.remove();
              tasksList=tasksList.filter(elem => elem.id!=btns[x].id);
              
              localStorage.setItem("tasks", JSON.stringify(tasksList));
       });
  }
  
}
   
retrieveData(); 
/******************************************************************************************************************** */

function addTask(){
    var taskName = document.getElementById("taskName").value;
    var y=Math.random();
    if(taskName != null && taskName != ""){
        var list = document.getElementById("list");
        var rowTask = document.createElement("div");
        rowTask.className="rows";
        list.appendChild(rowTask);
        tasksList.push({uncompleted:taskName,id:y});

        var tasks = document.createElement("p");
        tasks.className="tasks";
        var taskCont = document.createTextNode(taskName);
        tasks.appendChild(taskCont);
        rowTask.appendChild(tasks);
    
    
        var Complete = document.createElement("button");
        Complete.className="Complete";
        var True = document.createTextNode("✓");
        Complete.appendChild(True);
        rowTask.appendChild(Complete);
        Complete.addEventListener("click", function(){
           Complete.parentNode.firstElementChild.style.setProperty("text-decoration", "line-through");
            var index1 = tasksList.findIndex(x => x.uncompleted === taskName);
            tasksList.splice(index1,1,{completed:taskName,id:y});
                localStorage.setItem("tasks", JSON.stringify(tasksList));
        });


        var Remove = document.createElement("button");
        Remove.className="Remove";
        var False = document.createTextNode("x");
        Remove.appendChild(False);
        rowTask.appendChild(Remove);
        Remove.addEventListener("click", function(){
            Remove.parentNode.remove();
            var index2 = tasksList.findIndex(x => x.uncompleted === taskName || x.completed === taskName);
            tasksList.splice(index2,1);
            localStorage.setItem("tasks", JSON.stringify(tasksList));
        });
    } 
    y++;
    localStorage.setItem("tasks", JSON.stringify(tasksList));
}



    





