const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

let myLeads = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads(myLeads);
    });   
});

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}


deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    renderLeads(myLeads);

    console.log(localStorage.getItem("myLeads"));
});


function renderLeads(leads) {
    let listItems = "";

    for (let index = 0; index < leads.length; index++) {
        listItems += 
        `<li>
        <a href='${leads[index]}' target='_blank'> 
            ${leads[index]} 
        </a> 
        </li>`;   
    }

    
    ulEl.innerHTML = listItems;

}
