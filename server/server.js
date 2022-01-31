const { Op } = require("sequelize");
const cors=require('cors')
const path = require('path')
require('dotenv').config();
const express = require("express");
const app = express();
app.use(cors())
//Heroku
app.use(express.static(path.join(__dirname,'build')))
//const port = 3001;
//Heroku
const port = process.env.PORT

const sequelize = require("./sequelize.js");

const Ship = require("./models/ship");
const CrewMember = require("./models/crewMember");

Ship.hasMany(CrewMember, { as: "CrewMembers", foreignKey: "shipId" });
CrewMember.belongsTo(Ship, { foreignKey: "shipId" })

// Express middleware
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// Kickstart the Express aplication
app.listen(port, () => {
    console.log("The server is running on http://localhost:" + port);
});

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
    console.error("[ERROR]:" + err);
    res.status(500).json({ message: "500 - Server Error" });
});

app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'table created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

//utils functions
const sortShips = (a, b) => {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA <= nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
}

//api calls for the primary entity
app.get('/ships', async (req, res) => {
    try {
        const ships = await Ship.findAll()
        res.status(200).json(ships)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/shipsSorted', async (req, res) => {
    try {
        const ships = await Ship.findAll()
        ships.sort(sortShips)
        res.status(200).json(ships)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/ships', async (req, res, next) => {
    try {

        await Ship.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/ships/:sid', async (req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if (ship) {
            await ship.update(req.body, { fields: ['name', 'displacement'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/ships/:sid', async (req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if (ship) {
            await ship.destroy()
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/ships/:sid', async (req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if (ship) {
            res.status(200).json(ship)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

//api calls for the secondary entity
app.get('/crew', async (req, res) => {
    try {
        const crewMember = await CrewMember.findAll()
        //books.sort(sortBooks)
        res.status(200).json(crewMember)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/crew', async (req, res, next) => {
    try {

        await CrewMember.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/crew/:cid', async (req, res) => {
    try {
        const crew = await CrewMember.findByPk(req.params.cid)
        if (crew) {
            await crew.update(req.body, { fields: ['name', 'role', 'shipId'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/crew/:cid', async (req, res) => {
    try {
        const crew = await CrewMember.findByPk(req.params.cid)
        if (crew) {
            await crew.destroy()
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.get('/crew/:cid', async (req, res) => {
    try {
        const crew = await CrewMember.findByPk(req.params.cid)
        if (crew) {
            res.status(200).json(crew)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

//api calls that modify secondary entities based on their foreign key
app.get('/ships/:sid/crew', async (req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if (ship) {
            const crew = await ship.getCrewMembers()
            res.status(200).json(crew)
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/ships/:sid/crew', async (req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if (ship) {
            const crewMember = req.body
            crewMember.shipId = ship.id
            await CrewMember.create(crewMember)
            res.status(200).json({ message: 'created' })
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/ships/:sid/crew/:cid', async (req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if (ship) {
            const crewMembers = await ship.getCrewMembers({ id: req.params.cid })
            var crew = null
            for (var i = 0; i < crewMembers.length; i++) {
                if (crewMembers[i].id == req.params.cid) {
                    crew = crewMembers[i];
                }
            }
            if (crew) {
                crew.name = req.body.name;
                crew.role = req.body.role;
                await crew.save();
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.delete('/ships/:sid/crew/:cid', async (req, res) => {
    try {
        const ship = await Ship.findByPk(req.params.sid)
        if (ship) {
            const crewMembers = await ship.getCrewMembers({ id: req.params.cid })
            var crew = null
            for (var i = 0; i < crewMembers.length; i++) {
                if (crewMembers[i].id == req.params.cid) {
                    crew = crewMembers[i];
                }
            }
            if (crew) {
                await crew.destroy()
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

// filtering ships - return all the ships that came out after a certain date and belong to a certain category
app.get('/displacementPast6000StartWithLetterN', async (req, res) => {

    const referenceDisplacement = 6000;
    try {
        const ships = await Ship.findAll(
            {
                where: {
                    name: {
                        [Op.like]: 'n%',
                    },
                    displacement: {
                        [Op.gt]: referenceDisplacement
                    }
                }
            }
        )
        res.status(200).json(ships)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/shipsFilter/:sdisplacement/:sletter', async (req, res) => {

    const referenceDisplacement = req.params.sdisplacement;
    const referenceLetter = `${req.params.sletter}%`
    try {
        const ships = await Ship.findAll(
            {
                where: {
                    name: {
                        [Op.like]: referenceLetter,
                    },
                    displacement: {
                        [Op.gt]: referenceDisplacement
                    }
                }
            }
        )
        res.status(200).json(ships)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})