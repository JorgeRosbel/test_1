import { useBigData } from "@api/useStore"

export const THead: React.FC = () => {
    const {filterBy} = useBigData();

    return (
        <thead className="text-white">
            <tr>
                <th>Foto</th>
                <th className="cursor-pointer" onClick={() => filterBy("first")}>Nombre</th>
                <th className="cursor-pointer" onClick={() => filterBy("last")}>Apellido</th>
                <th className="cursor-pointer" onClick={() => filterBy("country")}>País</th>
                <th className="cursor-pointer">Acciones</th>
            </tr>
        </thead>
    )
}