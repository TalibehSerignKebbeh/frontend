import {useEffect} from 'react';

const UseBackgroundImage = ({ image }) => {
    console.dir(image)
    console.dir(image?.bgImage)
    const url = new URL()
    useEffect(() => {
        
        const previousImage = document.body.style.backgroundImage
        document.body.style.backgroundImage = url({ url: image?.bgImage },)
        console.log();
        return () => {
            document.body.style.backgroundImage = previousImage;
        };
    }, [image]);
    
}

export default UseBackgroundImage;
