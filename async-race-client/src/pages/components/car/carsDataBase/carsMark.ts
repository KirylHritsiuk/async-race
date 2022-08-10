export interface ICarModelsData {
    mark: string,
    model: string[]
}
export const modelsBase: ICarModelsData[] = [
    {
        mark:'Tesla',
        model: ['Roadster','Model S','Model X','3','Y','Cybertruck','Roadster']
    },
    {
        mark:'Opel',
        model: ['Mokka','Corsa',' Astra','Insignia','Vivaro','Zafira','Movano','Combo', 'Crossland', 'Karl']
    },
    {
        mark:'Audi',
        model: ['Q4 e-tron','e-tron GT','e-tron GE','R8','RS Q3','RS7','Q8','Q7','A3 Cabriolet','A5']
    },
    {
        mark:'BMW',
        model: ['Hydrogen 7','5 Series Gran Turismo','7','ActiveHybrid 7','X7','X6','X5','F34','M6','M5']
    },
    {
        mark:'Ford',
        model: ['Focus','Flex','Fiesta','Taurus','Street Ka','Mustang','Mondeo','Kuga','Galaxy','Fusion']
    },
    {
        mark:'Mercedes',
        model: ['S213','W213','V222 (S63) AMG 4MATIC','A217 (S500)','C217','W222 (S500)','E63 AMG 4MATIC','A207 E250 CDI','S212 E250 CDI 4MATIC','W212 E200 CDI Avantgarde']
    },
    {
        mark:'Renault',
        model: ['Laguna','Safrane','Twizy','Koleos','Captur','Espace','Arkana','Duster','Logan','Clio R.S.']
    },
    {
        mark:'Toyota',
        model: ['Matrix','RAV4','Fortuner','Crown Majesta','Highlander','Supra','Camry','GR86','Avalon','Corolla']
    },
    {
        mark:'Volkswagen',
        model: ['Fox','Golf','Passat','Jetta','Touareg','Scirocco','Polo','New Beetle','Phaeton','Volkswagen ID.3']
    },
]