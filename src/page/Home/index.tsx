import React, { useState } from 'react';
import './index.css';
import { v4 as uuid } from 'uuid';
import Button from '@mui/material/Button'
import { ArrowForward, ArrowBack } from '@mui/icons-material';

interface dot {
    id: string,
    clientX: number,
    clientY: number
}

const Home: React.FC = () => {
    const [list, setList] = useState<dot[]>([]);
    const [undid, setUndid] = useState<dot[]>([]);

    // CRIAR 
    const handleClick = (event: any) => {
        const newDot: dot = {
            id: uuid(),
            clientX: event.clientX,
            clientY: event.clientY
        }

        setList([...list, newDot]);
        setUndid([]);
    };

    // DESFAZER
    const handleUndo = (event: any) => {
        event.stopPropagation();

        if(list.length === 0){
            return
        };

        const lastItemList = list[list.length -1];
        setUndid([...undid, lastItemList]);

        const newArray = [...list].slice(0, -1);
        setList(newArray);
    };

    // REFAZER
    const handleRedo = (event: any) => {
        event.stopPropagation();

        if(undid.length === 0){
            return
        };

        const lastItemUnid = undid[undid.length -1];
        setList([...list, lastItemUnid]);

        const newArray = [...undid].slice(0, -1);
        setUndid(newArray);
    };


    return (
        <div id='page' onClick={handleClick}>
            {list.map((item) => 
                <span 
                    key={item.id}
                    id='dot' 
                    style={{top: item.clientY, left: item.clientX}}
                />
            )}

            <Button variant="outlined" color="error" sx={{mr: 1, mb: 2}} onClick={handleUndo}>
                <ArrowBack />
            </Button>
            <Button variant="outlined" color="success"  sx={{mr: 1, mb: 2}} onClick={handleRedo}>
                <ArrowForward />
            </Button>
        </div>
    );
};

export default Home;