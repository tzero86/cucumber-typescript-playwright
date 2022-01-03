import React, { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import axios from "axios";

function TableList() {
    const [users, setUsers] = useState({ hits: [] });

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios(
                "https://jsonplaceholder.typicode.com/users"
            );
            setUsers({ hits: data });
        };
        fetchData();
    }, [setUsers]);

    return (
        <div>
            <span>
                {users.hits &&
                users.hits.slice(0, 5).map(item => (
                    <p data-id="full-name">{item.name}</p>
                ))}
            </span>
        </div>
    );
}

export class BasicREST extends React.Component {

    render() {
        return (
            <>
                <Stack direction="row" spacing={2}>
                    <div className="App">
                        <TableList />
                    </div>
                </Stack>
            </>
        );
    }
};

