import { useEffect} from "react";


export const Inpostad = () => {
    useEffect(() => {
        try{
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
        catch(err) {}
    }, []);

    return(
        <>
        <div >
        <ins 
        title="ads"
        className="adsbygoogle"
        style={{display:"block" , width: "100%", height: "100%"}}
        data-ad-client="ca-pub-6021447126124390" // Your Google AdSense client ID
        data-ad-slot="9663260308" // Your ad slot ID
        data-ad-format="auto"
        data-full-width-responsive="true">
        </ins>
        </div>
        </>
    )
}