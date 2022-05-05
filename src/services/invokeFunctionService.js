import axios from 'axios'
export async function invokeHelloFunction(){

    try{
        const res=await axios.get("/.netlify/functions/hello");
        console.log(res);
    }
    catch(inError){
        console.log(inError);
    }
}