url='https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large'
                                
    document.getElementById("preview").style.display='none'
    document.getElementById("imageInput").addEventListener("change",function(event){
        let max=0
        let res
        const file = event.target.files[0]
        const reader = new FileReader()
                                    
        reader.addEventListener("load",()=>{
            document.getElementById("preview").setAttribute("src",reader.result)
                                            document.getElementById("preview").style.display='block'
        })
                                    
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
        const data={
            inputs:{
                image:reader.result.split(',')[1]
            }
        }
            //console.log(reader.result)
                                            
            fetch (url, {
                method: "POST",
                headers: {
                    Authorization: 'Bearer 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',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(data=>{
            // for(i=0;i<data.length;i++){
            //   if(data[i].score>max){
            //     max=data[i].score
            //     res=data[i].label
            //   }
            // }
                //console.log(data)
                res=data[0].generated_text
                document.getElementById("result").innerText=res
                                                
            })
            .catch((e=>{
                console.log(e)
            }))
        }
                                
    })
                                
                                
    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-fr-en",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
    
    query({"inputs": "Меня зовут Вольфганг и я живу в Берлине"}).then((response) => {
        console.log(JSON.stringify(response));
    });          