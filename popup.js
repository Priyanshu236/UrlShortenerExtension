
let generateBtn=document.getElementById('short_btn')
let s_url=document.getElementById("short_url")

generateBtn.addEventListener('click', (e)=>{
    if(!s_url.value)
    {
        document.getElementById('error-msg').style.display='block';
        document.getElementById('short-link').style.display='none';
    }
    else
    {
       
            chrome.storage.sync.get('API_Token', function(result) {
            if(!result.API_Token)
            {
                document.getElementById('error-msg').style.display='none'
                document.getElementById('short-link').innerHTML="Provide API key in options from t.ly website"
                document.getElementById('short-link').style.display='block'
                return;
            }
            const url = new URL(
            "https://t.ly/api/v1/link/shorten"
            );
            
            const params = {
                "api_token": result.API_Token,
            };
            Object.keys(params)
            .forEach(key => url.searchParams.append(key, params[key]));
            
            const headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
            };
        
        let body = {
            "long_url": s_url.value,
            "domain": "https://t.ly/",
            "include_qr_code": false
        };
        
        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        }).then((response)=>response.json() ).then((json) =>{
            console.log(json)
            if(json.provider_success==false)
            {
                document.getElementById('error-msg').style.display='block'
                document.getElementById('error-msg').innerHTML="Something wrong with your API Token"
                document.getElementById('short-link').style.display='none';
                return;
            }
            document.getElementById('error-msg').style.display='none'
            document.getElementById('short-link').innerHTML=json.short_url
            document.getElementById('short-link').style.display='block'
        });
    });
    }
    e.preventDefault();
})