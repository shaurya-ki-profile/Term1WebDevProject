
const savedEvents=localStorage.getItem('events');

// let events = [];

// if (savedEvents) {
//     try {
//         events = JSON.parse(savedEvents);
//     } catch (error) {
//         console.log("Could not load saved events:", error);
//     }
// }

const events=savedEvents?JSON.parse(savedEvents):[];
const nameInput=document.getElementById("name");
const dateInput=document.getElementById("date");
const typeInput=document.getElementById("type");
const form=document.getElementsByTagName("form");
const container=document.getElementById('eventsContainer')

function getEventDate(date){
    return new Date(date+'T00:00:00');
}
function daysDifference(date){
    const today=new Date();
    today.setHours(0,0,0,0);
    const eventDate=new Date(getEventDate(date));
    const difference= eventDate-today;
    return Math.round(difference/1000/60/60/24);
}


function refreshEvents(){
    container.innerHTML='';

    events.sort(function(a, b) {
        return getEventDate(a.date).getTime() - getEventDate(b.date).getTime();
    });

    for(const i of events){
        const card=document.createElement("div");
        card.classList.add('cards');

        const days=daysDifference(i.date);

        const title=document.createElement('h2');
        const date=document.createElement('p');
        const type = document.createElement('p');
        const countdown= document.createElement('p');
        const deleteButton=document.createElement('button');
        title.textContent=i.name;
        date.textContent=i.date;
        type.textContent=i.type;
        if(days > 0)countdown.textContent=days+" days remaining";
        else if(days === 0)countdown.textContent="Today";
        else countdown.textContent="Overdue by "+Math.abs(days)+" days";
        deleteButton.textContent='Delete';
        deleteButton.addEventListener('click',function(){
            const index=events.indexOf(i);
            events.splice(index,1);
            localStorage.setItem('events',JSON.stringify(events));
            refreshEvents();
        });
        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(type);
        card.appendChild(countdown);
        card.appendChild(deleteButton);

        container.appendChild(card);


    }

}

form[0].addEventListener("submit", function(event){
    event.preventDefault();

    const data={
        name:nameInput.value,
        date:dateInput.value,
        type:typeInput.value
    }
    events.push(data);
    localStorage.setItem('events',JSON.stringify(events));
    refreshEvents();
    form.reset();
});

refreshEvents();

