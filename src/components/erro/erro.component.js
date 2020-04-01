import React from 'react';

import './erro-styles.css';

import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';

export const Erro = props => (
    <div className="text-center mt-5 mb-5 erro">
        Ops... Parece que o servidor não está respondendo <br></br>
        Tente novamente em alguns instantes <br></br><br></br>
        <SentimentDissatisfiedOutlinedIcon/>
    </div>
)