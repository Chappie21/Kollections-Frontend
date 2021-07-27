import axios from "axios";

function agregarImage(form){
    console.log(form)
    return axios.post('/Images', form);
}

export function getImagesHome(){
    return axios.get('/getImages');
}

export function searchImages(data){
    console.log(data.queryKey[1])
    return axios.get(`/searchImages/${data.queryKey[1]}`)
}

export function deleteImage(id){
    return axios({
        method: "delete",
        url: "/Images",
        data: {
            idImg: id
        }
    })
}

export default agregarImage;