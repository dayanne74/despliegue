import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const Comida = () => {
    const [comidas, setComidas] = useState([]);
    const [error, setError] = useState(null);

    const obtenerComidas = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/comida");
            console.log("Comidas obtenidas:", response.data);
            setComidas(response.data);
        } catch (error) {
            console.error("Error al obtener las comidas:", error);
            setError("No se pudieron cargar las comidas.");
        } 
    };

    useEffect(() => {
        obtenerComidas();
    }, []);

    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "nombre",
            label: "Nombre",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "descripcion",
            label: "Descripción",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "precio",
            label: "Precio",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => `$${value.toFixed(2)}`, // Formato de precio
            }
        },
        {
            name: "categoria",
            label: "Categoría",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];

    return (
        <div>
            {error && <p>{error}</p>}
            <MUIDataTable
                title={"Lista de Comidas"}
                data={comidas}
                columns={columns}
                options={{
                    filterType: 'checkbox',
                    responsive: 'vertical',
                    selectableRowsHideCheckboxes: true,
                    rowsPerPageOptions: [5, 10, 15],
                }}
            />
        </div>
    );
};
