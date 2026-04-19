let faqs = [];

fetch("faq.json")
.then(res => res.json())
.then(data => {
faqs = data;
});

function handleKey(e){
if(e.key === "Enter"){
sendMessage();
}
}

function sendMessage(){

let input = document.getElementById("userInput").value;

if(input.trim() === "") return;

addMessage(input,"user");

showTyping();

setTimeout(()=>{
let response = getBestMatch(input);
removeTyping();
addMessage(response,"bot");
},500);

document.getElementById("userInput").value="";
}

function addMessage(text,type){

let chatbox = document.getElementById("chatbox");

let message = document.createElement("div");
message.className = `message ${type}-message`;

let bubble = document.createElement("div");
bubble.className = `bubble ${type}-bubble`;
bubble.innerText = text;

let time = document.createElement("div");
time.className="timestamp";
time.innerText = getTime();

bubble.appendChild(time);
message.appendChild(bubble);
chatbox.appendChild(message);

chatbox.scrollTop = chatbox.scrollHeight;
}

function showTyping(){

let chatbox = document.getElementById("chatbox");

let typing = document.createElement("div");
typing.className="message bot-message";
typing.id="typing";

typing.innerHTML = `
<div class="bubble bot-bubble">
Typing...
</div>
`;

chatbox.appendChild(typing);
chatbox.scrollTop = chatbox.scrollHeight;
}

function removeTyping(){
let typing = document.getElementById("typing");
if(typing) typing.remove();
}

function getTime(){
let now = new Date();
return now.getHours()+":"+now.getMinutes();
}


function getBestMatch(userQuestion){

userQuestion = userQuestion.toLowerCase();

let bestAnswer = "Sorry, I don't understand your question.";

if(userQuestion.includes("return"))
return "You can return products within 7 days.";

if(userQuestion.includes("payment") || userQuestion.includes("pay"))
return "We accept credit card, debit card and UPI.";

if(userQuestion.includes("contact") || userQuestion.includes("support"))
return "You can email us at support@gmail.com";

if(userQuestion.includes("delivery") || userQuestion.includes("deliver"))
return "Yes we provide delivery all over India.";

if(userQuestion.includes("location") || userQuestion.includes("where"))
return "We are located in Pune.";

return bestAnswer;
}

function preprocess(text){
return text
.toLowerCase()
.replace(/[^\w\s]/gi, "")
.split(" ")
.filter(word => word.length > 2);
}



function similarity(arr1, arr2){

let matches = 0;

arr1.forEach(word=>{
if(arr2.includes(word)){
matches++;
}
});

return matches / arr2.length;
}