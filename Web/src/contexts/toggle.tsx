import React from "react";

interface Card {
        id: number,
        title: string,
        date: string,
        description: string
}

interface Toggle{
    isOpen: Array<boolean>,
    openBar: Array<Card>,
    visibleChange: (a: Array<boolean>, b: Array<Card>, c: Card) => void
}

export default React.createContext<Toggle>({
    isOpen: [false],
    openBar: [],
    visibleChange: 
     function handleChangeVisible( isOpen: Array<boolean>, openBar: Array<Card>, informations: Card){

        if(openBar[0] !== informations){
        if(openBar.length > 0){
            openBar.pop();
            openBar.push(informations);
        }else{
            openBar.push(informations)
            isOpen.splice(0, isOpen.length, true);
        }

        console.log(openBar);

        return informations
    }

    }
})