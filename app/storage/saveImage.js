import { getStorage, ref, uploadString } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js"
import { showMessage } from '../showMessage.js'

const storage = getStorage();

export const saveImage = async (user, name, data_url) => {
    const storageRef = ref(storage, user +"/"+name);
    try {
        //const message = data_url;
        uploadString(storageRef, data_url, 'data_url').then((snapshot) => {
            console.log('Un data_url string se ha subido!');
        });
/* 
        showMessage("Imagen " + name + " subida correctamente", "success") */
    } catch (e) {
        console.log("Error al intentar subir imagen: " + e)
    }
}