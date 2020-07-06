/**
 * Générateur de cartes pour le jeu
 */

window.addEventListener("load", function(event) {  

    // Toutes les cartes disponibles pour le jeu

    var animals = [
        {
            "animal":"cat",
            "icon":"<i class='fas fa-cat fa-3x'></i>"
        },{
            "animal":"otter",
            "icon":"<i class='fas fa-otter fa-3x'></i>"
        },{
            "animal":"hippo",
            "icon":"<i class='fas fa-hippo fa-3x'></i>"
        },{
            "animal":"dog",
            "icon":"<i class='fas fa-dog fa-3x'></i>"
        },{
            "animal":"spider",
            "icon":"<i class='fas fa-spider fa-3x'></i>"
        },{
            "animal":"kiwi-bird",
            "icon":"<i class='fas fa-kiwi-bird fa-3x'></i>"
        },{
            "animal":"horse",
            "icon":"<i class='fas fa-horse fa-3x'></i>"
        },{
            "animal":"frog",
            "icon":"<i class='fas fa-frog fa-3x'></i>"
        },{
            "animal":"fish",
            "icon":"<i class='fas fa-fish fa-3x'></i>"
        },{
            "animal":"dove",
            "icon":"<i class='fas fa-dove fa-3x'></i>"
        },{
            "animal":"crow",
            "icon":"<i class='fas fa-crow fa-3x'></i>"
        }
    ]; // ./ end Json

    /**
     * @param list Liste finale
     * @param rList Liste temporaire des lots tirés
     * @param i Chantez les cartes sélectionnées
     */
    var list = [];var rList = [];
    var i=0;

    // Tirage à sort de 4 cartes

    while(i < 4){

        // Retour de la position dans le tableau

        let rand = Math.floor(Math.random() * (11 - 0));

        // Vérifiez si la carte n'est pas présente dans la liste de tirage

        if (typeof rList[rand] === 'undefined') {

            // Associez la carte dans la liste temporaire

            rList[rand] = animals[rand];

            // Passer à la liste finale avec index réinitialisé
            
            list.push(rList[rand])
            i++;
        }
    }

    // Duplicateur de 4 à 8 cartes

    list = [...list, ...list.reverse()];

    // Mélangez de cartes pour le jeu 

    rList = [...list];

    list = list.map(() => {  
            
        // Index de retour de la liste temporaire
            
        var i = Math.floor(Math.random()*rList.length);  
            
        // Enregistrer la carte
        
        var res = rList[i];  
            
        // Supprimer la carte de la liste temporaire
        
        rList.splice(i,1)  
        return res;       
    });

    // Générateur de cartes JsDOM => HTML

    list.forEach((element,i) => {  
            
        // Création de la face avant du carte
        
        var card__face_front = document.createElement("div"); 
            card__face_front.classList.add("card__face","card__face--front","d-flex","justify-content-center","align-items-center");
            card__face_front.innerHTML = '<i class="fas fa-paw fa-3x"></i>';  
            
        // Création de la face arrière de la carte
                     
        var card__face_back = document.createElement("div"); 
            card__face_back.classList.add("card__face","card__face--back","d-flex","justify-content-center","align-items-center");
            card__face_back.innerHTML = element.icon;   
            
        // Combinons les 2 faces sur la même carte
            
        var cardEle =  document.createElement("div"); 
            cardEle.className = "card";
            cardEle.setAttribute("data-flip",element.animal);
            cardEle.setAttribute("id",i);  
            cardEle.appendChild(card__face_front);
            cardEle.appendChild(card__face_back);    
            
        //  Créez le bloc de scène de chaque carte et ajoutez la carte
            
        var sceneEle = document.createElement("div"); 
            sceneEle.className = "scene";
            sceneEle.appendChild(cardEle);   
            
        // Création du bloc format carte COL 3/12
            
        var colEle = document.createElement("div"); 
            colEle.className = "col-3";
            colEle.appendChild(sceneEle);  
            
        // Ajoutons la carte à la table de jeu
            
        document.querySelector("#table").appendChild(colEle); 
    });
});


/**
 * Function toggleFlip validateur des cartes retournées
 * @param el1 première carte retournée
 * @param el2 deuxième carte retournée
 */

var el1,el2;
function toggleFlip(el) {      
    /**
     * Enregistreur de la première et deuxième carte retournée
     * @param el1
     * @param el2
     */
    if ( !el1 || el1 === '' && window.ConstSpyFlip === true ) {

            // Tourne la carte cliquée
            el1 = el;flipCard(el1); 

            // Bloc espion pour ne pas retourner plus de 2 cartes
            window.ConstSpyFlip = false; 

    } else if ( !el2 || el2 === '' && window.ConstSpyFlip === true) {      
        
        // Tourne la carte cliquée
        el2 = el;flipCard(el2); 
        console.log( 'data-id', el1.id ,el2.id );
        /**
         * Vérifiez si les cartes sont identiques avec l'attribut data-flip
         * @param data_flip Attribute
         */
        if ( el1.id !== el2.id ) {
            if ( el1.getAttribute('data-flip') === el2.getAttribute('data-flip') ){            
                setTimeout(function(){        
                    
                    // Confirmez les cartes à l'écran
                    
                    el1.children[1].style.color = 'green';
                    el2.children[1].style.color = 'green';
    
                    /**
                     * Réinitialisation des variables
                     * @param el1
                     * @param el2
                     */
    
                    el1 = '';el2 = '';
    
                    // Bloc espion pour ne pas retourner plus de 2 cartes
                    window.ConstSpyFlip = false;    
    
                }, 600);
            }else{
                setTimeout(function(){   
                    
                    // Restaurer les cartes retournées inégales
                    
                    flipCard(el1);
                    flipCard(el2);
    
                    /**
                     * Réinitialisation des variables
                     * @param el1
                     * @param el2
                     */
    
                    el1 = '';el2 = '';
                    // Bloc espion pour ne pas retourner plus de 2 cartes
                    window.ConstSpyFlip = false;    
    
                }, 1000);
            }  
        }else{
            el1 = ''; el2 = '';
            window.ConstSpyFlip = false;
        }
   
        
    }else{

        /**
         * Les 2 cartes n'ont pas fini d'être traitées
         * 
         * Dans le cas où le bloc espion fait une erreur
         */

        console.log('wait');
    } 
}

/**
 * Fonction flipCard, toggle la carte
 * @param el Carte cliquée
 */
function flipCard(el){
    el.classList.toggle('is-flipped');
}

// Initialiser la variable Bloc espion
window.ConstSpyFlip = false;

/**
 * Événement le clic de la carte
 */
document.querySelector("#table").addEventListener('click', eve => {    
    eve.preventDefault();

    console.log( " exception => type.Event", eve.type)
    /**
     * Si le bloc espion est faux, la carte est retournée, si le bloc est vrai, la carte est ignorée au clic
     * @param window.ConstSpyFlip
     */

    if (window.ConstSpyFlip == false) {
        // La carte passe le bloc espion et va au procès
        window.ConstSpyFlip = true;
        // Click sur backroud 'card__face--front'
        eve.target.classList.contains('card__face--front') ? toggleFlip(eve.path[1]) : undefined ; 
        // Click sur icon 'card__face--front'
        eve.target.classList.contains('fa-paw') ? toggleFlip(eve.path[1].parentElement) : undefined ; 
    }else{
        console.log( " exception => window.ConstSpyFlip", window.ConstSpyFlip)        
        window.ConstSpyFlip = false;
    }    
});

