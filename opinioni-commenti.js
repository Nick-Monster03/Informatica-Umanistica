document.addEventListener('DOMContentLoaded', function(){
let archivio = JSON.parse(localStorage.getItem("archivio")) || {};  // Oggetto che contiene tutti i commenti
let id_commento=archivio.lenght -1  || 0; // Contatore per gli id dei commenti

let btn_salva= document.getElementById('button-save');
btn_salva.addEventListener('click', aggiungi);
function filter(){
    let search_bar= dpocument.getElementById('search-bar');
    let search_word= search_bar.value.toLowerCase();
    console.log(archivio)
}
function aggiungi(){
    let sezione=document.getElementById('commenti');
    let nickname= document.getElementById('nickname').value;
    let anime=document.getElementById('anime').value;
    let commento=document.getElementById('commento').value;
    console.log('Nickname:', nickname);
    console.log('Anime:', anime);
    console.log('Commento:', commento);

    if(nickname=='' || anime=='' || commento==''){
        alert('Compila tutti i campi');
        return;
    }
    else{
        anime= anime.toLowerCase();

        if(archivio[anime]){
            let commentExists = archivio[anime].some(c => c.commento.toLowerCase() == commento.toLowerCase());
            if (commentExists) {
                alert('Questo commento esiste già per questo anime');
                return;
            }else{
                archivio[anime].push({commento: commento});
                console.log(archivio);
            }
        }else{
            archivio[anime] = [{commento: commento}];
            console.log(archivio);
        }
        let div= document.createElement('div');
        div.id= id_commento;
        div.className='commento';
    
        let h3= document.createElement('h3');
        h3.innerHTML= nickname;
        div.appendChild(h3);
    
        let h5= document.createElement('h5');
        h5.innerHTML= anime;
        div.appendChild(h5);
    
        let p= document.createElement('p');
        p.innerHTML= commento;
        div.appendChild(p);
    
        sezione.appendChild(div);
        id_commento++;

        localStorage.setItem("archivio", JSON.stringify(archivio));
        console.log(archivio);
        }   
    }
    
});



