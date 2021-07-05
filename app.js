//selectors
const navMenu = document.querySelector('.nav-menu');
const dateHeader = document.querySelector('.date-header');
const title = document.querySelector('.title');
const btnSubmit = document.querySelector('.submit-btn');
const journalTextArea = document.querySelector('.journal-entry');
const events = [];


//event listeners
document.addEventListener('DOMContentLoaded', setUp);
title.addEventListener('click', addEntry);
btnSubmit.addEventListener('click', saveJournal);




//functions
function setUp(){
    dateHeader.value = getDate();

    openEntriesLocaly();
    

    events.forEach(event => {
        addEntry(event);
    });
}

function getDate(){
    var today = new Date();
    //const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    return today.toLocaleDateString(undefined, options);
}

function addEntry(e){
    
    const entry = document.createElement('div');
    entry.classList.add('nav-block');

    const entryDate = document.createElement('h3');
    entryDate.innerText = e.getEntryDate();
    entryDate.classList.add('entry-date');

    const entryData = document.createElement('h3');
    entryData.classList.add('entry-data');
    entryData.innerText = e.getEntryText();

    entry.appendChild(entryDate);
    entry.appendChild(entryData);

    entry.id = events.indexOf(e).toString();

    entryData.style.display = 'none';

    entry.addEventListener('click', openEvent);

    navMenu.appendChild(entry);
}

function saveJournal(){
    let exists = false;
    let oldEvent;
    events.forEach(event => {
        if(event.getEntryDate() === dateHeader.value){
            exists = true;
            oldEvent = event;
        }
    });

    if(!exists){
        console.log('doesnt exist');
        events.push(new Entry(dateHeader.value, journalTextArea.value));
        journalTextArea.value = "";
        dateHeader.value = getDate();
        addEntry(events[events.length - 1]);
        saveEntryLocaly(events[events.length - 1]);
    }
    else{
        console.log('does exist');
        var indexOfOldEvent = events.indexOf(oldEvent);
        events.splice(indexOfOldEvent, 1, new Entry(dateHeader.value, journalTextArea.value));
        journalTextArea.value = "";
        dateHeader.value = getDate();
        deleteEntryLocaly();
    }
}

function openEvent(entry){
    
   
    var event = events[parseInt(entry.target.id)];

    dateHeader.value = event.getEntryDate();
    journalTextArea.value = event.getEntryText();
    
}

function saveEntryLocaly(entry){
    let entries;
    if(localStorage.getItem('entries') === null){
        entries = [];
    }
    else{
        entries = JSON.parse(localStorage.getItem('entries'));
    }

    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries))
}

function openEntriesLocaly(){
    let entries;
    if(localStorage.getItem('entries') === null){
        entries = [];
    }
    else{
        entries = JSON.parse(localStorage.getItem('entries'));
    }

    entries.forEach(entry => {
        events.push(new Entry(entry.date, entry.text));
    });

}

function deleteEntryLocaly(){
    let entries;
    if(localStorage.getItem('entries') === null){
        entries = [];
    }
    else{
        entries = JSON.parse(localStorage.getItem('entries'));
    }

    localStorage.removeItem('entries');

    entries = [];

    events.forEach(event => {
        entries.push(event); 
    });
    localStorage.setItem('entries', JSON.stringify(entries));

}


class Entry{
    constructor(date, text){
        this.date = date;
        this.text = text;
        
    }

    getEntryDate(){
        return this.date;
    }

    getEntryText(){
        return this.text;
    }


}

