import { BeatLoader } from "react-spinners";

const Loader = () => {
    return ( 
        <div
        className="
            h-[70vh]
            flex 
            flex-col 
            justify-center 
            items-center"
    >
        <BeatLoader
            size={20}
            color="slate"
        />
    </div>
     );
}
 
export default Loader;