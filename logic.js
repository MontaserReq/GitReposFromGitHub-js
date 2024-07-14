//Variabls
const inputFiled=document.querySelector('.input-filed input');
const btn=document.querySelector('.input-filed button');
const showRepos=document.querySelector('.show-repos');

// Git fetch
btn.onclick=function(){
    getRepos();
}
function getRepos(){
if(inputFiled.value ==''){

    showRepos.innerHTML="<span>Enter Your UserName</span>";

}
else{  
    
fetch(`https://api.github.com/users/${inputFiled.value}/repos`)

.then((req) => req.json())

.then((data) => {

    showRepos.innerHTML = '';

    data.forEach(info => {
        //Main Div
        let repodiv=document.createElement("div");
        repodiv.className="repo"
        //Create Repo Name Text
        let repoName=document.createTextNode(info.name);
        //Create Div to right side
        let divr=document.createElement("div");
        //add class to right div
        divr.className="right-side";
        //Append child
        repodiv.appendChild(repoName);
        //crate url to visit repos
        let url=document.createElement('a');
        //url text
        let textUrl=document.createTextNode(`Visit`);
        //add url to element
        url.href=`https://github.com/${inputFiled.value}/${info.name}`;
        //show in new tap
        url.setAttribute("target",'_blank')
        //add text to url
        url.appendChild(textUrl);
        //add url to repo
        divr.appendChild(url);
        //crate span to stars count
        let stars=document.createElement('span');
        //Add count of start to span
        let nstart=document.createTextNode(info.stargazers_count);
        //span text
        stars.appendChild(nstart);
        //add to right div
        divr.appendChild(stars);
        //crate icon element
        let icon=document.createElement('i');
        //add class to icon
        icon.className="fas fa-star";
        //add to span start
        stars.appendChild(icon);
        //add to right div
        repodiv.appendChild(divr);
        //show in document
        showRepos.appendChild(repodiv);
        

    });
});
}
}