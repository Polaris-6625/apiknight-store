import { useCallback } from "react";
import { loadStrRes, useLoading, useStrRes } from "../store/strRes"

function FetchShow() {
    const str = useStrRes();
    const handleClickLoad = useCallback(() => {
        loadStrRes()
    },[])
    const loading = useLoading()
    return (
        <div>
            {
                loading ? "loading..." : str
            }
            <button onClick={handleClickLoad}>load</button>
        </div>
    )
}

export default FetchShow