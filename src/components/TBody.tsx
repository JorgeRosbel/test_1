type StatusQ = "pending" | "success" | "error";
import { type Data } from "@api/useFetch";
import { Row } from "./Row";
import { FetchStatus } from "./fetchStatus";

interface Body{
    status: StatusQ;
    tempData: Data[];
    message:string | undefined
}


export const TBody:React.FC<Body> = ({status,tempData,message}) => {


    return (
        <tbody>
            {
                status === "pending" ? <FetchStatus text="Loading..." />
                    : status === "error" ? <FetchStatus text={message} />
                        : tempData.map((user, index) => user.visible &&
                            <Row name={user.name}
                                location={user.location}
                                picture={user.picture}
                                key={index}
                                id={user.id}
                            />)
            }
        </tbody>
    )
}