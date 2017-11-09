// get the buttons in the DOM //

var punchInBtn = document.querySelectorAll('.punch-in');
var lunchInBtn = document.querySelectorAll('.lunch-in');
var lunchOutBtn = document.querySelectorAll('.lunch-out');
var punchOutBtn = document.querySelectorAll('.punch-out');

// get the table cells in the DOM //
var pInDate = document.querySelector('.punch-in-date');
var pInTime = document.querySelector('.punch-in-time');

var lInDate = document.querySelector('.lunch-in-date');
var lInTime = document.querySelector('.lunch-in-time');

var lOutDate = document.querySelector('.lunch-out-date');
var lOutTime = document.querySelector('.lunch-out-time');

var pOutDate = document.querySelector('.punch-out-date');
var pOutTime = document.querySelector('.punch-out-time');

// get editing controls
var pencils = document.querySelectorAll('.fa-pencil');
var trashcans = document.querySelectorAll('.fa-trash-o');
var checkmarks = document.querySelectorAll('.fa-check');
var forms = document.querySelectorAll('form');
var refresh = document.querySelector('.fa-refresh');
forms.forEach(form => {addEventListener('submit', function(e) {e.preventDefault();})});
// create a dataset to store the day's punches

let punches = JSON.parse(localStorage.getItem('punches')) ||
[{"punch":"","date":"","time":"","done":false},{"punch":"","date":"","time":"","done":false},{"punch":"","date":"","time":"","done":false},{"punch":"","date":"","time":"","done":false}];
localStorage.setItem('punches', JSON.stringify(punches));

// populate table function

function populateTable(){
    pInTime.querySelector('[name=time]').value = punches[0].time;
    pInDate.querySelector('[name=date]').value = punches[0].date;
    lInTime.querySelector('[name=time]').value = punches[1].time;
    lInDate.querySelector('[name=date]').value = punches[1].date;
    lOutTime.querySelector('[name=time]').value = punches[2].time;
    lOutDate.querySelector('[name=date]').value = punches[2].date;
    pOutTime.querySelector('[name=time]').value = punches[3].time;
    pOutDate.querySelector('[name=date]').value = punches[3].date;
}

if (punches === [{"punch":"","date":"","time":"","done":false},{"punch":"","date":"","time":"","done":false},{"punch":"","date":"","time":"","done":false},{"punch":"","date":"","time":"","done":false}]){
  trashAll();
} else {
  populateTable();
}

// variable to test if previous punch has been made
let punchInCheck = false;
let lunchInCheck = false;
let lunchOutCheck = false;

// functions
function updateTable(e){
  e.preventDefault();
  const rowType = e.target.dataset.name;
  console.log(e.target.dataset.name);
  const punch = {
    punch: rowType,
    date: currentDate,
    time: currentTime,
    done: true
  };
  function classCheck(check){
    var test = e.target.getAttribute("class").includes(`${check}`);
    return test;
  }

  if (classCheck('punch-in')){
    punchInCheck = true;
    // e.target.innerHTML = "SUCCESS!";
    e.target.classList.remove("btn");
    e.target.classList.add("success");
    pInTime.querySelector('[name=time]').value = currentTime;
    pInDate.querySelector('[name=date]').value = currentDate;
    punches.splice(0, 1, punch);
    console.table(punches);
    localStorage.setItem('punches', JSON.stringify(punches));
    punchInBtn.forEach(btn => {btn.removeEventListener('click',updateTable)});
  } else if (classCheck('lunch-in')){
      if (punchInCheck){
        lunchInCheck = true;
        e.target.classList.remove("btn");
        e.target.classList.add("success");
        lInTime.querySelector('[name=time]').value = currentTime;
        lInDate.querySelector('[name=date]').value = currentDate;
        punches.splice(1, 1, punch);
        console.table(punches);
        localStorage.setItem('punches', JSON.stringify(punches));
        lunchInBtn.forEach(btn => {btn.removeEventListener('click',updateTable)});
      } else {
        alert("Please punch in before taking lunch!");
      }
  } else if (classCheck('lunch-out')){
      if (lunchInCheck){
        lunchOutCheck = true;
        e.target.classList.remove("btn");
        e.target.classList.add("success");
        lOutTime.querySelector('[name=time]').value = currentTime;
        lOutDate.querySelector('[name=date]').value = currentDate;
        punches.splice(2, 1, punch);
        console.table(punches);
        localStorage.setItem('punches', JSON.stringify(punches));
        lunchOutBtn.forEach(btn => {btn.removeEventListener('click',updateTable)});
      } else{
        alert("Please punch in lunch start before punching out!");
      }
  } else {
    if (lunchOutCheck){
      e.target.classList.remove("btn");
      e.target.classList.add("success");
      pOutTime.querySelector('[name=time]').value = currentTime;
      pOutDate.querySelector('[name=date]').value = currentDate;
      punches.splice(3, 1, punch);
      localStorage.setItem('punches', JSON.stringify(punches));
      console.table( JSON.parse( localStorage.getItem( 'punches' ) ) );
      punchOutBtn.forEach(btn => {btn.removeEventListener('click',updateTable)});
    } else {
      alert('Please end lunch before punching out!');
    }
  }
};

function allowEdits(e){
  const timeInput = e.target.parentElement.querySelector('[name=time]');
  timeInput.removeAttribute("readonly");
  timeInput.classList.add('hl');
  console.log(punches);
  timeInput.addEventListener('change', function(e){
    e.preventDefault();
    timeInput.setAttribute("readonly","");
    timeInput.classList.remove('hl');
    const punch = {
      punch: this.dataset.name,
      date: currentDate,
      time: timeInput.value,
      done: true
    };
    punches.splice(e.target.dataset.index, 1, punch);
    localStorage.setItem('punches', JSON.stringify(punches));
    console.table( JSON.parse( localStorage.getItem( 'punches' ) ) );
  })
}

function registerChange(e){
  const timeInput = e.target.parentElement.querySelector('[name=time]');
  timeInput.setAttribute("readonly", "");
  timeInput.classList.remove('hl');
}

function trashEntry(e){
  const timeInput = e.target.parentElement.querySelector('[name=time]');
  const punch = {
    punch: "",
    date: "",
    time: "",
    done: false
  };
  console.log(timeInput.dataset.index);
  punches.splice(timeInput.dataset.index, 1, punch);
  timeInput.value = "";
  localStorage.setItem('punches', JSON.stringify(punches));
  console.table( JSON.parse( localStorage.getItem( 'punches' ) ) );
}

function trashAll(){
  punches.forEach(function(punch, i){
    punches[i] = {
      punch: "",
      date: "",
      time: "",
      done: false
    };
  });
  localStorage.setItem('punches', JSON.stringify(punches));
  console.table( JSON.parse( localStorage.getItem( 'punches' ) ) );

  populateTable();

  punchInCheck = false;
  lunchInCheck = false;
  lunchOutCheck = false;

  const buttons = document.querySelectorAll("button")
  console.log(buttons);
  buttons.forEach(button=>{
    button.classList.add("btn");
    button.classList.remove("success");
  });
  punchInBtn.forEach(btn => {btn.addEventListener('click',updateTable)});
  lunchInBtn.forEach(btn => {btn.addEventListener('click',updateTable)});
  lunchOutBtn.forEach(btn => {btn.addEventListener('click',updateTable)});
  punchOutBtn.forEach(btn => {btn.addEventListener('click',updateTable)});

}

// add event listeners for buttons //

punchInBtn.forEach(btn => {btn.addEventListener('click',updateTable)});
lunchInBtn.forEach(btn => {btn.addEventListener('click',updateTable)});
lunchOutBtn.forEach(btn => {btn.addEventListener('click',updateTable)});
punchOutBtn.forEach(btn => {btn.addEventListener('click',updateTable)});

pencils.forEach(pencil => {pencil.addEventListener('click', allowEdits)});
checkmarks.forEach(checkmark => {checkmark.addEventListener('click', registerChange)});
trashcans.forEach(trashcan => {trashcan.addEventListener('click', trashEntry)});
refresh.addEventListener('click', trashAll)

// lunchInBtn.addEventListener('click', updateTable);
// lunchOutBtn.addEventListener('click', updateTable);
// punchOutBtn.addEventListener('click', updateTable);

// get new Date();
var currentDate;
var currentTime;

function updateTime(){
  currentDate = new Date().toLocaleDateString();
  currentTime = new Date().toLocaleTimeString();
};
