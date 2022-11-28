
let generateBtn = document.getElementById('short_btn')
let s_url = document.getElementById("short_url")
let icon=document.getElementById('clipIcon')
icon.addEventListener('click',(e)=>{
    console.log("hello")
    navigator.clipboard.writeText(document.getElementById('short-text').innerHTML)
    document.getElementById('clipboard').style.display = 'block'
        setTimeout(() => {
            document.getElementById('clipboard').style.display = 'none'
            
        }, (2000));
})
generateBtn.addEventListener('click', (e) => {
    if (!s_url.value) {
        document.getElementById('error-msg').style.display = 'flex';
        document.getElementById('short-link').style.display = 'none';
        
    }
    else {

        chrome.storage.sync.get('API_Token', function (result) {
            if (!result.API_Token) {
                document.getElementById('error-msg').style.display = 'none'
                document.getElementById('short-text').innerHTML = "Provide API key in options from rebrandly website"
                document.getElementById('short-link').style.display = 'flex'
                return;
            }
            console.log(result.API_Token)
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    apikey: result.API_Token
                },
                body: JSON.stringify({
                    destination: s_url.value
                })
            };
            fetch('https://api.rebrandly.com/v1/links', options)
                .then(response => response.json())
                .catch( (err)=>{
                    document.getElementById('error-msg').style.display = 'flex'
                    document.getElementById('error-msg').innerHTML = "Something wrong with your API Token. Enter new api key from options"
                    document.getElementById('short-link').style.display = 'none';
                    console.error(err)
                    
                })
                .then(response => {
                    document.getElementById('error-msg').style.display = 'none'
                    document.getElementById('short-text').innerHTML = response.shortUrl
                    document.getElementById('short-link').style.display = 'flex'
                    
                    console.log(response)
                })
                
        });


    }
    e.preventDefault();
})