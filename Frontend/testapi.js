import axios from "axios"

const fun = async() => {
    const res = await axios.get(`http://localhost:9000/api/v1/feed/feed-stories`);
    console.log(res.data.data);
}

await fun()