import MUIDataTable from 'mui-datatables';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const Actividad = () => {
    const [actividades, setActividades] = useState([]);
    const [error, setError] = useState(null);

    const obtenerActividades = async () => {
        try {
            const response = await axios.get("http://localhost:7/api/actividad");
            console.log("Actividades obtenidas:", response.data);
            setActividades(response.data);
        } catch (error) {
            console.error("Error al obtener las actividades:", error);
            setError("No se pudieron cargar las actividades.");
        } 
    };

    useEffect(() => {
        obtenerActividades();
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
            name: "duracion",
            label: "Duración",
            options: {
                filter: false,
                sort: false,
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
        {
            name: "ubicacion",
            label: "Ubicación",
            options: {
                filter: true,
                sort: true,
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
    ];

    return (
        <div>
            {error && <p>{error}</p>}
            <MUIDataTable
                title={"Lista de Actividades"}
                data={actividades}
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
