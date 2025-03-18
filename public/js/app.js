

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');




function checkNetWorkConnection(){
  return navigator.onLine
}

async function checkInternetAccess(retries=3,delay=1000) {

if(!checkNetWorkConnection()) return false

let attempt=1
let internetAccess=false

while(attempt<=retries){
  try{
    const response= await fetch('https:///jsonplaceholder.typicode.com/todos/1',{method:'HEAD'})



if(response.ok){
  internetAccess=true
  break
}

throw new Error('Failed to fetch')

  }catch(err){
    console.log(`Attempt ${attempt} failed. Retrying in ${delay} ms`)
    attempt++

  await new Promise(resolve=>setTimeout(resolve,delay))
  }
}

return internetAccess
}

async function toggleOfflineBanner() {
  console.log('Checking network status..')
  const isOnline= await checkInternetAccess(3,2000)
  if(isOnline){
    
  }else{
    Toastify.error(`You're currently offline`, {duration: 3000});
  }

}

setInterval(()=>{
  toggleOfflineBanner()
},30000)




const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector('button').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
  Toastify.success('Speech has been detected.')
  
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');
  Toastify.success('Speech recognition process has finished')

  //let last = e.results.length - 1;
  //let text = e.results[last][0].transcript;
  const text=e.results[0][0].transcript
  outputYou.textContent = text;
  console.log(e.results);
  console.log(e.results[0][0].transcript);
  console.log('Confidence: ' + e.results[0][0].confidence);

async function speakToModel() {
  const options = {
    method: 'POST',
    url: 'https://chatgpt-42.p.rapidapi.com/chatgpt',
    headers: {
      'x-rapidapi-key': '7d4b39af13mshd33ae28db4e0049p1cbeb4jsn6decfd614244',
      'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: text
        }
      ],
      web_access: false
    }
  };
  
  try {
    outputBot.textContent='Thinking....'
    const response = await axios.request(options);
    const aiResponse=response.data.result

    outputBot.textContent = aiResponse

  } catch (error) {
    Toastify.error(`${error}`)
    console.error(error);
  }

}
speakToModel()



});

recognition.addEventListener('speechend', () => {
  recognition.stop();
});

recognition.addEventListener('error', (e) => {
  // outputBot.textContent =`Something went wrong during the speech recognition process :(`;
  console.log(`${e.error}`)
  Toastify.error('Something went wrong during the speech recognition process try again :(')
});

