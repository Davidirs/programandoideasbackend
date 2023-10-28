import { addPost } from '../post/addPost.js'
import { saveImage } from '../storage/saveImage.js'
import { auth } from "../firebase.js";


const postForm = document.querySelector('#post-form');
var imgList = [{}, {}, {}, {}]
for (let i = 0; i < 4; i++) {
    $("#image-picker" + i).change(function (event) {
        readURL(this);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $("#image-preview" + i).attr("src", e.target.result);
                const newName = input.files[0].lastModified + "-" + input.files[0].name;
                imgList[i] = {
                    "name": newName,
                    "data": e.target.result
                }

            };

            reader.readAsDataURL(input.files[0]);
        }
    }
}
postForm.addEventListener('submit', e => {
    e.preventDefault();

    const user =auth.currentUser.email;
    console.log(user);
    const name = postForm["post-name"].value;
    const description = postForm["post-description"].value;
    const type = postForm["post-type"].value;
    const infodeveloper = postForm["post-infodeveloper"].value;
    for (let i = 0; i < imgList.length; i++) {
        if (imgList[i].name) {
            saveImage(user,imgList[i].name, imgList[i].data);
        }
    }
    const img1 = imgList[0].name ? imgList[0].name : ""; //postForm["image-picker0"].files[0] ? postForm["image-picker0"].files[0].name : "";
    const img2 = imgList[1].name ? imgList[1].name : ""; //postForm["image-picker1"].files[0] ? postForm["image-picker1"].files[0].name : "";
    const img3 = imgList[2].name ? imgList[2].name : ""; //postForm["image-picker2"].files[0] ? postForm["image-picker2"].files[0].name : "";
    const img4 = imgList[3].name ? imgList[3].name : ""; //postForm["image-picker3"].files[0] ? postForm["image-picker3"].files[0].name : "";
    const infoinvestor = postForm["post-infoinvestor"].value;
    const minamount = postForm["post-minamount"].value;
    const maxamount = postForm["post-maxamount"].value;

    var res = new Date();
    const dateposted = res.toLocaleDateString()
    res.setDate(res.getDate() + 30);
    const datelimit = res.toLocaleDateString();

    const post = {
        "name": name,
        "description": description,
        "type": type,
        "infodeveloper": infodeveloper,
        "img1": img1,
        "img2": img2,
        "img3": img3,
        "img4": img4,
        "infoinvestor": infoinvestor,
        "minamount": minamount,
        "maxamount": maxamount,
        "dateposted": dateposted,
        "datelimit": datelimit,
    }
    addPost(post)
})