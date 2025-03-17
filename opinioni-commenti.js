document.addEventListener('DOMContentLoaded', function(){
let archivio = JSON.parse(localStorage.getItem("archivio")) || {};  // Oggetto che contiene tutti i commenti
let id_commento=archivio.lenght -1  || 0; // Contatore per gli id dei commenti

let btn_salva= document.getElementById('button-save');
btn_salva.addEventListener('click', aggiungi);
let search_bar = document.getElementById('searcher');

    search_bar.addEventListener('input', () => {
    let search_word = search_bar.value.toLowerCase();
    let risultati = filter(search_word);
    console.clear(); 
    console.log("Risultati trovati:", risultati);
    let sezione = document.getElementById('commenti');
    sezione.innerHTML = ''; // Clear previous results
    for (let anime in risultati) {
        risultati[anime].forEach(comment => {
            let nickname = comment.nickname;
            let commento = comment.commento;

            let div = document.createElement('div');
            div.className = 'commento';

            let h3 = document.createElement('h3');
            h3.innerHTML = nickname;
            div.appendChild(h3);

            let h5 = document.createElement('h5');
            h5.innerHTML = anime;
            div.appendChild(h5);

            let p = document.createElement('p');
            p.innerHTML = commento;
            div.appendChild(p);

            sezione.appendChild(div);
        });
    }
});
stampa10();
function stampa10(){
    let count = 0;
    let temp= JSON.parse(localStorage.getItem("archivio")) || {};
    for (let anime in temp) {
        if (count >= 10) break;
            temp[anime].forEach(comment => {
            if (count >= 10) return;
           
            let nickname= comment.nickname;
            let commento=comment.commento;
            let sezione=document.getElementById('commenti');

            let div= document.createElement('div');
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
        
            let azioniDiv = document.createElement('div');
            azioniDiv.className = 'azioni-commento';

            // Pulsante "Rispondi"
            let rispondiBtn = document.createElement('span');
            rispondiBtn.innerHTML = `<i class="bi bi-reply"></i> Rispondi`;
            rispondiBtn.className = 'rispondi';
            rispondiBtn.style.cursor = 'pointer';
            rispondiBtn.addEventListener('click', () => {
                // Non fare nulla
            });
            azioniDiv.appendChild(rispondiBtn);

            // Pulsante "Visualizza risposte"
            let visualizzaRisposteBtn = document.createElement('span');
            visualizzaRisposteBtn.innerHTML = `<i class="bi-caret-down-fill"></i> Visualizza risposte`;
            visualizzaRisposteBtn.className = 'visualizza-risposte';
            visualizzaRisposteBtn.style.cursor = 'pointer';
            visualizzaRisposteBtn.style.marginLeft = '20px';
            visualizzaRisposteBtn.addEventListener('click', () => {
                // Non fare nulla
            });
            azioniDiv.appendChild(visualizzaRisposteBtn);

            // Pulsante "Segnala"
            let segnalaDiv = document.createElement('div');
            segnalaDiv.style.display = 'inline-block';
            segnalaDiv.style.float = 'right';

            let segnalaIcon = document.createElement('span');
            segnalaIcon.innerHTML = "<i class='bi-x-lg'></i>";
            segnalaIcon.style.color = 'red';
            segnalaIcon.style.cursor = 'pointer';
            segnalaDiv.appendChild(segnalaIcon);

            let segnalaText = document.createElement('span');
            segnalaText.innerHTML = ' Segnala';
            segnalaText.style.cursor = 'pointer';
            segnalaDiv.appendChild(segnalaText);

            segnalaDiv.addEventListener('click', () => {
                alert('Commento segnalato!');
            });

            azioniDiv.appendChild(segnalaDiv);

            div.appendChild(azioniDiv);
            sezione.appendChild(div);
            // count++;
        });
    }
}
function filter(search_word){
    let risultati = Object.keys(archivio).filter(anime => 
        anime.toLowerCase().startsWith(search_word)
    );
    return risultati.reduce((obj, key) => {
        obj[key] = archivio[key];
        return obj;
    }, {});
}
function aggiungi(){
    let sezione=document.getElementById('commenti');
    let nickname= document.getElementById('nickname').value;
    let anime=document.getElementById('anime').value;
    let commento=document.getElementById('commento').value;
  

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
                archivio[anime].push({commento: commento, nickname: nickname});
                // console.log(archivio);
            }
        }else{
            archivio[anime] = [{commento: commento, nickname: nickname}];
            // console.log(archivio);
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

        let azioniDiv = document.createElement('div');
        azioniDiv.className = 'azioni-commento';

        // Pulsante "Rispondi"
        let rispondiBtn = document.createElement('span');
        rispondiBtn.innerHTML = `<i class="bi bi-reply"></i> Rispondi`;
        rispondiBtn.className = 'rispondi';
        rispondiBtn.style.cursor = 'pointer';
        rispondiBtn.addEventListener('click', () => {
            // Non fare nulla
        });
        azioniDiv.appendChild(rispondiBtn);

        // Pulsante "Visualizza risposte"
        let visualizzaRisposteBtn = document.createElement('span');
        visualizzaRisposteBtn.innerHTML = `<i class="bi-caret-down-fill"></i> Visualizza risposte`;
        visualizzaRisposteBtn.className = 'visualizza-risposte';
        visualizzaRisposteBtn.style.cursor = 'pointer';
        visualizzaRisposteBtn.setAttribute('style', 'margin-left: 20px;');
        visualizzaRisposteBtn.addEventListener('click', () => {
            // Non fare nulla
        });
        azioniDiv.appendChild(visualizzaRisposteBtn);

        // Pulsante "Segnala"
        let segnalaDiv = document.createElement('div');
        segnalaDiv.style.display = 'inline-block';
        segnalaDiv.style.float = 'right';

        let segnalaIcon = document.createElement('span');
        segnalaIcon.innerHTML = "<i class='bi-x-lg'></i>";
        segnalaIcon.style.color = 'red';
        segnalaIcon.style.cursor = 'pointer';
        segnalaDiv.appendChild(segnalaIcon);

        let segnalaText = document.createElement('span');
        segnalaText.innerHTML = ' Segnala';
        segnalaText.style.cursor = 'pointer';
        segnalaDiv.appendChild(segnalaText);

        segnalaDiv.addEventListener('click', () => {
            alert('Commento segnalato!');
        });

        azioniDiv.appendChild(segnalaDiv);

        div.appendChild(azioniDiv);
        sezione.appendChild(div);
        id_commento++;

        localStorage.setItem("archivio", JSON.stringify(archivio));

        }   
    }
    
});



