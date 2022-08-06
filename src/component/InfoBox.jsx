import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

const InfoBox = ({ total, state, party, votes}) => {
  return (
    <Card className='infoBox'>
        <CardContent className=''>
            <Typography className='' color='textSecondary'>{party}</Typography>
            <h2 className='infoBox__votes'>{votes}</h2>
            <Typography className='' color='textSecondary'>{state}</Typography>
            <Typography className='' color='textSecondary'>{total +' '} Total </Typography>
        </CardContent>

    </Card>
  )
}

export default InfoBox