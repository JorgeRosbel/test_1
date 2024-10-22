
export const FetchStatus: React.FC<{ text: string | undefined }> = ({ text }) => {

    return (
        <tr>
            <td  className="text-center text-white animate-pulse">{text}</td>
            <td  className="text-center text-white animate-pulse">{text}</td>
            <td  className="text-center text-white animate-pulse">{text}</td>
            <td  className="text-center text-white animate-pulse">{text}</td>
        </tr>
    )
}