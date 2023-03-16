import Config from '../configuration/config'

export const LoadApiData = async(urlpath, type)=>{
    try {
            let uri = Config.ApiUrl + `${urlpath}`
            console.log("LoadApiData - " + uri);
            const response = await fetch(
                uri,
                {
                    method: type == null?"GET":type
                    
                }
            );
            return await response.json();
        //            return json.movies;
        } catch (error) {
            console.error(error);
            return "error"
        }

}

export const LoadApiPostData = async(urlpath, type, data)=>{
    try {
            console.log("Inside LoadApiPostData");
            let uri = Config.ApiUrl + `${urlpath}`
            console.log("goo")
            console.log(uri);
            
            console.log(JSON.stringify(data));
            const response = await fetch(
                uri,
                {
                    method: type == null?"GET":type,
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            
            

            return await response.json()
        //            return json.movies;
        } catch (error) {
            console.error(error);
            return "error"
        }

}