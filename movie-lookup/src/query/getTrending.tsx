import axios from "axios"

const getTrending = async () =>{
    const response = await axios.get("https://api.trakt.tv/movies/trending", 
        {
            headers : {
                "Content-Type" : "application/json",
                "trakt-api-version" : "2",
                "trakt-api-key" : "f86014a98dd2a1ddfc38a509a23c12b39de5acdd0ba9d69fa23d21df503c06e2"
            }
        }
    )
    return response
}

export default getTrending