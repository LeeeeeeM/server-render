import React from 'react'
import Grid from './component/Grid'
import From from './component/From'

function App (props) {
    return (
        <div>
            {/* <From info={props.info} /> */}
            {props.data ? <Grid data={props.data} /> : null}
        </div>
    )
}

export default App