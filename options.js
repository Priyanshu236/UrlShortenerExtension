let generateBtn=document.getElementById('option_btn')
let key=document.getElementById("api_key")

generateBtn.addEventListener('click',(e)=>{
    
    if(!key.value)
    {
        document.getElementById('error-msg').style.display='block'
        document.getElementById('success-msg').style.display='none'
    }
    else
    {
        chrome.storage.sync.set({API_Token: key.value}, function() {
            document.getElementById('error-msg').style.display='none'
            document.getElementById('success-msg').style.display='block'
        });
    }
    e.preventDefault();
})