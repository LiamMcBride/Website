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
    dateHeader.innerText = getDate();

    openEntriesLocaly();
    console.log(events);

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
    console.log(e.date);
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
    events.push(new Entry(dateHeader.innerText, journalTextArea.value));
    journalTextArea.value = "";
    addEntry(events[events.length - 1]);
    saveEntryLocaly(events[events.length - 1]);
}

function openEvent(entry){
    
    console.log(entry.target);
    var event = events[parseInt(entry.target.id)];

    dateHeader.innerText = event.getEntryDate();
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


class Entry{
    constructor(date, text){
        this.date = date;
        this.text = text;
        console.log(text);
    }

    getEntryDate(){
        return this.date;
    }

    getEntryText(){
        return this.text;
    }


}

