import express from "express"
import cors from "cors"
import './src/configs/mongoose.db.js'
import AccountRouter from './src/modules/account/account.route.js'
import GroupRouter from './src/modules/group/group.route.js'
import UnitRouter from './src/modules/unit/unit.route.js'
import MeasurementRouter from './src/modules/measurement/measurement.route.js'

const app = express()
const PORT = process.env.PORT || 3030

app.use(express.urlencoded( { extended: true } ))
app.use(express.json())
app.use(cors())

app.use('/api/account', AccountRouter)
app.use('/api/group', GroupRouter)
app.use('/api/unit', UnitRouter)
app.use('/api/measurement', MeasurementRouter)

app.get('/', (req, res) => {
    res.send(`CONVERSION UNIT is running`)
})

app.listen(PORT, () => {
    console.log('CONVERSION UNIT is running on port', PORT)
})

export default app