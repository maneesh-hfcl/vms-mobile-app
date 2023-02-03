import Config from '../configuration/config'

export const LoadApiData = async(urlpath)=>{
    try {
            let uri = Config.ApiUrl + `${urlpath}`
            console.log(uri);
            const response = await fetch(
                uri
            );
            return await response.json();
        //            return json.movies;
        } catch (error) {
            console.error(error);
            return "error"
        }

}