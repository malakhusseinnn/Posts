let searchInput = document.querySelector("input");
let posts = document.querySelector(".posts");
let hashTags = document.querySelector(".hash-tags");

async function getPosts(link){
    posts.innerHTML = "";
    let response = await fetch(link);
    let data = await response.json();
    let allposts = data.posts;
    if(!allposts.length)
    {
        posts.innerHTML = `
        <p class = "not-found">No Posts Founded <i class="fa-solid fa-heart-crack"></i> </p>
        `
    }
    allposts.map((e)=>{
        posts.innerHTML += `
       <div class = "post">
            <p class = "title">${e.title}</p>
                <p class = "body">${e.body}</p>
                <ul>
                    ${e.tags.map((ele)=>{
                        return `<li>#${ele}</li>`
                    }).join("")}
                </ul>
            <div class = "reactions">
                <span class="views"><i class="fa-solid fa-eye"></i> ${e.views}</span>
                <span class="likes"><i class="fa-solid fa-heart"></i> ${e.reactions.likes}</span>
                <span class="dislikes"><i class="fa-solid fa-heart-crack"></i> ${e.reactions.dislikes}</span>
            </div>
       
       </div>
        `
    })
}

async function getTags(){
    let response = await fetch('https://dummyjson.com/posts/tags');
    let tags = await response.json();
    tags.map((e)=>{
        hashTags.innerHTML += `
            <p class = "tag" onclick = "getPosts('${e.url}')"># ${e.slug}</p>
        `
    });
}

getTags();

getPosts('https://dummyjson.com/posts');


searchInput.addEventListener("input" , ()=>{
    let searchLink = `https://dummyjson.com/posts/search?q=${searchInput.value}`
    getPosts(searchLink)
});



