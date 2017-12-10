var defaultObjects = {
    dbParams:new Object(
        {
            initialized:    false
        }
    ),
    creatures:new Array(
        {
            name:          "Test",
            size:           2,
            agility:        3,
            speed:          6,
            strength:       1,
            hitpoints:      12,
            items:          new Array('Holy Cross'),
            homes:          new Array('Holy Chapel', 'Home Portal')
        }
    )
};

module.exports = defaultObjects;