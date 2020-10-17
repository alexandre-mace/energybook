const powerData = {
    'eol': {
        'averagePower': 5000, // kW
        'averageChargeFactor': 0.2, // %
        'averageSurface': 1000, // m2
        'co2': 10, // g/kWh
        'cost': 55, // €/MWh
        'materials': { // ton/TWh
            'aluminium': 35,
            'cement': 0,
            'concrete': 8000,
            'copper': 23,
            'glass': 92,
            'iron': 120,
            'lead': 0,
            'plastic': 190,
            'silicon': 0,
            'steel': 1800
        }
    },
    'sol': {
        'averagePower': 3,
        'averageChargeFactor': 0.16,
        'averageSurface': 1.8,
        'co2': 85,
        'cost': 150,
        'materials': {
            'aluminium': 680,
            'cement': 3700,
            'concrete': 350,
            'copper': 850,
            'glass': 2700,
            'iron': 0,
            'lead': 0,
            'plastic': 210,
            'silicon': 57,
            'steel': 7900
        }
    },
    'nuc': {
        'averagePower': 1100000,
        'averageChargeFactor': 0.75,
        'averageSurface': 1500000,
        'co2': 6,
        'cost': 70,
        'materials': {
            'aluminium': 0,
            'cement': 0,
            'concrete': 760,
            'copper': 3,
            'glass': 0,
            'iron': 5,
            'lead': 2,
            'plastic': 0,
            'silicon': 0,
            'steel': 160
        }
    },
    'therCoal': {
        'averagePower': 600000,
        'averageChargeFactor': 0.75,
        'averageSurface': 1500000,
        'co2': 950,
        'cost': 70,
        'materials': {
            'aluminium': 3,
            'cement': 0,
            'concrete': 870,
            'copper': 1,
            'glass': 0,
            'iron': 1,
            'lead': 0,
            'plastic': 0,
            'silicon': 0,
            'steel': 310
        }
    },
    'therOil': {
        'averagePower': 600000, //
        'averageChargeFactor': 0.75, // %
        'averageSurface': 1200000, // km²
        'co2': 700,
        'cost': 75,
        'materials': {
            'aluminium': 3,
            'cement': 0,
            'concrete': 870,
            'copper': 1,
            'glass': 0,
            'iron': 1,
            'lead': 0,
            'plastic': 0,
            'silicon': 0,
            'steel': 310
        }
    },
    'therGas': {
        'averagePower': 600000,
        'averageChargeFactor': 0.75,
        'averageSurface': 1200000,
        'co2': 430,
        'cost': 75,
        'materials': {
            'aluminium': 1,
            'cement': 0,
            'concrete': 400,
            'copper': 0,
            'glass': 0,
            'iron': 1,
            'lead': 0,
            'plastic': 0,
            'silicon': 0,
            'steel': 170
        }
    },
    'hydro': {
        'averagePower': 250000,
        'averageChargeFactor': 0.28,
        'averageSurface': 3000000,
        'co2': 4,
        'cost': 50,
        'materials': {
            'aluminium': 0,
            'cement': 0,
            'concrete': 14000,
            'copper': 1,
            'glass': 0,
            'iron': 0,
            'lead': 0,
            'plastic': 0,
            'silicon': 0,
            'steel': 67
        }
    }
}

export default powerData;